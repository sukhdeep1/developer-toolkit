describe('launcher', function () {

  'use strict';


  var scope = null;

  beforeEach(function () {
    var postScope = function (scope) {
      scope.appVars = {
        accessToken: '1'
      };
    };

    scope = helpers.controller.initController('TokenGenerator',
      {
        'AccessToken': {
          generate: function (clientId, secret, success, error) {
            if (clientId === 'good') {
              success({access_token: 'token'});
            } else {
              error({ client_id: ['id']});
            }
          }
        }
      }, postScope);
  });

  it('should init', function () {
    expect(scope).toNotBe(null);
  });

  it('should watch api call failed', function () {
    scope.appVars.apiCallFailed = true;
    scope.$apply();
    expect(scope.tokenFormTitle).toEqual(scope.labels.formTitle.notOk);
  });

  it('should generate token', function () {
    scope.appVars.clientId = 'good';
    spyOn(scope, '$emit');
    scope.generateToken();
    expect(scope.$emit).toHaveBeenCalled();
    expect(scope.$emit).toHaveBeenCalledWith('setAccessToken', {accessToken: 'token'});
    scope.appVars.clientId = 'bad';
    scope.generateToken();
    expect(scope.errorMessage).toNotBe(null);
  });

  it('should get title', function () {
    expect(scope.getTokenFormTitle({})).toEqual(scope.labels.formTitle.unknown);
    expect(scope.getTokenFormTitle({accessToken: "1"})).toEqual(scope.labels.formTitle.ok);
    expect(scope.getTokenFormTitle({accessToken: "1", apiCallFailed: true})).toEqual(scope.labels.formTitle.notOk);
  });

});
