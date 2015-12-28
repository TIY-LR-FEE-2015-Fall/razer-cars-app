import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    quickRent() {
      // Find which car we are talking about
      let car = this.modelFor(this.routeName);

      // Create a new inventory-history & set the checkOut & car
      let history = this.store.createRecord('inventory-history', {car, checkOut: new Date()});
      history.save();
    },
  },
});
