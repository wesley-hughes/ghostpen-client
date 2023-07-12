import { useEffect, useState } from "react";
import {
  getUser,
  getUserProfile,
  updateUser,
} from "../../managers/UserManager";
import { Button, Snackbar, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";

const FormContainer = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  maxWidth: "400px",
  margin: "auto",
});

const Heading = styled(Typography)({
  textAlign: "center",
  marginTop: "8px",
});

export const ProfileForm = () => {
  const [user, setUser] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [snackbar, setSnackbar] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
        setFirstName(userData.first_name);
        setLastName(userData.last_name);
        setBio(userData.ghostuser.bio);
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    fetchData();
  }, []);
  

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const updatedUser = {
      first_name: firstName,
      last_name: lastName,
      bio: bio,
    };

    updateUser(updatedUser)
      .then(() => {
        setSnackbar(true);
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
  };

  return (
    <FormContainer onSubmit={handleFormSubmit}>
      <Heading variant="h5">MY PROFILE</Heading>
      <TextField
        fullWidth
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        label="First Name"
      />
      <TextField
        fullWidth
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        label="Last Name"
      />
      <TextField
        fullWidth
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        label="Bio"
        multiline
        rows={4}
        placeholder="Enter your bio"
      />
      <Button type="submit">Save Changes</Button>
      <Snackbar
        open={snackbar}
        autoHideDuration={3000}
        onClose={() => setSnackbar(false)}
        message="Changes saved"
      />
    </FormContainer>
  );
};
