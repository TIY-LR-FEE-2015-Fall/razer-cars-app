import DS from 'ember-data';

export default DS.Model.extend({
  year: DS.attr('string'),
  manufacturer: DS.attr('string'),
  modelName: DS.attr('string'),
  totalInventory: DS.attr('number'),

  history: DS.hasMany('inventory-history'),
});
