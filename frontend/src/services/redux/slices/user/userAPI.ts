const checkRes = (res: Response) => {
  if (res.ok) {
    return res;
  } else {
    return Promise.reject(res);
  }
};

export const fetchData = (url: string, method: string, data?: any, token?: string) => {
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(!!token && { Authorization: `Token ${token}` }),
    },
    ...(!!data && { body: JSON.stringify(data) }),
  }).then((res) => checkRes(res));
};

export const fetchSignIn = (data: any): any => {
  console.log(data);
  // return fetchData(`url.com/login/`, 'POST', data).then((res) => checkRes(res));
};
