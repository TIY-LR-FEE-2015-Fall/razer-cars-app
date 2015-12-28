import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),

  model() {
    this.get('session').invalidate().then(() => {
      this.transitionTo('login');
    });
  },
});
