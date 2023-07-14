import { getToken } from "../components/utils/getToken";

export const getTones = () => {
  return fetch("https://ghost-pen-32f1099a7abd.herokuapp.com/tones", {
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  }).then((res) => res.json());
};

export const getToneById = (id) => {
  return fetch(`https://ghost-pen-32f1099a7abd.herokuapp.com/tones/${id}`, {
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  }).then((res) => res.json());
};
