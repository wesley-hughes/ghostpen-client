import React, { useState } from "react";
import { NavBar } from "./components/nav/NavBar";
import { ApplicationViews } from "./views/ApplicationViews";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";


const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#a5a5a5",
    },
    text: {
      primary: "#eaeaea",
      secondary: "#c5c5c5",
    },
  },
});

export const GhostPen = () => {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <ApplicationViews />
    </ThemeProvider>
  );
};
