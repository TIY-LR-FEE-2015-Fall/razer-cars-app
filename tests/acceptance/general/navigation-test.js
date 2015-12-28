import { test } from 'qunit';
import moduleForAcceptance from 'razer-cars-app/tests/helpers/module-for-acceptance';
import { currentSession } from 'razer-cars-app/tests/helpers/ember-simple-auth';
import { get } from 'ember';

import navBar from 'razer-cars-app/tests/pages/navigation';

moduleForAcceptance('Acceptance | general/navigation');

test('A guest user sees "Login" in the navigation bar', function(assert) {
  visit('/');
  navBar.navigate().click('Login');

  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});

test('A guest user cannot visit the "Car Type List"', function(assert) {
  visit('/cars');

  andThen(function() {
    assert.equal(currentURL(), '/login');
    assert.ok(navBar.navigate().notExists('Car Types'), 'The "Car List Type" link should not show up for guest users');
  });
});

test('A guest user cannot visit the "Inventory List"', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/login');
    assert.ok(navBar.navigate().notExists('Inventory'), 'The "Inventory List" link should not show up for guest users');
  });
});

test('An authenticated user can navigate to the "Car Type List"', function(assert) {
  login();
  visit('/');
  navBar.navigate().click('Car Types');

  andThen(function() {
    assert.equal(currentURL(), '/cars');
  });
});

test('An authenticated user can navigate to the "Inventory List"', function(assert) {
  let app = this.application;
  login();
  visit('/');
  navBar.navigate().click('Inventory');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});

test('An authenticated user can "Logout" from session', function(assert) {
  login();
  visit('/');
  navBar.navigate().click('Logout');

  andThen(() => {
    let session = currentSession(this.application);

    assert.equal(currentURL(), '/login');
    assert.equal(session.get('isAuthenticated'), false, 'The session should be logged out');
  });
});
