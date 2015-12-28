import { test } from 'qunit';
import moduleForAcceptance from 'razer-cars-app/tests/helpers/module-for-acceptance';
import { currentSession } from 'razer-cars-app/tests/helpers/ember-simple-auth';
import { get } from 'ember';

moduleForAcceptance('Acceptance | general/navigation');

test('A guest user sees "Login" in the navigation bar', function(assert) {
  visit('/');
  click('.nav-item__login');

  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});

test('A guest user cannot visit the "Car Type List"', function(assert) {
  visit('/cars');

  andThen(function() {
    let carListLink = find('.nav-item__car-type');

    assert.equal(currentURL(), '/login');
    assert.equal(carListLink.length, 0, 'The "Car List Type" link should not show up for guest users');
  });
});

test('A guest user cannot visit the "Inventory List"', function(assert) {
  visit('/');

  andThen(function() {
    let inventoryListLink = find('.nav-item__inventory');

    assert.equal(currentURL(), '/login');
    assert.equal(inventoryListLink.length, 0, 'The "Inventory List" link should not show up for guest users');
  });
});

test('An authenticated user can navigate to the "Car Type List"', function(assert) {
  login();
  visit('/');
  click('.nav-item__car-type');

  andThen(function() {
    assert.equal(currentURL(), '/cars');
  });
});

test('An authenticated user can navigate to the "Inventory List"', function(assert) {
  login();
  visit('/');
  click('.nav-item__inventory');

  andThen(function() {
    assert.equal(currentURL(), '/inventory');
  });
});

test('An authenticated user can "Logout" from session', function(assert) {
  login();
  visit('/');
  click('.nav-item__logout');

  andThen(function() {
    let session = currentSession(this.application);

    assert.equal(currentURL(), '/');
    assert.equal(get(session, 'isAuthenticated'), false, 'The session should be logged out');
  });
});
