import Cookies from 'js-cookie';
import fetch from 'isomorphic-fetch';

const urlPrefix = 'http://47.252.87.218:8080/api/v1';

const generateHeaders = () => {
  let language = Cookies.get('language');
  if (!language) {
    language = 'zh_CN';
    Cookies.set('language', language, {expires: 365});
  }
  let headers = new Headers({
    'Content-Type': 'application/json',
    'x-language': language,
  });
  if (isLogin()) {
    headers.append('x-authentication', Cookies.get('token'));
  }
  return headers;
};

const preprocessResponse = (response) => {
  // New login credential is generated.
  const token = response.headers.get('x-authentication');
  if (token) {
    Cookies.set('token', token, {expires: 1});
  }
  let responseJson = response.json();
  try {
    // Login credential is expired.
    if (responseJson.status.code.toString().startsWith('401')) {
      Cookies.remove('token');
    }
  } catch (error) {
    if (error instanceof TypeError) {
      /* eslint-disable no-console */
      console.log('error: ', error);
      console.log('response.json: ', responseJson);
      console.log('致后端的朋友们：任何的请求的 response.json.status.code 都必须存在。');
      /* eslint-enable no-console */
      return {
        ...responseJson,
        status: {
          code: 5001,
          reason: '后端未给出 response.json.status.code 。'
        }
      };
    } else {
      throw error;
    }
  }
  return responseJson;
};

const fetchError = (error) => {
  return {
    status: {
      code: 5000,
      reason: error.toString()
    }
  };
};

const wait = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const isLogin = () => {
  return !!Cookies.get('token');
};

export const getAsync = async (urlSuffix) => {
  return await get(urlSuffix);
};

export const get = (urlSuffix) => {
  return fetch(
    `${urlPrefix}${urlSuffix}`,
    {
      method: 'GET',
      headers: generateHeaders()
    }
  ).then((response) => {
    return preprocessResponse(response);
  }).catch(fetchError);
};

export const postAsync = async (urlSuffix, requestBody) => {
  return await post(urlSuffix, requestBody);
};

export const post = (urlSuffix, requestBody) => {
  return fetch(
    `${urlPrefix}${urlSuffix}`,
    {
      method: 'POST',
      headers: generateHeaders(),
      body: JSON.stringify(requestBody)
    }
  ).then((response) => {
    return preprocessResponse(response);
  }).catch(fetchError);
};

export const putAsync = async (urlSuffix, requestBody) => {
  return await put(urlSuffix, requestBody);
};

export const put = (urlSuffix, requestBody) => {
  return fetch(
    `${urlPrefix}${urlSuffix}`,
    {
      method: 'PUT',
      headers: generateHeaders(),
      body: JSON.stringify(requestBody)
    }
  ).then((response) => {
    return preprocessResponse(response);
  }).catch(fetchError);
};

export const deleteAsync = async (urlSuffix) => {
  return await deleteHttp(urlSuffix);
};

export const deleteHttp = (urlSuffix) => {
  return fetch(
    `${urlPrefix}${urlSuffix}`,
    {
      method: 'DELETE',
      headers: generateHeaders()
    }
  ).then((response) => {
    return preprocessResponse(response);
  }).catch(fetchError);
};

export const mockGetAsync = async (content, delayMs) => {
  return await mockGet(content, delayMs);
};

export const mockGet = (content, delayMs) => {
  if (typeof delayMs !== 'number') {
    delayMs = 1000;
  }
  return wait(
    delayMs
  ).then(
    () => {
      return {
        content: content,
        status: {
          code: 2000
        }
      };
    }
  );
};

export const mockErrorAsync = async (code, delayMs) => {
  return await mockError(code, delayMs);
};

export const mockError = (statusCode, delayMs) => {
  if (typeof delayMs !== 'number') {
    delayMs = 1000;
  }
  return wait(
    delayMs
  ).then(
    () => {
      return {
        status: {
          code: statusCode
        }
      };
    }
  );
};
