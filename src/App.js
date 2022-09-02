import React from 'react';
import './App.css';
import { IntimacaoComponent } from './components/IntimacaoComponent';
import logoPCSC from './logo-policial-civil.png';
import LoginDialog from './components/LoginDialog';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const handleLogin = () => setLoggedIn(true);
  const handleLogout = () => setLoggedIn(false);
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className='App'>
      <header className='App-header'>
        <div className='container'>
          <div className='img-wrap'>
            <img alt="Logo da PCSC" src={logoPCSC} width="75" height="95" />
          </div>
          <div className='title-wrap'>
            <br/>
            <div>
            <h2>INTIMAÇÃO VIRTUAL</h2>
            <h2>11ª Delegacia de Polícia da Capital - DPTUR</h2>
            </div>
          </div>
          <div className='login-button-wrap'>
            <button onClick={handleOpen}><PersonOutlineIcon sx={{ fontSize: 40 }} /></button>
          </div>
        </div>
      </header>

      {loggedIn ? 
        <IntimacaoComponent />
      : undefined }

      <LoginDialog
        open={open}
        loggedIn={loggedIn}
        handleClose={handleClose}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />
    </div>
  );
}

export default App;