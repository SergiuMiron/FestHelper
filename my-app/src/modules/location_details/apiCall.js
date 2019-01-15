export const postLocationToWishlist = (url, data, callback = () => {}) => {
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