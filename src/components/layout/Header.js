import { AppBar, Toolbar, Typography, makeStyles, Button } from "@material-ui/core";
import React from "react";
import logoPCSC from '../../images/logo-policial-civil.png';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const useStyles = makeStyles(() => ({
    header: {
        backgroundColor: "lightgrey",
    },
    titulo: {
        fontFamily: "Work Sans, sans-serif",
        fontWeight: 600,
        color: "black",
        textAlign: "left",
    },
    logo: {
        marginRight: "20px",
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    }
}));

export default function Header(props) {
  const { header, titulo, logo, toolbar } = useStyles();

  const displayDesktop = () => {
    return (
        <Toolbar className={toolbar}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            disabled={!props.loggedIn}
            onClick={props.handleOpenDrawer}
          >
            <MenuIcon color="action" />
          </IconButton>

          {tituloIntimacaoVirtual}
          {getMenuButtons()}
        </Toolbar>
    );
  };

  const tituloIntimacaoVirtual = (
    <div>
      <div className='displayInlineBlock'>
        <img alt="Logo da PCSC" src={logoPCSC} width="35" height="45" className={logo} />
      </div>
      <div className='displayInlineBlock'>
        <Typography variant="h6" component="h1" className={titulo}>
            DELEGACIA VIRTUAL - 11ª Delegacia de Polícia da Capital - DPTUR
        </Typography>
      </div>
    </div>
  );

  const getMenuButtons = () => {
    return <Button onClick={props.handleOpen}>{props.loggedIn ? "Logout" : "Login"}</Button>
  };

  return (
    <header>
      <AppBar className={header}>{displayDesktop()}</AppBar>
    </header>
  );
}