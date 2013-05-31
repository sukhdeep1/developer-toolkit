describe('root', function () {
  "use strict";

  var scope = null;

  beforeEach(function () {
    scope = helpers.controller.initController('Root', {'CorespringConfig': {}});
  });

  it('should work', function () {
    expect(scope).toNotBe(null);
    expect(scope.appVars).toNotBe(null);
  });

});