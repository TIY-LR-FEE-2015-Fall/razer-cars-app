import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  year: DS.attr('string'),
  manufacturer: DS.attr('string'),
  modelName: DS.attr('string'),
  totalInventory: DS.attr('number'),

  history: DS.hasMany('inventory-history'),

  currentlyAvailable: Ember.computed('totalInventory', 'history.@each.checkIn', function() {
    return this.get('totalInventory' - 'carsOutForRent');
  }),
});
