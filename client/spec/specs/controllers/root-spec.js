"use strict";

describe('root', function () {

  var scope, ctrl, $httpBackend;

  beforeEach(module('developer-toolkit.controllers'));

  beforeEach(
    inject(function (_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      scope = $rootScope.$new();

      try {
        ctrl = $controller('Root', {$scope: scope});
      } catch (e) {
        throw("Error with the controller: " + e);
      }
    })
  );

  it('should work', function () {
    console.log("should work: ctrl: " + ctrl);
    expect(scope).toNotBe(null);
    expect(scope.appVars).toNotBe(null);

  });

});