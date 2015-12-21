import { test } from 'qunit';
import moduleForAcceptance from 'razer-cars-app/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | general/login');

test('guest user can visit /login', function(assert) {
  visit('/login');

  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});

test('guest user can see a blank login form', function(assert) {
  visit('/login');

  andThen(function() {
    let username = findWithAssert('[name=username]');
    let password = findWithAssert('[name=password]');

    assert.equal(username.val(), '');
    assert.equal(password.val(), '');
  });
});

test('User can login with valid credentials', function(assert) {
  visit('/login');
  fillIn('[name=username]', 'valid@example.com');
  fillIn('[name=password]', 'password1234');
  click('.login-submit-btn');

  andThen(function() {
    assert.equal(currentURL(), '/', 'User should be redirected after login');
  });
});

test('User cannot login with invalid credentials', function(assert) {
  visit('/login');
  fillIn('[name=username]', 'invalid@example.com');
  fillIn('[name=password]', 'password1234');
  click('.login-submit-btn');

  andThen(function() {
    assert.equal(currentURL(), '/login', 'User should be not redirected because they are wrong');
  });
});
