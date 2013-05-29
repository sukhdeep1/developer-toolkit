"use strict";

describe('search', function () {

  var scope = null;
  beforeEach(function () {
    scope = helpers.controller.initController('Search', {'ItemFormatter': {}}, function (s) {
      s.appVars = {};
    })
  });

  it('should init', function () {
    expect(scope.searchInProgress).toBe(false);
  });

  it('should load more', function () {

    var eventTriggered = false;
    scope.$on('loadMoreSearchResults', function (event, item) {
      eventTriggered = true;
    });

    scope.loadMore();
    expect(eventTriggered).toBe(false);

    scope.appVars = {
      searchItems: [1, 2, 3],
      searchCount: 4
    };

    scope.loadMore();
    expect(eventTriggered).toBe(true);

  });

  it('should set search results', function () {
    scope.searchResultsReceived({count: 1, data: [1]});
    expect(scope.appVars.searchCount).toBe(1);
    expect(scope.appVars.searchItems).toEqual([1]);
  });

  it('should set append results', function () {
    scope.searchResultsReceived({count: 10, data: [1]});
    scope.moreSearchResultsReceived({count: 10, data: [2, 3, 4]});
    expect(scope.appVars.searchItems).toEqual([1, 2, 3, 4]);
  });

  it('should watch accessToken', function () {
    scope.appVars.searchCount = 10;
    scope.appVars.searchItems = [1];
    scope.appVars.accessToken = "blah";
    scope.$apply();
    expect(isNaN(scope.appVars.searchCount)).toBe(true);
    expect(scope.appVars.searchItems).toEqual([]);
  });

});
