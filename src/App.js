import React from 'react';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Toolbar from '@mui/material/Toolbar';
import './App.css';
import Header from './components/layout/Header';
import Home from "./components/pages/Home";
import { IntimacaoComponent } from "./components/intimacao/IntimacaoComponent";
import { Livro } from "./components/pages/Livro";
import { IpComponent } from "./components/ip/IpComponent";
import { TcComponent } from "./components/tc/TcComponent";
import { ApfComponent } from "./components/apf/ApfComponent";
import { OficioComponent } from "./components/oficio/OficioComponent";
import LoginDialog from './components/login/LoginDialog';
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

  const [openDrawer, setOpenDrawer] = React.useState(false);
  const handleOpenDrawer = () => setOpenDrawer(true);

  return (
    <div className='App'>
      <Header handleOpen={handleOpen} loggedIn={loggedIn} handleOpenDrawer={handleOpenDrawer} />
      
      <Toolbar />
      
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element = { <Home loggedIn={loggedIn} openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} /> } />
          <Route path="/intimacao-virtual" element = { <Home loggedIn={loggedIn} openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} /> } />
          <Route path="/intimacao" element = { <IntimacaoComponent loggedIn={loggedIn} openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} /> } />
          <Route path="/livro/:proc" element = { <Livro loggedIn={loggedIn} openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} /> } />
          <Route path="/ip/:ano" element = { <IpComponent loggedIn={loggedIn} openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} /> } />
          <Route path="/tc/:ano" element = { <TcComponent loggedIn={loggedIn} openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} /> } />
          <Route path="/apf/:ano" element = { <ApfComponent loggedIn={loggedIn} openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} /> } />
          <Route path="/oficio/:ano" element = { <OficioComponent loggedIn={loggedIn} openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} /> } />
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