import { getToken } from "../components/utils/getToken"

export const createLetter = (letterObj) => {
    return fetch("http://localhost:8000/letters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${getToken()}`
      },
      body: JSON.stringify(letterObj)
    })
      .then(res => res.json())
  }