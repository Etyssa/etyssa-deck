(function() {
  'use strict';
  
  function columnFactory(etyssaApi, $modal, $filter, $localStorage, messageFactory) {
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
      console.log("content_type:"+content_type);
     if(content_type=="inobx")content_type="inbox"; 
     var column = {
        entries: function(params) {
          return {
            template_url : 'app/columnar/entries-column.html',
            update_entries : function() {
              var category;
              if (params.cat) {
                category = params.cat.alias;
              }
              return etyssaApi.entries.query({cat: category, tag: params.tag, to_address: params.to_address});
            },
            get_title : function() { return $filter('colTitleFromParams')(params);}
          };
        },
        inbox: function(params) {
          return {
            template_url : 'app/columnar/inbox-column.html',
            get_title : function() {return "Messages";},
            update_entries : function() { console.log('update!');
              return etyssaApi.message.query({mailbox:"inbox",timestamp: new Date().getTime() });
            }
          };
        }
      }[content_type](params);
      column.content_type = content_type;
      column.params       = params;
      column.archived     = params;
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
      },
      pushMessage :  function(message) { 
        //console.log("refresh");
        for (var i = 0; i < columns.length ; i++) {
            var column = columns[i];
           // column.params["date"]= new Date().getTime();
           if(column.content_type=="inbox"){
             console.log("inbox");
              column.entries.unshift(message);
          }
        }
      }
    };
  }

  function titleFromParamsFilter() {
    return function (params) {
      var title = "";
      if (params.to_address) { if (title !== "") { title += " | "; } title += params.to_address; }
      if (params.cat)        { if (title !== "") { title += " | "; } title += params.cat.title; }
      if (params.tag)        { if (title !== "") { title += " | "; } title += params.tag; }
      if (title === "")      { title = "Accueil"; }
      return title;
    };
  }

  angular.module('etyssaDeck')
    // Service which return a column object
    .factory('columnFactory', ["etyssaApi", "$modal", "$filter", "$localStorage","messageFactory" , columnFactory])
    .filter('colTitleFromParams', titleFromParamsFilter);

})();


// EOF
