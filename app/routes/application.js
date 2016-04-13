import Ember from 'ember';
import decode from 'arschmitz-weather/utils/decode-address';

export default Ember.Route.extend({
  geolocation: Ember.inject.service(),
  setupController() {
    this.controllerFor('application').set('api', localStorage.apikey || '');
    this.controllerFor('application').set('showModal', !!localStorage.apikey);
    this.controllerFor('application').set('menu', [
        {
          name: '3 Day Forecast',
          model: '3-day-forecast'
        },
        {
          name: '10 Day Forecast',
          model: '10-day-forecast'
        },
        {
          name: 'Almanac Data',
          model: 'almanac'
        },
        {
          name: 'Astronomical Data',
          model: 'astronomy'
        },
        {
          name: 'Current Conditions',
          model: 'conditions'
        },
        {
          name: 'Dashboard',
          model: 'dashboard'
        },
        {
          name: 'Hourly',
          model: 'hourly'
        },
        {
          name: 'Satellite Imagry',
          model: 'satellite'
        },
        {
          name: 'Tidal Data',
          model: 'tide'
        },
        {
          name: 'Weather Alerts',
          model: 'alert'
        },
        {
          name: 'Webcam Imagry',
          model: 'webcam'
        }
      ]);
  },
  actions: {
    placeChanged(val) {
      // jscs:disable requireC  amelCaseOrUpperCaseIdentifiers
      let address = val.address_components;
      let route;
      if (address) {
        route = decode(address);
        this.transitionTo(route);
      }

      this.store.findRecord('geocode', val.formatted_address).then((geo) => {
        this.controllerFor('application').set('userLocation', {
          latitude: geo.get('geometry').location.lat,
          longititude: geo.get('geometry').location.lng
        });
      });
      // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
    },
    apiSubmit() {
      localStorage.apikey = this.controllerFor('application').get('api');
      this.controllerFor('application').set('showModal', true);
    },
    openMenu() {
      console.log( "run" );
      this.controllerFor('application').set('menuOpen', true);
    },
    navigate(newRoute) {
      let loc = window.location
      let route = loc.hash ? loc.hash.split('/') : loc.pathname.split('/');
      route.pop();
      if ( location.hash ) {
        route.shift();
      }
      route = route.join('/');
      route = `${route}/${newRoute}`;
      console.log( route );
      if ( !location.hash ) {
        this.transitionTo(route);
      } else {
        window.location.hash = route;
      }
    }
  }
});
