import Ember from 'ember';
import WrapperMixin from 'ember-easy-form/wrapper-mixin';

var WarningFieldComponent = Ember.Component.extend(WrapperMixin, {
  tagName: 'span',
  classNameBindings: ['wrapperConfig.warningClass'],
  layoutName: Ember.computed.oneWay('wrapperConfig.warningTemplate'),

  errorText: Ember.computed('warnings.[]', function() {
    var warnings = this.get('warnings');
    return warnings ? warnings[0] : null;
  }),

  init: function() {
    this._super(...arguments);
    var propertyName = this.get('propertyName') || this.get('property');
    Ember.Binding.from('formForModel.warnings.' + propertyName).to('warnings').connect(this);
  }
});

WarningFieldComponent.reopenClass({
  positionalParams: ['propertyName']
});

export default WarningFieldComponent;
