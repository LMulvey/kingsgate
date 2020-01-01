export function createSafeObject(obj, defaultReturn = null) {
  const handler = {
    get: function(obj, prop) {
      return prop in obj ? obj[prop] : defaultReturn;
    },
  };
  return new Proxy(obj, handler);
}
