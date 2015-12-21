import { test } from 'qunit';
import moduleForAcceptance from 'razer-cars-app/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | car types/index', {
  beforeEach() {
    login();
    server.create('car-type', {year: 2012, manufacturer: 'Ford', modelName: 'F150', history: [1, 2, 3, 4, 5]});
    server.createList('car-type', 4);
    server.createList('inventory-history', 5, {car: '1'});
  },
});

// You will need to configure the `path` option for this route
test('visiting /cars shows all car-types', function(assert) {
  visit('/cars');

  andThen(function() {
    assert.equal(currentRouteName(), 'car-type.index');
    assert.equal(currentURL(), '/cars');
  });
});

test('User can see a list of car types', function(assert) {
  visit('/cars');

  andThen(function() {
    let items = findWithAssert('.car-type-list-item');
    let firstItem = items.first();

    assert.equal(items.length, 5, 'There should be five car types in the list');

    assert.includes(firstItem.find('.car-type-list-item__year').text(), '2012');
    assert.includes(firstItem.find('.car-type-list-item__name').text(), 'Ford F150');
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
