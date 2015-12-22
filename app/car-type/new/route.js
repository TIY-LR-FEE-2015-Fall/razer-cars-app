import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    addCar(formValues) {
      let car = this.store.createRecord('car-type', formValues);

      car.save().then(() => {
        this.transitionTo('car-type.index');
      });
    },
  },
});
