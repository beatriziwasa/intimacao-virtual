import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import '../App.css';
import IntimacaoVirtualCard from './IntimacaoVirtualCard';
import LivroIPCard from './LivroIPCard';
import logoPCSC from '../logo-policial-civil.png';

function Home(props) {
  return (
    <div>
        { props.loggedIn ? 
            <div className='center'>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <IntimacaoVirtualCard />
                    </Grid>
                    <Grid item xs={6}>
                        <LivroIPCard />
                    </Grid>
                    </Grid>
                </Box>
            </div>
        :
            <div className='center'>
                <img alt="Logo da PCSC" src={logoPCSC} width="115" height="145" />
            </div>
        }
    </div>
  );
}

export default Home;