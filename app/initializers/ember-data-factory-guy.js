import Ember from 'ember';
import FactoryGuy from 'ember-data-factory-guy/factory-guy';
import FactoryGuyTestHelper from 'ember-data-factory-guy/factory-guy-test-helper';
import config from '../config/environment';

export default {
  name: 'ember-data-factory-guy',
  after: 'store',

  initialize: function(registry, application) {
    // ember 1.12+ no longer passing in container and application, but registry and application
    // But make sure you are using ember-cli/ember-load-initializers#0.1.4
    var container = (registry._defaultContainer) ? registry._defaultContainer : registry;
    console.log('serializer',container.lookup('serializer:-default')+'')
    console.log('store',container.lookup('service:store')+'')
    FactoryGuy.setStore(container.lookup('service:store'));
    FactoryGuyTestHelper.set('container', container);
    FactoryGuy.resetDefinitions();

    var serializerD = container.lookup('serializer:-default')
    var serializer = container.lookup('service:store').serializerFor('application')
    console.log('A',serializer+'', serializerD+'', serializer.store+'',serializerD.store+'')

    var prefix = config.modulePrefix;
    var factoryFileRegExp = new RegExp('^' + prefix + '/tests/factories');

    Ember.keys(requirejs._eak_seen).filter(function(key) {
      return factoryFileRegExp.test(key);
    }).forEach(function(moduleName) {
      if (moduleName.match('.jshint')) { // ignore autogenerated .jshint files
        return;
      }
      if (moduleName.match('.jscs')) { // ignore autogenerated .jscs files
        return;
      }
      require(moduleName, null, null, true);
    });
  }
};
