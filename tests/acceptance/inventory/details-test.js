import { test } from 'qunit';
import moduleForAcceptance from 'razer-cars-app/tests/helpers/module-for-acceptance';

const CHECKIN_DATE = 'Tue Dec 22 2015 13:45:11 GMT-0600';

moduleForAcceptance('Acceptance | inventory/details', {
  beforeEach() {
    login();
  },
});

function standardSetup() {
  server.create('car-type', {year: 2012, totalInventory: 10, manufacturer: 'Ford', modelName: 'F150', history: [1, 2, 3, 4, 5]});

  // One rental that has been returned
  server.createList('inventory-history', 1, {car: '1', checkOut: new Date(CHECKIN_DATE), checkIn: new Date(CHECKIN_DATE)});

  // Four active rentals
  server.createList('inventory-history', 4, {car: '1', checkOut: new Date(CHECKIN_DATE)});

}

test('A user can visit inventory details', function(assert) {
  standardSetup();
  visit('/1');

  andThen(function() {
    assert.equal(currentURL(), '/1');
    assert.equal(currentRouteName(), 'inventory.details');
  });
});

test('A user can see inventory details', function(assert) {
  standardSetup();
  visit('/1');

  andThen(function() {
    let totalSupply = findWithAssert('.inventory-total-supply');
    let availableSupply = findWithAssert('.inventory-available-supply');

    assert.equal(totalSupply.text(), 10, 'A user can see the total supply for the current fleet');
    assert.equal(availableSupply.text(), 6, 'A user can see the cars available for rent in the current fleet');
  });
});

test('A user can see active rentals', function(assert) {
  standardSetup();
  visit('/1');

  andThen(function() {
    let rentalItems = findWithAssert('.inventory-active-rental-item');
    let firstRental = rentalItems.first();

    assert.equal(rentalItems.length, 4, 'A user can see only active rentals');
    assert.includes(firstRental.find('.rental-out-date').text(), 'Dec 22 2015 13:45:11', 'A user can see the rental dates for current active rents');
  });
});

test('A user can quick rent a car', function(assert) {
  standardSetup();
  visit('/1');
  click('.quick-rent-btn');

  andThen(function() {
    let rentalItems = findWithAssert('.inventory-active-rental-item');
    let lastRental = rentalItems.last();
    let totalSupply = findWithAssert('.inventory-total-supply');
    let availableSupply = findWithAssert('.inventory-available-supply');

    assert.equal(rentalItems.length, 5, 'A new rental should be listed');
    assert.equal(totalSupply.text(), 10, 'The total supply is still the same');
    assert.equal(availableSupply.text(), 5, 'There should be one less car in the fleet');
    assert.ok(lastRental.find('.rental-out-date').text().indexOf('Dec 22 2015 13:45:11') === -1,
      'The standard date should not be default');
    assert.equal(server.db['inventory-histories'].length, 6, 'The history should save to the API');
  });
});

test('A user cannot click on "Quick Rent" if there are no available cars in the current fleet', function(assert) {
  server.create('car-type', {year: 2012, totalInventory: 4, manufacturer: 'Ford', modelName: 'F150', history: [1, 2, 3, 4, 5]});

  // One rental that has been returned
  server.createList('inventory-history', 1, {car: '1', checkOut: new Date(CHECKIN_DATE), checkIn: new Date(CHECKIN_DATE)});

  // Four active rentals
  server.createList('inventory-history', 4, {car: '1', checkOut: new Date(CHECKIN_DATE)});
  visit('/1');
  click('.quick-rent-btn');

  andThen(function() {
    let rentalItems = findWithAssert('.inventory-active-rental-item');
    let lastRental = rentalItems.last();

    assert.equal(rentalItems.length, 4, 'No new active rental is created');
    assert.includes(lastRental.find('.rental-out-date').text(), 'Dec 22 2015 13:45:11',
      'No new active rental is created so date is the same');
  });
});

test('A user can click on "Return" to return a car from active rental back into the fleet lot', function(assert) {
  standardSetup();
  visit('/1');
  click('.quick-return:first');

  andThen(function() {
    let rentalItems = findWithAssert('.inventory-active-rental-item');
    let totalSupply = findWithAssert('.inventory-total-supply');
    let availableSupply = findWithAssert('.inventory-available-supply');

    assert.equal(rentalItems.length, 3, 'No new active rental is created');
    assert.equal(totalSupply.text(), 10, 'A user can see the total supply for the current fleet');
    assert.equal(availableSupply.text(), 7, 'A user can see the cars available for rent in the current fleet');
  });
});
