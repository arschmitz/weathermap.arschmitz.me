import Ember from 'ember';
import decode from 'arschmitz-weather/utils/decode-model-params';
import geocode from 'arschmitz-weather/utils/route-geocode';

export default Ember.Route.extend({
  model(params) {
    let modelParams = decode(params);
    this.controllerFor('application').set('title', `${modelParams.title} - Tidal Data`);
    return Ember.RSVP.hash({
      tide: this.store.findRecord('tide', modelParams.forecastId),
      geocode: this.store.findRecord('geocode', modelParams.geocodeId)
    });
  },
  afterModel: geocode
});
