import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
});

Router.map(function() {
  this.route('inventory', { path: '/' }, function() {
    this.route('details', {path: '/:car-type_id'});
  });

  this.route('car-type', {path: '/cars'}, function() {
    this.route('new');
    this.route('edit', {path: '/:car-type_id/edit'});
  });

  this.route('login');
  this.route('logout');
});

export default Router;
