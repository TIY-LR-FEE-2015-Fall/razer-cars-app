import { test } from 'qunit';
import moduleForAcceptance from 'razer-cars-app/tests/helpers/module-for-acceptance';
import PageObject from '../../page-object';
const { visitable, text, collection, clickable } = PageObject;

const page = PageObject.create({
  visit: visitable('/cars'),
  newCar: clickable('.new-btn'),

  carTypes: collection({
    itemScope: '.car-type-list-item',

    item: {
      year: text('.car-type-list-item__year'),
      name: text('.car-type-list-item__name'),

      edit: clickable('.car-type-list-item__edit'),
    },
  }),
});

moduleForAcceptance('Acceptance | car types/index', {
  beforeEach() {
    login();
    server.create('carType', {year: 2012, manufacturer: 'Ford', modelName: 'F150', history: [1, 2, 3, 4, 5]});
    server.createList('carType', 4);
    server.createList('inventoryHistory', 5, {car: '1'});
  },
});

// You will need to configure the `path` option for this route
test('visiting /cars shows all car-types', function(assert) {
  page.visit();

  andThen(function() {
    assert.equal(currentRouteName(), 'car-type.index');
    assert.equal(currentURL(), '/cars');
  });
});

test('User can see a list of car types', function(assert) {
  page.visit();

  andThen(function() {
    assert.equal(page.carTypes().count(), 5, 'There should be five car types in the list');

    assert.includes(page.carTypes(1).year(), '2012');
    assert.includes(page.carTypes(1).name(), 'Ford F150');
  });
});

test('User can navigate to new car type form', function(assert) {
  page.visit()
    .newCar();

  andThen(function() {
    assert.equal(currentURL(), '/cars/new');
  });
});

test('User can navigate to edit car type form', function(assert) {
  page.visit()
    .carTypes(1).edit();

  andThen(function() {
    assert.equal(currentURL(), '/cars/1/edit');
  });
});
