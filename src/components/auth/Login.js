import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Dialog,
  FormControl,
  FormLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { loginUser } from "../../managers/AuthManager";


export const Login = () => {
  const username = useRef("");
  const password = useRef("");
  const [isInvalidDialogOpen, setIsInvalidDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = {
      username: username.current.value,
      password: password.current.value,
    };
    loginUser(user).then((res) => {
      if ("valid" in res && res.valid && "token" in res) {
        localStorage.setItem("auth_token", res.token);
        navigate("/");
      } else {
        setIsInvalidDialogOpen(true);
      }
    });
  };

  const handleCloseInvalidDialog = () => {
    setIsInvalidDialogOpen(false);
  };

  return (
    <Container
      maxWidth="xs"
      sx={{ backgroundColor: "transparent", padding: "24px", marginTop: "30px" }}
    >
      <Dialog open={isInvalidDialogOpen} onClose={handleCloseInvalidDialog}>
        <Typography variant="body1">Username or password was not valid.</Typography>
        <Button onClick={handleCloseInvalidDialog}>Close</Button>
      </Dialog>

      <Paper elevation={2} sx={{ padding: "24px" }}>
        <Typography
          variant="h6"
          align="center"
          gutterBottom
          sx={{ textTransform: "uppercase" }}
        >
          Please sign in
        </Typography>

        <form onSubmit={handleLogin}>
          <Grid container spacing={2} sx={{ marginTop: 4 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormLabel sx={{ marginBottom: 1 }}>Email</FormLabel>
                <TextField
                  inputRef={username}
                  type="username"
                  id="username"
                  placeholder="Email"
                  required
                  autoFocus
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormLabel sx={{ marginBottom: 1 }}>Password</FormLabel>
                <TextField
                  inputRef={password}
                  type="password"
                  id="password"
                  placeholder="Password"
                  required
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" fullWidth>
                Sign In
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
          <Link to="/register">Not a member yet?</Link>
        </Typography>
      </Paper>
    </Container>
  );
};
