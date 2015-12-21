import Ember from 'ember';
const {copy} = Ember;

export default Ember.Component.extend({
  tagName: 'form',

  formValues: null,

  initializeFormValues: Ember.on('didReceiveAttrs', function() {
    let startingValues = this.getAttr('startingValues') || {};
    let formValues;

    // Because Ember Model's Don't Implement Copyable
    if (startingValues.toJSON) {
      formValues = startingValues.toJSON();
    } else {
      formValues = copy(startingValues);
    }

    this.set('formValues', formValues);
  }),

  submit(ev) {
    ev.preventDefault();

    this.sendAction('onsubmit', this.get('formValues'));
  },
});
