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

    // different kind of column
    function create_contact_form(params) {
      var contact = params;
      //alert("contact")
      //contact.sender_user = params.user; 
      //contact.get_index    = function() {return contacts.indexOf(this);};
      return contact;
    }

    function open_modal_entry(entry) {
      var params={}
      params.entryModel = entry;
      params.entry_id   = entry.id;
      params.subject    = entry.id;
      params.user       = entry.creator;
      params.receiver     = entry.creator;
      params.user_nickname = entry.creator_nickname;
      console.log("receiver:"+params.receiver);

      open_modal(params);
    }

    function open_modal(params) {
      var contact = create_contact_form(params);
      console.log("contact user"+contact.user_nickname);
      $modal.open({
        templateUrl: 'app/message/contact.html',
        controller: 'NewContactModalInstanceCtrl as modal',
        resolve: {
          contactInstance : function() {return contact;}
        }
      });
    }

    function send(message) {
      var newMessage  = etyssaApi.message.save(message);
      return newMessage;
    }

    // exposed API
    return {
      contactAboutEntry: open_modal_entry,
      contactUser: open_modal,
      sendMessage:send
    };
  }


  angular.module('etyssaDeck')
    // Service which return a column object
    .factory('messageFactory', ["etyssaApi", "$modal", "$filter", "$localStorage", messageFactory]);

})();


// EOF
