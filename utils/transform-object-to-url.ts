import * as qs from 'qs';

export const transformObjectToUrl = (baseUrl: string, queryObj: unknown) => {
  const url = baseUrl[baseUrl.length - 1] === '/' ? baseUrl.slice(0, -1) : baseUrl;

  return `${url}?${qs.stringify(queryObj)}`;
};
