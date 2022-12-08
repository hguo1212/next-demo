import qs from 'qs';
import { any, forEach, prop, omit, isArray,isNil, omitBy } from 'lodash/fp';

const commonFetch = async (method, url, data, options) => {
  let finalData;
  let headers = {
    'content-type': 'application/json',
    ...prop('headers')(options),
  };

  if (data) {
    finalData = JSON.stringify(data);
  }

  const tempOptions = {
    ...options,
    data,
    method,
    headers,
    body: finalData,
  }

  const res = await fetch(url, {
    ...tempOptions,
    headers: {
      ...tempOptions.headers,
    },
  })

  if(!res.ok) {
    const error = new Error('An error ocurred while fetching the data');
    error.info = await res.json()
    error.status = res.status;
    return  Promise.reject(error)
  }
  return Promise.resolve(res.json());
};

const formatQuery = query => {
  if (Array.isArray(query.sort)) {
    return `${qs.stringify(omit('sort')(query))}&${qs.stringify(
      { sort: query.sort },
      { indices: false },
    )}`;
  }
  return qs.stringify(query);
};

export const read = (url, query, options) =>
  commonFetch('GET', query ? `${url}?${formatQuery(query)}` : url, null, options);

export const post = (url, data, options) => commonFetch('POST', url, data, options);

export const put = (url, data, options) => commonFetch('PUT', url, data, options);

export const patch = (url, data, options) => commonFetch('PATCH', url, data, options);

export const del = (url, data, options, body) =>
  commonFetch('DELETE', data ? `${url}?${qs.stringify(data)}` : url, body, options);
