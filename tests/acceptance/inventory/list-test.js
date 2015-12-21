import { test } from 'qunit';
import moduleForAcceptance from 'razer-cars-app/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | inventory/list', {
  beforeEach() {
    login();
    server.create('car-type', {year: 2012, totalInventory: 10, manufacturer: 'Ford', modelName: 'F150', history: [1, 2, 3, 4, 5]});
    server.createList('car-type', 4);
    server.createList('inventory-history', 1, {car: '1', checkOut: new Date(), checkIn: new Date()});
    server.createList('inventory-history', 4, {car: '1', checkOut: new Date()});
  },
});

test('visiting / shows the inventory screen', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentRouteName(), 'inventory.index');
    assert.equal(currentURL(), '/');
  });
});

test('visiting / shows the inventory list', function(assert) {
  visit('/');

  andThen(function() {
    let items = findWithAssert('.inventory-list-item');
    let firstItem = items.first();

    assert.equal(items.length, 5, 'There should be five inventories in the list');

    assert.includes(firstItem.find('.inventory-list-item__description').text(), '2012 Ford F150');
    assert.includes(firstItem.find('.inventory-list-item__available').text(), '6 Available');
  });
});
