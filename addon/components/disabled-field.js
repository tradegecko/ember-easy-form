import Ember from 'ember';
import WrapperMixin from 'ember-easy-form/wrapper-mixin';

var DisabledField = Ember.Component.extend(WrapperMixin, {
  tagName: '',
  layoutName: Ember.computed.oneWay('wrapperConfig.disabledTemplate'),

  parentWithDisabledState: Ember.computed(function() {
    let formForComponent = this.nearestWithProperty('model').get('nearestParentWithModel');
    let formView = this.get('formView') || this.get('parentView.formView');
    return ('disabledStateHash' in formView) ? formView : formForComponent;
  }),

  init: function() {
    this._super(...arguments);
    var propertyName = this.get('propertyName') || this.get('property');
    var parentWithDisabledState = this.get('parentWithDisabledState');
    Ember.defineProperty(
      this,
      'disabledText',
      Ember.computed(`parentWithDisabledState.disabledStateHash.${propertyName}`, function() {
        if (!parentWithDisabledState) { return };
        return Ember.get(parentWithDisabledState, `disabledStateHash.${propertyName}`);
      })
    );
  },
});

DisabledField.reopenClass({
  positionalParams: ['propertyName']
});

export default DisabledField;
