"use strict";

describe('search-results', function () {

  var scope, ctrl, $httpBackend;

  beforeEach(module('developer-toolkit.controllers'));

  beforeEach(function () {
    module(function($provide) {
      $provide.value('ItemFormatter', {});
    });
  });

  beforeEach(
    inject(function (_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      scope = $rootScope.$new();

      try {
        ctrl = $controller('SearchResults', {$scope: scope});
      } catch (e) {
        throw("Error with the controller: " + e);
      }
    })
  );

  it('should work', function () {
    console.log("should work: ctrl: " + ctrl);
    expect(scope).toNotBe(null);
    expect(scope.appVars).toBe(undefined);
    expect(scope.renderGrade).toNotBe(undefined);
    expect(scope.renderGrade(["1","3"])).toEqual("1, 3");
  });

});