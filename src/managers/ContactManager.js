import { getToken } from "../components/utils/getToken";

export const getContacts = () => {
  return fetch("http://localhost:8000/contacts", {
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  }).then((res) => res.json());
};

export const getContactById = (id) => {
  return fetch(`http://localhost:8000/contacts/${id}`, {
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  }).then((res) => res.json());
};

export const createContact = (newContact) => {
  return fetch("http://localhost:8000/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${getToken()}`,
    },
    body: JSON.stringify(newContact),
  }).then((res) => res.json());
};

export const updateContact = (contactId, updatedContact) => {
  return fetch(`http://localhost:8000/contacts/${contactId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${getToken()}`,
    },
    body: JSON.stringify(updatedContact),
  });
};

export const deleteContact = (contactId) => {
  return fetch(`http://localhost:8000/contacts/${contactId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${getToken()}`,
    },
  });
};
