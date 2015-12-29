import Ember from 'ember';

export default Ember.Route.extend({
  statsTracker: Ember.inject.service(),

  actions: {
    quickRent() {
      // Find which car we are talking about
      let car = this.modelFor(this.routeName);

      if (car.get('currentlyAvailable')) {
        // Create a new inventory-history & set the checkOut & car
        let history = this.store.createRecord('inventory-history', {car, checkOut: new Date()});
        history.save();
        this.get('statsTracker').carWasCheckedOut();
      } else {
        // Tell the user there's nothing to rent
      }
    },

    quickReturn(rental) {
      // How do we return a inventory-history
      rental.setProperties({checkIn: new Date()});

      rental.save();
      this.get('statsTracker').carWasCheckedIn();
    },
  },
});
