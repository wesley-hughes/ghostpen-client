import { useEffect, useState } from "react";
import {
  getUser,
  getUserProfile,
  updateUser,
} from "../../managers/UserManager";
import {
  Button,
  FormControl,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
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
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUser();
        const userProfileData = await getUserProfile(userData.id);
        setUser(userProfileData);
        setFirstName(userProfileData.first_name);
        setLastName(userProfileData.last_name);
        setBio(userProfileData.bio);
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    fetchData();
  }, []);
  

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      first_name: firstName,
      last_name: lastName,
      bio: bio,
    };

    updateUser(user.id, updatedUser)
      .then((updatedData) => {
        console.log("User updated:", updatedData);
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
    </FormContainer>
  );
};
