import DS from 'ember-data';

export default DS.Model.extend({
  checkOut: DS.attr('date'),
  checkIn: DS.attr(),

  car: DS.belongsTo('car-type'),
});
