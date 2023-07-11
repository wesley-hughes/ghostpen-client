import { getToken } from "../components/utils/getToken";

export const getTones = () => {
  return fetch("http://localhost:8000/tones", {
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  }).then((res) => res.json());
};

export const getToneById = (id) => {
  return fetch(`http://localhost:8000/tones/${id}`, {
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  }).then((res) => res.json());
};
