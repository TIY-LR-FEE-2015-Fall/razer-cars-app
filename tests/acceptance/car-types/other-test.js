import { test } from 'qunit';
import moduleForAcceptance from 'razer-cars-app/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | car types/other', {
  beforeEach() {
    login();
  },
});

test('A user should not see the car list on /cars/new', function(assert) {
  visit('/cars/new');

  andThen(function() {
    let items = find('.car-type-list-item');

    assert.equal(items.length, 0, 'There should not be any .car-type-list-item elements on the new form');
  });
});

test('A user should not see the car list on edit screen', function(assert) {
  visit('/cars/1/edit');

  andThen(function() {
    let items = find('.car-type-list-item');

    assert.equal(items.length, 0, 'There should not be any .car-type-list-item elements on the edit form');
  });
});
