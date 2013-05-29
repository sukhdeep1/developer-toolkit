"use strict";

describe('search-results', function () {

  var scope = null;
  beforeEach(function () {
    scope = helpers.controller.initController('SearchResults', {'ItemFormatter': {}})
  });

  it('should work', function () {
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