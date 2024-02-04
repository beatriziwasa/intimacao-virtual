import React from 'react';
import { Link, useParams } from "react-router-dom";
import { Select, MenuItem, Box } from '@mui/material/';
import livroRegistro from '../../images/livro-registro.jpg';
import logoPCSC from '../../images/logo-policial-civil.png';
import SidebarMenu from '../layout/SidebarMenu';

export const Livro = (props) => {
    const { proc } = useParams();
    const [tipoProcedimento, setTipoProcedimento] = React.useState(proc);
    const [ano, setAno] = React.useState("2024");
    const link = "/" + tipoProcedimento + "/" + ano;
    
    const tiposProcedimentos = [
        {
            value: 'ip',
            label: 'IP',
        },
        {
            value: 'tc',
            label: 'TC',
        },
        {
            value: 'apf',
            label: 'APF',
        }/*,
        {
            value: 'oficio',
            label: 'Ofício'
        }*/
    ]

    const anos = [
        {
            value: '2024',
            label: '2024',
        },
        {
            value: '2023',
            label: '2023',
        },
        {
            value: '2022',
            label: '2022',
        },
        {
            value: '2021',
            label: '2021',
        },
        {
            value: '2020',
            label: '2020',
        },
        {
            value: '2019',
            label: '2019',
        }
    ]

    const handleChangeSelectTipoProcedimento = (event) => {
        setTipoProcedimento(event.target.value);
    }

    const handleChangeSelectAno = (event) => {
        setAno(event.target.value);
    }

    return (
        <>
            { props.loggedIn ? 
                <Box sx={{ backgroundImage: `url(${livroRegistro})`,
                    backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
                    height: '70vh', width: '50vw', textAlign: 'center' }}>
                
                    <Box sx={{ marginTop: '100px', marginLeft: '20px' }}>
                        <Select
                            id="select-tipo-procedimento"
                            label=""
                            value={tipoProcedimento}
                            variant='outlined'
                            onChange={handleChangeSelectTipoProcedimento}
                            sx={{ fontSize: '20px', color: 'white', fontWeight: 'bold'}}
                        >
                            {tiposProcedimentos.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                        <Select
                            id="select-ano"
                            label=""
                            value={ano}
                            variant='outlined'
                            onChange={handleChangeSelectAno}
                            sx={{ fontSize: '20px', color: 'white', fontWeight: 'bold'}}
                        >
                            {anos.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>

                    <Box sx={{ marginTop: '50px' }}>
                        <Link to={link}><img alt="Logo da PCSC" src={logoPCSC} width="100" height="120" /></Link>
                    </Box>

                    <SidebarMenu openDrawer={props.openDrawer} setOpenDrawer={props.setOpenDrawer} />
                </Box>
            :
                <div>
                    Faça o login para acessar o sistema
                </div>
            }
        </>
    );
}