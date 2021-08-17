

export function getGroups() {
  return fetch(`http://127.0.0.1:8000/api/groups/`)
    .then((data) => data.json())
    .catch((err) => {
      console.log(err);
    });
}

export function getGroup(id) {
  return fetch(`http://127.0.0.1:8000/api/groups/${id}/`)
    .then((data) => data.json())
    .catch((err) => {
      console.log(err);
    });
}
