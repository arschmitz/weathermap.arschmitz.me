import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  normalizeResponse(store, primaryModelClass, payload, id) {
    payload.satellite = payload.satellite || {};
    payload.satellite.id = id;
    delete payload.response;
    return this._super(...arguments);
  }
});
