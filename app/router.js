import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
});

Router.map(function() {
  this.route('inventory', { path: '/' }, function() {

  });

  this.route('car-type');
  this.route('login');
  this.route('cars', function() {
    this.route('new');
    this.route('edit', {path: '/:car_id/edit'});
  });
});

export default Router;
