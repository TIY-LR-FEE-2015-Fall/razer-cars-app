import { test } from 'qunit';
import moduleForAcceptance from 'razer-cars-app/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | inventory/list', {
  beforeEach() {
    login();
  },
});

function standardSetup() {
  server.create('car-type', {year: 2012, totalInventory: 10, manufacturer: 'Ford', modelName: 'F150', history: [1, 2, 3, 4, 5]});
  server.createList('car-type', 4);
  server.createList('inventory-history', 1, {car: '1', checkOut: new Date(), checkIn: new Date()});
  server.createList('inventory-history', 4, {car: '1', checkOut: new Date()});
}

// test('visiting / shows the inventory screen', function(assert) {
//   standardSetup();
//   visit('/');
//
//   andThen(function() {
//     assert.equal(currentRouteName(), 'inventory.index');
//     assert.equal(currentURL(), '/');
//   });
// });
//
// test('visiting / shows the inventory list', function(assert) {
//   standardSetup();
//   visit('/');
//
//   andThen(function() {
//     let items = findWithAssert('.inventory-list-item');
//     let firstItem = items.first();
//
//     assert.equal(items.length, 5, 'There should be five inventories in the list');
//
//     assert.includes(firstItem.find('.inventory-list-item__description').text(), '2012 Ford F150');
//     assert.includes(firstItem.find('.inventory-list-item__available').text(), '6 Available');
//   });
// });

test('unavailable items are red', function(assert) {
  server.create('car-type', {year: 2012, totalInventory: 5, manufacturer: 'Ford', modelName: 'F150', history: [1, 2, 3, 4, 5]});
  server.createList('inventory-history', 5, {car: '1', checkOut: new Date()});
  visit('/');

  andThen(function() {
    let items = findWithAssert('.inventory-list-item');
    let firstItem = items.first();

    assert.includes(firstItem.find('.inventory-list-item__available').text(), '0 Available');
    assert.ok(firstItem.find('.inventory-list-item__available').hasClass('inventory-list-item__available--none'),
      '.inventory-list-item__available should have class inventory-list-item__available--none');
  });
});

test('unavailable cars are green', function(assert) {
  server.create('car-type', {year: 2012, totalInventory: 5, manufacturer: 'Ford', modelName: 'F150', history: [1, 2, 3, 4, 5]});
  server.createList('inventory-history', 1, {car: '1'});
  server.createList('inventory-history', 4, {car: '1', checkIn: new Date()});
  visit('/');

  andThen(function() {
    let items = findWithAssert('.inventory-list-item');
    let firstItem = items.first();

    assert.includes(firstItem.find('.inventory-list-item__available').text(), '4 Available');
    assert.ok(firstItem.find('.inventory-list-item__available').hasClass('inventory-list-item__available--available'),
      '.inventory-list-item__available should have class inventory-list-item__available--available');
  });
});
