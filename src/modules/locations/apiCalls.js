export const getLocations = (url, callback) => {
    fetch(url, {
        method: 'GET'
    }).then(res => res.json())
    .then(res => callback(res.data))
    .catch(err => callback(err));
}

export const deleteLocation = (url, id, callback = () => {}) => {
    return fetch(url + "/" + id, {
      method: "DELETE"
    })
      .then(res => callback(res))
      .catch(err => callback(err));
  };