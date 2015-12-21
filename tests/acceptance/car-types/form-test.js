import { test } from 'qunit';
import moduleForAcceptance from 'razer-cars-app/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | car types/form', {
  beforeEach() {
    login();
    server.create('car-type', {history: [1, 2, 3, 4, 5]});
    server.createList('car-type', 4);
    server.createList('inventory-history', 5, {car: '1'});
  },
});

test('A user can visit the new Car Type form at /cars/new', function(assert) {
  visit('/cars/new');

  andThen(function() {
    assert.equal(currentRouteName(), 'car-types/new');
    assert.equal(currentURL(), '/cars/new');
  });
});

test('A user can see the new Car Type form at /cars/new', function(assert) {
  visit('/cars/new');

  andThen(function() {
    let yearInput = findWithAssert('.form-input__year');
    let manufacturerInput = findWithAssert('.form-input__manufacturer');
    let modelNameInput = findWithAssert('.form-input__model-name');
    let totalInventoryInput = findWithAssert('.form-input__total-inventory');

    assert.equal(yearInput.val(), '', 'The "year" input should be empty to start');
    assert.equal(manufacturerInput.val(), '', 'The "manufacturer" input should be empty to start');
    assert.equal(modelNameInput.val(), '', 'The "modelName" input should be empty to start');
    assert.equal(totalInventoryInput.val(), '', 'The "totalInventory" input should be empty to start');
  });
});

test('A user can create a new Car Type', function(assert) {
  visit('/cars/new');
  fillIn('.form-input__year', 2005);
  fillIn('.form-input__manufacturer', 'Pontiac');
  fillIn('.form-input__model-name', 'Aztec');
  fillIn('.form-input__total-inventory', 5);

  andThen(function() {
    let items = findWithAssert('.car-type-list-item');
    let firstItem = items.first();

    assert.equal(items.length, 1, 'The new car should be in the list');
    assert.equal(server.db['car-types'].length, 1, 'The new car should be saved to the database');

    assert.includes(firstItem.find('.car-type-list-item__year').text(), '2005');
    assert.includes(firstItem.find('.car-type-list-item__name').text(), 'Pontiac Aztec');
  });
});
