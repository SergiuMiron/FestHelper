export const post = (url, data, callback = () => {}) => {
    return fetch(url, {
      method: "POST",
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

  export const get = (url, callback) => {
    fetch(url, {
        method: 'GET'
    }).then(res => res.json())
    .then(res => callback(res.data))
    .catch(err => callback(err));
}
