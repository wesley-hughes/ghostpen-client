import React, { useState } from "react";
import { NavBar } from "./components/nav/NavBar";
import { ApplicationViews } from "./views/ApplicationViews";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#617a5b",
    },
    text: {
      primary: "#2b5425",
    },
  },
});

const darkTheme = createTheme({
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
  const [themeMode, setThemeMode] = useState("light");

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = themeMode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar toggleTheme={toggleTheme} themeMode={themeMode} />
      <ApplicationViews />
    </ThemeProvider>
  );
};
