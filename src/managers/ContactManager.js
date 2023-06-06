import { getToken } from "../components/utils/getToken"


export const getContacts = () => {
    return fetch("http://localhost:8000/contacts", {
      headers: {
        Authorization: `Token ${getToken()}`
      }
    })
      .then(res => res.json())
  }

  export const getContactById = (id) => {
    return fetch(`http://localhost:8000/contacts/${id}`, {
      headers: {
        Authorization: `Token ${getToken()}`
      }
    })
      .then(res => res.json())
  }