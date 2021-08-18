import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter as Router } from "react-router-dom";
import theme from "./theme";
import "./App.css";
import React from "react";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import Main from "./components/layout/Main";
import { AuthProvider } from "./hooks/useAuth";
import { CustomSnackbarProvider } from "./components/layout/Snackbar";
import { Snackbar } from "@material-ui/core";

function App() {
  
  const user = JSON.parse(localStorage.getItem('bwf-user'));
  
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider user={user}>
        <CustomSnackbarProvider maxSnack={3}>
        <Router>
          <div className="App">
            <Header />
            <div className="general-content">
              <Sidebar />
              <Main />
            </div>
          </div>
        </Router>
        </CustomSnackbarProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
