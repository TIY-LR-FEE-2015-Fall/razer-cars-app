import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('car-type', 'Unit | Model | car type', {
  // Specify the other units that are required for this test.
  needs: ['model:inventory-history'],
});

test('it exists', function(assert) {
  let model = this.subject();

  // let store = this.store();
  assert.ok(!!model);
});

test('it calculates currentlyAvailable', function(assert) {
  let model = this.subject({totalInventory: 10});
  let store = this.store();

  Ember.run(function() {
    assert.equal(model.get('currentlyAvailable'), 10);

    // This fakes a new inventory item that is checked out
    let history = store.createRecord('inventory-history', {car: model, checkOut: new Date()});

    assert.equal(model.get('currentlyAvailable'), 9);

    // This fakes that the history above was checked back in
    history.set('checkIn', new Date());

    assert.equal(model.get('currentlyAvailable'), 10);
  });
});

test('it calculates currentlyAvailable after alot of movement', function(assert) {
  let model = this.subject({totalInventory: 10});
  let store = this.store();

  Ember.run(function() {
    assert.equal(model.get('currentlyAvailable'), 10);

    // This fakes a new inventory item that is checked out
    let historyOne = store.createRecord('inventory-history', {car: model, checkOut: new Date()});

    assert.equal(model.get('currentlyAvailable'), 9);

    // This fakes that the history above was checked back in
    historyOne.set('checkIn', new Date());

    assert.equal(model.get('currentlyAvailable'), 10);

    let historyTwo = store.createRecord('inventory-history', {car: model, checkOut: new Date()});
    assert.equal(model.get('currentlyAvailable'), 9);

    historyTwo.set('checkIn', null);
    historyOne.set('checkIn', null);
    assert.equal(model.get('currentlyAvailable'), 8);
  });
});
