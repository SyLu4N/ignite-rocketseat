// ?search=Luan

export function extratcQueryParams(query) {
  return query
    .substr(1)
    .split("&")
    .reduce((acc, param) => {
      const [key, value] = param.split("=");

      acc[key] = value;
      return acc;
    }, {});
}