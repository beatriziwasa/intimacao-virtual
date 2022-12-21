import React from 'react';
import Box from '@mui/material/Box';
import './App.css';
import { IntimacaoComponent } from './components/IntimacaoComponent';
import Header from './components/Header';
import logoPCSC from './logo-policial-civil.png';
import LoginDialog from './components/LoginDialog';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const handleLogin = () => setLoggedIn(true);
  const handleLogout = () => setLoggedIn(false);
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className='App'>
      <Header handleOpen={handleOpen} loggedIn={loggedIn}/>

      {loggedIn ? 
        <div className='content'>
          <Box sx={{ overflow: "auto" }}>
            <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
              <IntimacaoComponent />
            </Box>
          </Box>
        </div>
      :
        <div className='center'>
          <img alt="Logo da PCSC" src={logoPCSC} width="115" height="145" />
        </div> 
      }

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