import "./App.css";
import Card from "./components/Card.jsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";

import axios from "axios";
function App() {
  const theme = createTheme({
    typography: {
      fontFamily: ["Robot"],
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          <Card />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
