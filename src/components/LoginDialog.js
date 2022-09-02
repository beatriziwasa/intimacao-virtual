import React, { useState } from 'react';
import Login from './Login';
import Logout from './Logout';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

function LoginDialog(props) {
    const { open, loggedIn, handleClose, handleLogin, handleLogout } = props;

    const [usuarioLogado, setUsuarioLogado] = useState({});
    const handleUsuarioLogado = (usuarioLogado) => setUsuarioLogado(usuarioLogado);

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Dados do Usuário:</DialogTitle>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="avatar" src={usuarioLogado['imageUrl']} sx={{ width: 56, height: 56 }} />
                    </ListItemAvatar>
                    <ListItemText primary={
                        <React.Fragment>
                            &nbsp;&nbsp;&nbsp;Nome:
                            <Typography style={{ fontWeight: 600 }} align="center">
                                {usuarioLogado['name']}
                            </Typography>
                        </React.Fragment>
                    }
                    secondary={
                        <React.Fragment>
                            &nbsp;&nbsp;&nbsp;E-mail:
                            <Typography style={{ fontWeight: 600 }} align="center">
                                {usuarioLogado['email']}
                            </Typography>
                        </React.Fragment>
                    } />
                </ListItem>
                <ListItem autoFocus button onClick={() => handleClose()}>
                    {loggedIn ? 
                        <Logout handleLogout={handleLogout} />
                        :
                        <Login handleLogin={handleLogin} handleUsuarioLogado={handleUsuarioLogado} />
                    }
                </ListItem>
            </List>
        </Dialog>
    );
}

export default LoginDialog;