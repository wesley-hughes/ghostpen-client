import { getToken } from "../components/utils/getToken";

export const getContacts = () => {
  return fetch("https://ghost-pen-32f1099a7abd.herokuapp.com/contacts", {
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  }).then((res) => res.json());
};
export const getUserContacts = () => {
  return fetch(`https://ghost-pen-32f1099a7abd.herokuapp.com/contacts/mycontacts`, {
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  }).then((res) => res.json());
};

export const getContactById = (id) => {
  return fetch(`https://ghost-pen-32f1099a7abd.herokuapp.com/contacts/${id}`, {
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  }).then((res) => res.json());
};

export const createContact = (newContact) => {
  return fetch("https://ghost-pen-32f1099a7abd.herokuapp.com/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${getToken()}`,
    },
    body: JSON.stringify(newContact),
  }).then((res) => res.json());
};

export const updateContact = (contactId, updatedContact) => {
  return fetch(`https://ghost-pen-32f1099a7abd.herokuapp.com/contacts/${contactId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${getToken()}`,
    },
    body: JSON.stringify(updatedContact),
  });
};

export const deleteContact = (contactId) => {
  return fetch(`https://ghost-pen-32f1099a7abd.herokuapp.com/contacts/${contactId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  });
};
