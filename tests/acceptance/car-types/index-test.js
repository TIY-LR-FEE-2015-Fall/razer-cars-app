import { test } from 'qunit';
import moduleForAcceptance from 'razer-cars-app/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | car types/index', {
  beforeEach() {
    login();
  },
});

// You will need to configure the `path` option for this route
test('visiting /cars shows all car-types', function(assert) {
  visit('/cars');

  andThen(function() {
    assert.equal(currentRouteName(), 'car-types/index');
    assert.equal(currentURL(), '/cars');
  });
});

test('User can see a list of car types', function(assert) {
  visit('/cars');

  andThen(function() {
    let items = findWithAssert('.car-type-list-item');
    let firstItem = items.first();

    assert.equal(items.length, 5, 'There should be five car types in the list');

    assert.equal(firstItem.find('.car-type-list-item__year').text(), '2015');
    assert.equal(firstItem.find('.car-type-list-item__name').text(), 'Ford Explorer');
  });
});

test('User can navigate to new car type form', function(assert) {
  visit('/cars');
  click('.new-btn');

  andThen(function() {
    assert.equal(currentURL(), '/cars/new');
  });
});

test('User can navigate to new car type form', function(assert) {
  visit('/cars');
  click('.car-type-list-item__edit:first');

  andThen(function() {
    assert.equal(currentURL(), '/cars/1/edit');
  });
});
