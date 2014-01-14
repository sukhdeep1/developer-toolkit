"use strict";

describe('search-form', function () {
  var scope = null;

  var mockCollectionData = null;
  var mockCollections = {
    get: function (p, success, error) {

      if (p.access_token == "success") {
        success(mockCollectionData);
      } else {
        error("error");
      }
    }
  };

  var mockSearchResult = null;
  var mockSearchErrorMsg = "error";
  var mockItemSearch = {
    query: function (token, query, skip, limit, success, error) {

      if (token == "token") {
        success(mockSearchResult);
      } else {
        error({message: mockSearchErrorMsg})
      }
    }
  }

  beforeEach(function () {
    scope = helpers.controller.initController('SearchForm',
      {'Collections': mockCollections, 'ItemSearch': mockItemSearch}, function (s) {
        s.appVars = {};
        s.clearCurrentSearch = function () {
        };
        s.searchResultsReceived = function () {
        };
      })
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
    scope.collections = [1, 2, 3];
    mockCollectionData = [1];
    scope.updateCollections("fail");
    expect(scope.collections).toEqual([]);
    expect(scope.$emit).toHaveBeenCalled();
    expect(scope.$emit.calls.length).toEqual(1);
    expect(scope.$emit).toHaveBeenCalledWith('apiCallFailed', 'collections');
  });

  describe('search function', function () {
    beforeEach(function () {
      scope.appVars.accessToken = "token";
      scope.keyword = "keyword";
      scope.collectionId = "1";
    });

    it('should search', function () {
      spyOn(scope, 'searchResultsReceived');
      scope.search();
      expect(scope.searchResultsReceived).toHaveBeenCalled();
      expect(scope.searchResultsReceived.calls.length).toEqual(1);
    });

    it('should set error message if search fails', function () {
      scope.appVars.accessToken = "bad token";
      scope.search();
      expect(scope.errorMessage).toEqual(scope.errorPrefix + mockSearchErrorMsg);
    });

  });

});

