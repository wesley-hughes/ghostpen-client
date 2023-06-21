import { getToken } from "../components/utils/getToken";

export const getTags = () => {
  return fetch("https://ghost-pen-32f1099a7abd.herokuapp.com/tags", {
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  }).then((res) => res.json());
};

export const getTagById = (id) => {
  return fetch(`https://ghost-pen-32f1099a7abd.herokuapp.com/tags/${id}`, {
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  }).then((res) => res.json());
};
