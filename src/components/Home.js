import React from 'react';
import { Box, Grid } from '@mui/material/';
import IntimacaoVirtualCard from './IntimacaoVirtualCard';
import LivroIPCard from './LivroIPCard';
import SidebarMenu from './SidebarMenu';

export default function Home(props) {
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
                    
                    <SidebarMenu openDrawer={props.openDrawer} setOpenDrawer={props.setOpenDrawer} />
                </div>
            :
                <div>
                    Faça o login para acessar o sistema
                </div>
            }
        </div>
    );
}