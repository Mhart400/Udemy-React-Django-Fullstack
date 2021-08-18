import { status } from '../utils'


export function auth(credentials) {
  return fetch("http://localhost:8000/api/authenticate/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then(status).catch( e => {
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
    .then(status).catch( e => {
      console.log(e);
    });
}

export function changePassword(userData, userId, token) {
  return fetch(`http://localhost:8000/api/users/${userId}/change_password/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`
    },
    body: JSON.stringify(userData),
  })
    .then(status).catch( e => {
      console.log(e);
    });
}

export function uploadAvatar(profileId, data) {
  return fetch(`http://localhost:8000/api/profile/${profileId}/`, {
    method: "PUT",
    body: data,
  })
    .then(status).catch( e => {
      console.log(e);
    });
}