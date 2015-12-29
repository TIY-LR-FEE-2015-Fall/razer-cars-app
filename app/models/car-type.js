import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  year: DS.attr('string'),
  manufacturer: DS.attr('string'),
  modelName: DS.attr('string'),
  totalInventory: DS.attr('number'),

  history: DS.hasMany('inventory-history'),

  blockRents: Ember.computed('currentlyAvailable', function() {
    return this.get('currentlyAvailable') === 0;
  }),

  currentlyAvailable: Ember.computed('totalInventory', 'history.@each.checkIn', 'history.@each.checkOut', function() {
    let total = parseInt(this.get('totalInventory'));
    let outForRent = this.get('history').reduce(function(carry, curr) {
      if (!curr.get('checkIn')) {
        console.log(curr.get('id'), curr.get('checkIn'));
        return carry + 1;
      }

      return carry;
    }, 0);

    return total - outForRent;
  }),
});
