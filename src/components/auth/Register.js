import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../managers/AuthManager";
import {
  Button,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  FormLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

export const Register = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const verifyPasswordRef = useRef();
  const bioRef = useRef();
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
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
      setIsPasswordDialogOpen(true);
    }
  };

  const handleClosePasswordDialog = () => {
    setIsPasswordDialogOpen(false);
  };

  return (
    <Container
      maxWidth="xs"
      sx={{ backgroundColor: "transparent", padding: "24px" }}
    >
      <Dialog open={isPasswordDialogOpen} onClose={handleClosePasswordDialog}>
        <DialogTitle>Passwords do not match</DialogTitle>
        <DialogContent>
          <Button onClick={handleClosePasswordDialog}>Close</Button>
        </DialogContent>
      </Dialog>

      <Paper elevation={2} sx={{ padding: "10px" }}>
        <Typography
          variant="h6"
          align="center"
          gutterBottom
          sx={{ textTransform: "uppercase" }}
        >
          Register an account
        </Typography>

        <form onSubmit={handleRegister}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormLabel>First Name</FormLabel>
                <TextField inputRef={firstNameRef} type="text" placeholder="First name" required autoFocus />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormLabel>Last Name</FormLabel>
                <TextField inputRef={lastNameRef} type="text" placeholder="Last name" required />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormLabel>Email</FormLabel>
                <TextField inputRef={usernameRef} type="text" placeholder="Email" required />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormLabel>Password</FormLabel>
                <TextField inputRef={passwordRef} type="password" placeholder="Password" required />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormLabel>Verify Password</FormLabel>
                <TextField inputRef={verifyPasswordRef} type="password" placeholder="Verify password" required />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormLabel>Personal Bio</FormLabel>
                <TextField
                  inputRef={bioRef}
                  placeholder="Please provide a detailed bio"
                  multiline
                  rows={4}
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" fullWidth>
                Register
              </Button>
            </Grid>
          </Grid>
        </form>

        <Typography
          variant="body1"
          align="center"
          sx={{
            marginTop: 2,
            "& a": {
              color: "#fffff1",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            },
          }}
        >
          Already registered? <Link to="/login">Login</Link>
        </Typography>
      </Paper>
    </Container>
  );
};
