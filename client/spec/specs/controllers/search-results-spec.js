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
  });

  it('should render grade', function(){
    expect(scope.renderGrade).toNotBe(undefined);
    expect(scope.renderGrade(["1","3"])).toEqual("1, 3");
  });

  it('should render standards', function(){
    expect(scope.renderStandards(null)).toEqual("");
    expect(scope.renderStandards([{dotNotation:"1"}])).toEqual("1");
    expect(scope.renderStandards([{dotNotation:"1"}, {dotNotation: "2"}])).toEqual("1, 2");
  });

  it('should render subject', function(){
    expect(scope.renderPrimarySubject(null)).toEqual("");
    expect(scope.renderPrimarySubject({category: "c", subject:"s"})).toEqual("c: s");
    expect(scope.renderPrimarySubject({category: "c"})).toEqual("c");
    expect(scope.renderPrimarySubject({subject:"s"})).toEqual("s");
  });

  it('should dispatch "launchItem"', function(){
    var eventItem = null;
    scope.$on('launchItem', function(event,item){
      eventItem = item;
    });
    scope.getCode({id: "1"});
    expect(eventItem).toEqual({id:"1"});
  });


});