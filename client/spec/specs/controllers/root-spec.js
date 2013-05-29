"use strict";

describe('root', function () {
  var scope = null;

  beforeEach(function () {
    scope = helpers.controller.initController('Root');
  });

  it('should work', function () {
    expect(scope).toNotBe(null);
    expect(scope.appVars).toNotBe(null);
  });

});