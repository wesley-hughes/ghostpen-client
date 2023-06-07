import { getToken } from "../components/utils/getToken"

export const getTags = () => {
    return fetch("http://localhost:8000/tags", {
      headers: {
        Authorization: `Token ${getToken()}`
      }
    })
      .then(res => res.json())
  }

  export const getTagById = (id) => {
    return fetch(`http://localhost:8000/tags/${id}`, {
      headers: {
        Authorization: `Token ${getToken()}`
      }
    })
      .then(res => res.json())
  }