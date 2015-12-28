import Ember from 'ember';
import PageObject from '../../page-object';

function navItem(selector /*, options */) {
  return {
    getSelector(text) {
      return `${selector}:contains("${text}")`;
    },

    getItem(text) {
      return Ember.$(this.getSelector(text));
    },

    exists(text) {
      return this.getItem(text).length > 0;
    },

    notExists(text) {
      return !this.exists(text);
    },

    click(text) {
      click(this.getSelector(text));
    },
  };
}

export default PageObject.customHelper(navItem);
