import Ember from 'ember';

export default Ember.Service.extend({
  newCarTypes: 0,
  carsCheckedIn: 0,
  carsCheckedOut: 0,

  newCarWasAdded() {
    // this.set('newCarTypes', this.get('newCarTypes') + 1);
    this.incrementProperty('newCarTypes', 1);
  },

  carWasCheckedIn() {
    this.incrementProperty('carsCheckedIn', 1);
  },

  carWasCheckedOut() {
    this.incrementProperty('carsCheckedOut', 1);
  },
});
