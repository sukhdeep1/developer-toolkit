describe('launcher', function () {

  'use strict';

  var mockEncryptOptions;

  var scope = null;
  var mockRouteParams = null;
  var mockLaunchTemplate = {
    template: function () {
    }

  };

  beforeEach(function () {

    mockEncryptOptions = {
      encrypt: function (token, options, success, error) {
        if (options.mode === "badMode") {
          error({});
        } else {
          success({clientId: "1"});
        }
      }
    };

    mockRouteParams = { itemId: "1"};

    var injectScope = function (scope) {
      return {$scope: scope, $routeParams: mockRouteParams};
    };

    var postScope = function (scope) {
      scope.appVars = {
        accessToken: "1"
      };
      scope.options = {};
    };

    scope = helpers.controller.initController('Launcher',
      {
        'LauncherTemplate': mockLaunchTemplate,
        'EncryptOptions': mockEncryptOptions,
        'CorespringConfig': { url: 'url'},
        '$routeParams': {itemId: '1'}
      }, postScope, injectScope);
  });

  it('should work', function () {
    expect(scope).toNotBe(null);
  });

  it('should get config label', function () {
    expect(scope.getConfigLinkLabel(true)).toEqual("Hide configuration options");
    expect(scope.getConfigLinkLabel(false)).toEqual("Show configuration options");
  });

  describe('encrypt options', function () {
    var result = null;
    var successFn = function (data) {
      result = data;
    };

    beforeEach(function () {
      result = null;
      spyOn(scope, '$emit');
    });


    it('should handle success', function () {
      scope.encryptOptions({mode: "preview"}, successFn);
      expect(result).toEqual({clientId: "1"});
      expect(scope.$emit).toHaveBeenCalled();
      expect(scope.$emit).toHaveBeenCalledWith('apiCallSucceeded', 'encrypt-options');
    });

    it('should handle  error', function () {
      scope.encryptOptions({mode: "badMode"}, successFn);
      expect(result).toEqual(null);
      expect(scope.$emit).toHaveBeenCalled();
      expect(scope.$emit).toHaveBeenCalledWith('apiCallFailed', 'encrypt-options');
      expect(scope.editorText).toEqual(scope.errorMessage);
    });
  });

  it('should show', function () {
    scope.options = {
      mode: "preview"
    };
    expect(scope.show('itemId')).toBe(true);
    scope.options = {
      mode: "render"
    };
    expect(scope.show('itemId')).toBe(false);
  });

  it('should watch date picker', function () {
    spyOn(scope, 'reRender');
    scope.pickerExpires = "5/1/2013";
    scope.$apply();
    var date = new Date(2013, 4, 1);
    expect(date.getTime()).toEqual(scope.options.expires);
    expect(scope.reRender).toHaveBeenCalled();
  });

  it('should update template', function () {
    spyOn(mockLaunchTemplate, 'template');
    var args = [ "clientId", "ec", "o", "raw"];
    scope.updateTemplate.apply(scope, args);
    expect(mockLaunchTemplate.template).toHaveBeenCalled();
    expect(mockLaunchTemplate.template).toHaveBeenCalledWith("url", "clientId", "ec", "o", "raw");
  });

  it('should rerender', function () {
    spyOn(mockLaunchTemplate, 'template');

    scope.encryptOptions = function (o, success) {
      success({clientId: 'clientId', options: JSON.stringify(o), request: o});
    };

    scope.options = {
      mode: "preview",
      itemId: "1"
    };

    scope.overrides = {
      itemId: true
    };

    scope.reRender();

    expect(mockLaunchTemplate.template).toHaveBeenCalled();
    var encryptionRequest = {mode: 'preview', itemId: '*'};
    expect(mockLaunchTemplate.template).toHaveBeenCalledWith('url', 'clientId', JSON.stringify(encryptionRequest), '{"mode":"preview","itemId":"1"}', encryptionRequest);
    scope.overrides.itemId = false;
    encryptionRequest.itemId = '1';
    scope.reRender();
    expect(mockLaunchTemplate.template).toHaveBeenCalled();
    expect(mockLaunchTemplate.template).toHaveBeenCalledWith('url', 'clientId', JSON.stringify(encryptionRequest), '{"mode":"preview","itemId":"1"}', encryptionRequest);
  });

});