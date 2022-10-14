function commonApiRequest(
  url: string,
  method: string,
  body?: Record<string, any>
) {
  return fetch(url, {
    method,
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
    body: JSON.stringify(body),
  })
    // .then(checkResponseStatus)
    .then(res => res.json())
    .catch(err => {
      console.error('Reqest error', err);
      return err.reason || err;
    });
}

function checkResponseStatus(response: any) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error: Error = new Error(response);
    error.response = response;
    throw error;
  }
}

function apiRequestGet(url: string, data: Record<string, any>) {
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
