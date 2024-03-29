import { getToken } from "../components/utils/getToken";

export const ghostInput = async (userInput) => {
  try {
    const response = await fetch("https://ghost-pen-32f1099a7abd.herokuapp.com/ghost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${getToken()}`,
      },
      body: JSON.stringify({user_input: userInput }),
    });

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to send user input.");
  }
};
