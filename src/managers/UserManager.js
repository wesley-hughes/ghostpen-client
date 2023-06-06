import { getToken } from "../components/utils/getToken";

export const getUser = () => {
    return fetch('http://localhost:8000/profile/my-profile', {
      method: 'GET',
      headers: {
        Authorization: `Token ${getToken()}`
      },
    })
      .then((response) => response.json())
  };