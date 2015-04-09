(function() {
  'use strict';
  
  function contactFactory(etyssaApi, $modal, $filter, $localStorage) {

    //$localStorage.$reset();
    var storage = $localStorage.$default({
      contacts : []
    });

    var contacts = storage.contacts;
    _.forEach(contacts, function(contact, i) {
      contacts[i] = create_contact_form(contact);
    });

    function create_modal(entry) {

      var contact = {};
      // todo content_type dans les objets retournées par l'api
      if (entry.content_type=="entries") {
        contact = create_contact_from_entry(entry);
      }else if(entry.content_type=="inbox") {
        contact = create_contact_from_message(entry);
      }
      open_modal(contact);
    }

    // contact depuis annonces
    function create_contact_from_entry(entry) {
      if(entry==null){ return {} ;}
      var contact_object   = entry;
      contact_object.user = etyssaApi.users.get({user_id:entry.creator});
      contact_object.entry = entry;

      // send message parameters
      contact_object.entry_id   = entry.id;
      contact_object.subject    = entry.id;
      contact_object.receiver   = entry.creator;
      return contact_object;
    }

    // contact depuis messages
    function create_contact_from_message(message) {
      if(message==null){ return {} ;}

      var contact_object = message;
      contact_object.user = etyssaApi.users.get({user_id:message.sender});
      
      // send message parameters
      contact_object.subject    = message.subject;
      if(isInteger(message.subject)){ // si le sujet est un nombre, c'est une entryId
        contact_object.entry_id = message.id;
        contact_object.entry    = etyssaApi.entries.get({entry_id: message.id});
      }
      contact_object.message    = message.id;
      contact_object.receiver   = message.receiver;

      return contact_object;
    }

    function open_modal(contact_object) {
      $modal.open({
        templateUrl: 'app/contact/modal.html',
        controller: 'NewContactModalInstanceCtrl as contact',
        resolve: {
          contactInstance : function() {return contact_object;}
        }
      });
    }

    function deleteMessage(messageId) {
      etyssaApi.message.delete({message:messageId});
    }

    function send(message) {
      var newMessage  = etyssaApi.message.save(message);
      return newMessage;
    }

    //
    function isInteger(x) {
      return parseInt(x, 10) === x;
    }
    
    // exposed API
    return {
      open_modal          : create_modal,
      send                : send,
      delete              : deleteMessage
    };
  }


  angular.module('etyssaDeck')
    // Service which return a column object
    .factory('contactFactory', ["etyssaApi", "$modal", "$filter", "$localStorage", contactFactory]);

})();


// EOF
