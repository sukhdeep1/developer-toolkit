//TODO - move this to corepsring-ng-services
angular.module('developer-toolkit')
  .factory("ItemSession", ['$http', '$resource', 'CorespringConfig', function($http, $resource, config){

    var completeUrl = config.url + '/api/v1/items/:itemId/sessions?access_token=:accessToken';

    console.log("ItemSession url: " + completeUrl);

    return {
      create : function( params, cb ){
        var finalUrl = completeUrl
          .replace(":itemId", params.itemId)
          .replace(":accessToken", params.accessToken);

        console.log("Calling", finalUrl);
        $http.post(finalUrl,{settings: {highlightCorrectResponse: false, showFeedback: false, highlightUserResponse: false}}).success( function(data){
          cb(data);
        });
      }
    }
  }]);
