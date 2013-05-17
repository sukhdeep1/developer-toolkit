angular.module('corespring-services')
 .factory('AccessToken', ['$resource', ($r) ->

    def =
      create: $r('/api/v1/access-token')

    def
 ])