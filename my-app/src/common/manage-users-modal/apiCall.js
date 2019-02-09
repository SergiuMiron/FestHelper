export const update = (url, data, callback = () => {}) => {
  return fetch(url, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      callback(res);
    })
    .catch(err => callback(err));
};