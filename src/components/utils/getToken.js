export const getToken = () => {
    const auth = localStorage.getItem("auth_token")
    return auth
  }
  