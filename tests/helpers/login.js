import Ember from 'ember';
import { authenticateSession } from 'exercise-00/tests/helpers/ember-simple-auth';

export default Ember.Test.registerHelper('login', function(app) {
  // jscs: disable
  authenticateSession(app, {
    token_type: 'bearer',
    access_token: 'f1c5cb890586fea033c22b2ceff75f3fb6d37321',
    expires_in: 3600,
    refresh_token: '62fdd7267cba4e3a5784989acbd3a51f18ad0a05',
  });
  // jscs: enable
});
