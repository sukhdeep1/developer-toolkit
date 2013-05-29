window.helpers = (window.helpers || {});
helpers.controller = (helpers.controller || {});


helpers.controller.initController = function (name, mockProviders, postScopeFn) {


  var scope, ctrl, $httpBackend;

  module('developer-toolkit.controllers');

  module(function ($provide) {
    for (var name in  mockProviders) {
      $provide.value(name, mockProviders[name]);
    }
  });

  inject(function (_$httpBackend_, $rootScope, $controller) {
    $httpBackend = _$httpBackend_;
    scope = $rootScope.$new();
    if(postScopeFn){
      postScopeFn(scope);
    }
    try {
      ctrl = $controller(name, {$scope: scope});
    } catch (e) {
      throw("Error with the controller: " + e);
    }
  });

  return scope;
}
