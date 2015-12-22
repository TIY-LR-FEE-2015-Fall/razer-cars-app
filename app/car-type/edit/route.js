import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    saveCar(formValues) {
      let car = this.modelFor('car-type.edit');
      car.setProperties(formValues);
      car.save().then(() => {
        this.transitionTo('car-type.index');
      });
    },
  },
});
