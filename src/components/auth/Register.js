import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../managers/AuthManager";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Typography,
  Paper,
  Container,
} from "@mui/material";

export const Register = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const verifyPasswordRef = useRef();
  const bioRef = useRef();
  const passwordDialogRef = useRef();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (passwordRef.current.value === verifyPasswordRef.current.value) {
      const newUser = {
        username: usernameRef.current.value,
        first_name: firstNameRef.current.value,
        last_name: lastNameRef.current.value,
        bio: bioRef.current.value,
        password: passwordRef.current.value,
      };

      registerUser(newUser).then((res) => {
        if ("token" in res) {
          localStorage.setItem("auth_token", res.token);
          navigate("/");
        }
      });
    } else {
      passwordDialogRef.current.showModal();
    }
  };

  return (
    <Container maxWidth="xs" sx={{ textAlign: "center" }}>
      <Dialog open={false} ref={passwordDialogRef}>
        <DialogTitle>Passwords do not match</DialogTitle>
        <DialogContent>
          <Button onClick={() => passwordDialogRef.current.close()}>Close</Button>
        </DialogContent>
      </Dialog>

      <Paper elevation={2} sx={{ padding: "24px" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Register an account
        </Typography>

        <form onSubmit={handleRegister}>
          <TextField
            inputRef={firstNameRef}
            name="firstName"
            label="First Name"
            type="text"
            placeholder="First name"
            required
            autoFocus
            fullWidth
            margin="normal"
          />

          <TextField
            inputRef={lastNameRef}
            name="lastName"
            label="Last Name"
            type="text"
            placeholder="Last name"
            required
            fullWidth
            margin="normal"
          />

          <TextField
            inputRef={usernameRef}
            name="username"
            label="Email"
            type="text"
            placeholder="Email"
            required
            fullWidth
            margin="normal"
          />

          <TextField
            inputRef={passwordRef}
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            required
            fullWidth
            margin="normal"
          />

          <TextField
            inputRef={verifyPasswordRef}
            name="verifyPassword"
            label="Verify Password"
            type="password"
            placeholder="Verify password"
            required
            fullWidth
            margin="normal"
          />

          <TextField
            inputRef={bioRef}
            name="bio"
            label="Personal Bio"
            placeholder="Please provide a detailed bio"
            multiline
            rows={4}
            fullWidth
            margin="normal"
          />

          <Button variant="contained" type="submit" fullWidth>
            Register
          </Button>
        </form>

        <Typography variant="body1" component="section" sx={{ marginTop: 2 }}>
          Already registered? <Link to="/login">Login</Link>
        </Typography>
      </Paper>
    </Container>
  );
};
