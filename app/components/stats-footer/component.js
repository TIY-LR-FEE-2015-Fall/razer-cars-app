import Ember from 'ember';

export default Ember.Component.extend({
  statsTracker: Ember.inject.service('stats-tracker'),
});
