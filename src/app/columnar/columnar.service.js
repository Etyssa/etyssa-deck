(function() {
  'use strict';
  
  function columnFactory(entries, message, $modal, $filter, $localStorage) {
    // $localStorage.$reset();
    var storage = $localStorage.$default({
      columns : []
    });

    var columns = storage.columns;
    _.forEach(columns, function(column, i) {
      columns[i] = create_column_object(column.content_type, column.params);
    });

    // different kind of column
    function create_column_object(content_type, params) {
      var column = {
        entries: function(params) {
          return {
            template_url : 'app/columnar/entries-column.html',
            update_entries : function() {
              var category;
              if (params.cat) {
                category = params.cat.alias;
              }
              return entries.query({cat: category, tag: params.tag, to_address: params.to_address});
            },
            get_title : function() { return $filter('colTitleFromParams')(params);}
          };
        },
        inbox: function(params) {
          return {
            template_url : 'app/columnar/inbox-column.html',
            get_title : function() {return "Inbox";},
            update_entries : function() {return message.query({mailbox:"inbox"});}
          };
        }
      }[content_type](params);
      column.content_type = content_type;
      column.params       = params;
      column.get_index    = function() {return columns.indexOf(this);};
      return column;
    }

    function open_modal(index) {
      $modal.open({
        templateUrl: 'app/main/modal.html',
        controller: 'NewColumnModalInstanceCtrl as modal',
        resolve: {
          columnInstance : function() {return columns[index];}
        }
      });
    }

    // exposed API
    return {
      create : function(column) {
        // default params values
        var params   = column.params || {};
        params.limit = column.params.limit || 50;
        // return a column object
        var column_instance = create_column_object(column.content_type, column.params);
        columns.push(column_instance);
        return column_instance;
      },
      list : columns,
      delete: function(index) {
        columns.splice(index, 1);
      },
      askForNewColumn: open_modal,
      configure: function(index) {
        open_modal(index);
      }
    };
  }

  function titleFromParamsFilter() {
    return function (params) {
      var title = "";
      if (params.to_address) { if (title !== "") { title += " | "; } title += params.to_address; }
      if (params.cat)        { if (title !== "") { title += " | "; } title += params.cat.title; }
      if (params.tag)        { if (title !== "") { title += " | "; } title += params.tag; }
      if (title === "")      { title = "Home"; }
      return title;
    };
  }

  angular.module('etyssaDeck')
    // Service which return a column object
    .factory('columnFactory', ["Entries", "Message", "$modal", "$filter", "$localStorage", columnFactory])
    .filter('colTitleFromParams', titleFromParamsFilter);

})();


// EOF
