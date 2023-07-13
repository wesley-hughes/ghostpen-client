import { getToken } from "../components/utils/getToken";

export const createLetter = (letterObj) => {
  return fetch("http://localhost:8000/letters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${getToken()}`,
    },
    body: JSON.stringify(letterObj),
  }).then((res) => res.json());
};

export const getLetters = (campaign, contactFilter) => {
  let url = `http://localhost:8000/letters`;
  if (campaign) {
    url += `?campaign=${campaign}`;
  }
  if (contactFilter) {
    url += `?contact=${contactFilter}`;
  }

  return fetch(url, {
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  }).then((res) => res.json());
};

export const deleteLetter = (letterId) => {
  return fetch(`http://localhost:8000/letters/${letterId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  });
};

export const updateLetter = (updatedLetter, letterId) => {
  return fetch(`http://localhost:8000/letters/${letterId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${getToken()}`,
    },
    body: JSON.stringify(updatedLetter),
  });
};
