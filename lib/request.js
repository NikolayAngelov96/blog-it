const host = "http://localhost:3000/api";

const request = async (url, options) => {
  try {
    const res = await fetch(host + url, options);

    if (res.ok != true) {
      let error = await res.json();

      throw new Error(error.message);
    }

    return res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const createOptions = (method, data, user) => {
  const options = {
    method,
    headers: {},
  };

  if (data) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  if (user) {
    options.headers["X-Authorization"] = user.token;
  }

  return options;
};

export const get = async (url, user) => {
  return request(url, createOptions("GET", null, user));
};

export const post = async (url, data, user) => {
  return request(url, createOptions("POST", data, user));
};

export const put = async (url, data, user) => {
  return request(url, createOptions("PUT", data, user));
};
