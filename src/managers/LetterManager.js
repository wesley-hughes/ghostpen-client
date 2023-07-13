import { getToken } from "../components/utils/getToken";

export const createLetter = (letterObj) => {
  return fetch("https://ghost-pen-32f1099a7abd.herokuapp.com/letters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${getToken()}`,
    },
    body: JSON.stringify(letterObj),
  }).then((res) => res.json());
};

export const getLetters = (campaign, contactFilter) => {
  let url = `https://ghost-pen-32f1099a7abd.herokuapp.com/letters`;
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
  return fetch(`https://ghost-pen-32f1099a7abd.herokuapp.com/letters/${letterId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  });
};

export const updateLetter = (updatedLetter, letterId) => {
  return fetch(`https://ghost-pen-32f1099a7abd.herokuapp.com/letters/${letterId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${getToken()}`,
    },
    body: JSON.stringify(updatedLetter),
  });
};
