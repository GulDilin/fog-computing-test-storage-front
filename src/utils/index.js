export default {
  createFilterQuery(filter) {
    if (!filter) return undefined;
    return Object.entries(filter)
    .filter( ([k, v]) => k && v != undefined && v != null )
    .map( ([k, v]) => Array.isArray(v) ? v.map( item => `${k}=${item}`).join("&") : `${k}=${v}`)
    .join('&')
  },

  createFilterURL(baseUrl, filter) {
    if (!filter) return baseUrl;
    let filterUrl = this.createFilterQuery(filter);
    return filterUrl ? `${baseUrl}?${filterUrl}` : baseUrl;
  },
}