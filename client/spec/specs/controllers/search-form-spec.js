"use strict";

describe('search-form', function () {
  var scope = null;

  var mockCollectionData = null;
  var mockCollections = {
    get: function (p, success, error) {

      if(p.access_token == "success"){
        success(mockCollectionData);
      } else {
        error("error");
      }
    }
  };

  beforeEach(function () {
    scope = helpers.controller.initController('SearchForm', {'Collections': mockCollections, 'ItemSearch': {}})
  });

  it('should init', function () {
    expect(scope).toNotBe(null);
  });

  it('should reset form', function () {
    scope.keyword = "blah";
    expect(scope.keyword).toEqual("blah");
    scope.resetForm();
    expect(scope.keyword).toBe(null);
  });

  it('should update collections', function () {
    spyOn(scope, '$emit');
    scope.updateCollections(null);
    expect(scope.collections).toEqual([]);
    mockCollectionData = [1];
    scope.updateCollections("success");
    expect(scope.collections).toEqual([1]);
    expect(scope.$emit).toHaveBeenCalled();
    expect(scope.$emit.calls.length).toEqual(1);
    expect(scope.$emit).toHaveBeenCalledWith('apiCallSucceeded', 'collections');
  });


  it('should empty the collection if it fails', function () {
    spyOn(scope, '$emit');
    scope.collections = [1,2,3];
    mockCollectionData = [1];
    scope.updateCollections("fail");
    expect(scope.collections).toEqual([]);
    expect(scope.$emit).toHaveBeenCalled();
    expect(scope.$emit.calls.length).toEqual(1);
    expect(scope.$emit).toHaveBeenCalledWith('apiCallFailed', 'collections');
  });
});

