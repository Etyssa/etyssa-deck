(function() {
  'use strict';
  
  function messageFactory(etyssaApi, $modal, $filter, $localStorage) {
    // $localStorage.$reset();
/*    var storage = $localStorage.$default({
      inbox : []
    });
*/
  //  var contacts = storage.inbox;
/*    _.forEach(contacts, function(column, i) {
      contacts[i] = create_contact_form(column.content_type, column.params);
    });*/
    function create_contact_form(params) {
      var contact = params;
      return contact;
    }

    function open_modal_entry(entry) {
      return open_modal(entry);
    }

    function open_modal(entry) {
      var contact_object        = {};
      contact_object.entryModel = entry;
      contact_object.entry_id   = entry.id;
      contact_object.subject    = entry.id;
      contact_object.receiver   = entry.creator;
      contact_object.user       = entry.creator;
      contact_object.user_nickname = entry.creator_nickname;
      var contact = create_contact_form(contact_object);
      $modal.open({
        templateUrl: 'app/message/contact.html',
        controller: 'NewContactModalInstanceCtrl as modal',
        resolve: {
          contactInstance : function() {return contact;}
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

    // exposed API
    return {
      contactAboutEntry: open_modal_entry,
      contactUser: open_modal,
      sendMessage:send,
      delete:deleteMessage
    };
  }


  angular.module('etyssaDeck')
    // Service which return a column object
    .factory('messageFactory', ["etyssaApi", "$modal", "$filter", "$localStorage", messageFactory]);

})();


// EOF
