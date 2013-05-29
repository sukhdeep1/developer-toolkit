"use strict";

describe('search-form', function () {
  var scope = null;
  beforeEach(function () {
    scope = helpers.controller.initController('SearchForm', {'Collections': {}, 'ItemSearch': {}})
  });

  it('should init', function () {
    expect(scope).toNotBe(null);
  });

  it('should reset form', function(){
    scope.keyword = "blah";
    expect(scope.keyword).toEqual("blah");
    scope.resetForm();
    expect(scope.keyword).toBe(null);
  });
});

