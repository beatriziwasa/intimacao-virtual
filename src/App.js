import React from 'react';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Toolbar from '@mui/material/Toolbar';
import './App.css';
import Header from './components/Header';
import Home from "./components/Home";
import { IntimacaoComponent } from "./components/IntimacaoComponent";
import { IpComponent } from "./components/IpComponent";
import LoginDialog from './components/LoginDialog';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const handleLogin = () => setLoggedIn(true);
  const handleLogout = () => setLoggedIn(false);
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openAlert, setOpenAlert] = React.useState(false);
  const handleOpenAlert = () => setOpenAlert(true);
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const [alertMessage, setAlertMessage] = React.useState('');
  const handleAlertMessage = (message) => setAlertMessage(message);

  const [alertSeverity, setAlertSeverity] = React.useState('');
  const handleAlertSeverity = (severity) => setAlertSeverity(severity);

  return (
    <div className='App'>
      <Header handleOpen={handleOpen} loggedIn={loggedIn} />
      
      <Toolbar />
      
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element = { <Home loggedIn={loggedIn} /> } />
          <Route path="/intimacao-virtual" element = { <Home loggedIn={loggedIn} /> } />
          <Route path="/intimacao" element = { <IntimacaoComponent loggedIn={loggedIn} /> } />
          <Route path="/ip" element = { <IpComponent loggedIn={loggedIn} /> } />
          <Route path="*" element={<div>Erro 404 - Página não encontrada!</div>} />
        </Routes>
      </BrowserRouter>

      <LoginDialog
        open={open}
        loggedIn={loggedIn}
        handleClose={handleClose}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        handleOpenAlert={handleOpenAlert}
        handleAlertMessage={handleAlertMessage}
        handleAlertSeverity={handleAlertSeverity}
      />
        
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}