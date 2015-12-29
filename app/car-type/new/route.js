import Ember from 'ember';

export default Ember.Route.extend({
  statsTracker: Ember.inject.service('stats-tracker'),

  actions: {
    addCar(formValues) {
      let car = this.store.createRecord('car-type', formValues);

      car.save().then(() => {
        // Should send info that we have created a new car type
        this.get('statsTracker').newCarWasAdded();

        this.transitionTo('car-type.index');
      });
    },
  },
});
