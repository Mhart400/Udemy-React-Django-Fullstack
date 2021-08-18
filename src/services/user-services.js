export function auth(credentials) {
  return fetch("http://localhost:8000/api/authenticate/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then((resp) => resp.json())
    .catch( e => {
      console.log(e);
    });
}

export function register(userData) {
  return fetch("http://localhost:8000/api/users/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((resp) => resp.json())
    .catch( e => {
      console.log(e);
    });
}

export function uploadAvatar(profileId, data) {
  return fetch(`http://localhost:8000/api/profile/${profileId}/`, {
    method: "PUT",
    body: data,
  })
    .then((resp) => resp.json())
    .catch( e => {
      console.log(e);
    });
}