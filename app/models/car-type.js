import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  year: DS.attr('string'),
  manufacturer: DS.attr('string'),
  modelName: DS.attr('string'),
  totalInventory: DS.attr('number'),

  history: DS.hasMany('inventory-history'),

  currentlyAvailable: Ember.computed('totalInventory', 'history.@each.checkIn', function() {
    let total = parseInt(this.get('totalInventory'));
    let outForRent = this.get('history').reduce(function(carry, curr) {
      if (curr.get('checkIn') === undefined) {
        return carry + 1;
      }

      return carry;
    }, 0);

    return total - outForRent;
  }),
});
