import Ember from 'ember';
import WrapperMixin from 'ember-easy-form/wrapper-mixin';

var DisabledField = Ember.Component.extend(WrapperMixin, {
  tagName: '',
  layoutName: Ember.computed.oneWay('wrapperConfig.disabledTemplate'),

  formForComponent: Ember.computed(function() {
    return this.nearestWithProperty('model').get('nearestParentWithModel');
  }),

  init: function() {
    this._super(...arguments);
    var propertyName = this.get('propertyName') || this.get('property');
    var formForComponent = this.get('formView') || this.get('parentView.formView');
    Ember.defineProperty(this, 'disabledText', Ember.computed(`${formForComponent}.disabledStateHash.${propertyName}`, function() {
      if (!formForComponent) { return };
      return formForComponent.get(`disabledStateHash.${propertyName}`);
    }));
  },
});

DisabledField.reopenClass({
  positionalParams: ['propertyName']
});

export default DisabledField;
