import { getToken } from "../components/utils/getToken";

export const getUser = () => {
  return fetch("https://ghost-pen-32f1099a7abd.herokuapp.com/profile/my-profile", {
    method: "GET",
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  }).then((response) => response.json());
};
export const getUserProfile = (userId) => {
  return fetch(`https://ghost-pen-32f1099a7abd.herokuapp.com/ghostusers/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  }).then((response) => response.json());
};

export const updateUser = (userId, updatedUser) => {
  return fetch(`https://ghost-pen-32f1099a7abd.herokuapp.com/ghostusers/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${getToken()}`,
    },
    body: JSON.stringify(updatedUser),
  })
    .then((res) => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res.json();
    })
    .catch((error) => console.log(error));
};
