import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Dialog,
  FormControl,
  FormGroup,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { loginUser } from "../../managers/AuthManager";

export const Login = () => {
  const username = useRef("");
  const password = useRef("");
  const invalidDialog = useRef(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = {
      username: username.current.value,
      password: password.current.value,
    };
    loginUser(user)
      .then((res) => {
        if ("valid" in res && res.valid && "token" in res) {
          localStorage.setItem("auth_token", res.token);
          navigate("/");
        } else {
          invalidDialog.current.showModal();
        }
      });
  };

  return (
    <Container maxWidth="xs">
      <Dialog
        open={false}
        onClose={() => invalidDialog.current.close()}
        ref={invalidDialog}
      >
        <Typography variant="body1">Username or password was not valid.</Typography>
        <Button onClick={() => invalidDialog.current.close()}>Close</Button>
      </Dialog>

      {/* <Typography variant="h4" align="center" gutterBottom>
        GhostPen
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        Please sign in
      </Typography> */}

      <form onSubmit={handleLogin}>
        <FormControl fullWidth>
          <FormLabel htmlFor="inputUsername" sx={{ mt: 4 }}>Email</FormLabel>
          <TextField
            inputRef={username}
            type="username"
            id="username"
            placeholder="Email"
            required
            autoFocus
          />
        </FormControl>

        <FormControl fullWidth>
          <FormLabel htmlFor="inputPassword">Password</FormLabel>
          <TextField
            inputRef={password}
            type="password"
            id="password"
            placeholder="Password"
            required
          />
        </FormControl>

        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Sign In
        </Button>
      </form>

      <Typography variant="body1" align="center" sx={{ mt: 2 }}>
        <Link to="/register">Not a member yet?</Link>
      </Typography>
    </Container>
  );
};
