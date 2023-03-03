import React from 'react';
import { Link } from "react-router-dom";
import { Box, Drawer, List, Divider, ListItemButton, ListItemIcon, ListItemText } from '@mui/material/';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import BookIcon from '@mui/icons-material/Book';
import HomeIcon from '@mui/icons-material/Home';

export default function SidebarMenu(props) {
    const { openDrawer, setOpenDrawer } = props;

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpenDrawer(open);
    };

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItemButton to={"/"} component={Link}
                    sx={{
                        "&: hover": {
                            backgroundColor: '#1e293a'
                        },
                        paddingY: "12px",
                        paddingX: "24px"
                    }}
                >
                    <ListItemIcon>
                        <HomeIcon sx={{ color: "#eeeeee" }}/>
                    </ListItemIcon>
                    <ListItemText primary={'Página Inicial'} />
                </ListItemButton>
            </List>
            <Divider sx={{ bgcolor: "#eeeeee" }}/>
            <List>
                <ListItemButton to={"/intimacao"} component={Link}
                    sx={{
                        "&: hover": {
                            backgroundColor: '#1e293a'
                        },
                        paddingY: "12px",
                        paddingX: "24px"
                    }}
                >
                    <ListItemIcon>
                        <VideoCallIcon sx={{ color: "#eeeeee" }}/>
                    </ListItemIcon>
                    <ListItemText primary={'Intimação Virtual'} />
                </ListItemButton>
            </List>
            <Divider sx={{ bgcolor: "#eeeeee" }}/>
            <List>
                <ListItemButton to={"/livro/ip"} component={Link}
                    sx={{
                        "&: hover": {
                            backgroundColor: '#1e293a'
                        },
                        paddingY: "12px",
                        paddingX: "24px"
                    }}
                >
                    <ListItemIcon>
                        <BookIcon sx={{ color: "#eeeeee" }}/>
                    </ListItemIcon>
                    <ListItemText primary={'Livro IP'} />
                </ListItemButton>
                
                <ListItemButton to={"/livro/tc"} component={Link}
                    sx={{
                        "&: hover": {
                            backgroundColor: '#1e293a'
                        },
                        paddingY: "12px",
                        paddingX: "24px"
                    }}
                >
                    <ListItemIcon>
                        <BookIcon sx={{ color: "#eeeeee" }}/>
                    </ListItemIcon>
                    <ListItemText primary={'Livro TC'} />
                </ListItemButton>
            
                <ListItemButton to={"/livro/apf"} component={Link}
                    sx={{
                        "&: hover": {
                            backgroundColor: '#1e293a'
                        },
                        paddingY: "12px",
                        paddingX: "24px"
                    }}
                >
                    <ListItemIcon>
                        <BookIcon sx={{ color: "#eeeeee" }}/>
                    </ListItemIcon>
                    <ListItemText primary={'Livro APF'} />
                </ListItemButton>
            </List>
        </Box>
    );

    return (
        <Drawer variant="temporary" anchor="left" open={openDrawer} onClose={toggleDrawer(false)}
            sx={{
                width: '250px',
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: '250px',
                    boxSizing: "border-box",
                    borderRight: "0px",
                    backgroundColor: '#233044',
                    color: '#eeeeee'
                }
            }}
        >
            {list()}
        </Drawer>
    );
}