function commonApiRequest(
  url: string,
  method: string,
  body?: Record<string, any>
) {
  return fetch(url, {
    method,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json; charset=UTF-8',
      
    },
    credentials: 'include',
    body: JSON.stringify(body),
  })
    .then(checkResponseStatus)
    .catch(err => {
      console.error('Reqest error', err);
      return err.response || err;
    });
}

function checkResponseStatus(response: any) {
  if (response.status >= 200 && response.status < 400) {
    console.log(response)
    return response === 'OK' ? response : response.json();
  } else {
    const error: Error = new Error(response);
    error.response = response.json();
    throw error;
  }
}

function apiRequestGet(url: string) {
  return commonApiRequest(url, 'GET');
}
function apiRequestPost(url: string, data: Record<string, any>) {
  return commonApiRequest(url, 'POST', data);
}
function apiRequestPut(url: string, data: Record<string, any>) {
  return commonApiRequest(url, 'PUT', data);
}
function apiRequestDelete(url: string, data: Record<string, any>) {
  return commonApiRequest(url, 'DELETE', data);
}

export { apiRequestGet, apiRequestPost, apiRequestPut, apiRequestDelete };
