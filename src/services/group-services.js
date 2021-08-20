import { status } from "../utils";

export function getGroups() {
  return fetch(`http://127.0.0.1:8000/api/groups/`)
    .then(status).catch((err) => {
      console.log(err);
    });
}

export function getGroup(id) {
  return fetch(`http://127.0.0.1:8000/api/groups/${id}/`)
    .then(status).catch((err) => {
      console.log(err);
    });
}

export function joinGroup(data) {
  return fetch(`http://127.0.0.1:8000/api/members/join/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'appliacation/json'
    },
    body: JSON.stringify(data)
  })
    .then(status).catch((err) => {
      console.log(err);
    });
}
