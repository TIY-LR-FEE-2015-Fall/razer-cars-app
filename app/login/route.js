import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  session: Ember.inject.service(),

  actions: {
    loginUser(formValues) {
      this.get('session').authenticate('authenticator:application', formValues.email, formValues.password)
        .catch(() => {});
    },
  },
});
