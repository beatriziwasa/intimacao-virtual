import React, { useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { Select, MenuItem, Box } from '@mui/material/';
import { GoogleAPI } from '../api/GoogleAPI';
import livroRegistro from '../../images/livro-registro.jpg';
import logoPCSC from '../../images/logo-policial-civil.png';
import SidebarMenu from '../layout/SidebarMenu';

export const Livro = (props) => {

    useEffect(() => {
        obterTotaisIPs(ano);
    }, []);

    const { proc } = useParams();
    const [tipoProcedimento, setTipoProcedimento] = React.useState(proc);
    const [ano, setAno] = React.useState("2024");
    const [qtdIPsTramitando, setQtdIPsTramitando] = React.useState(0);
    const [qtdIPsRemetidos, setQtdIPsRemetidos] = React.useState(0);
    const [qtdIPsBaixados, setQtdIPsBaixados] = React.useState(0);
    const [qtdIPsArquivados, setQtdIPsArquivados] = React.useState(0);
    const [qtdTCsTramitando, setQtdTCsTramitando] = React.useState(0);
    const [qtdTCsRemetidos, setQtdTCsRemetidos] = React.useState(0);
    const [qtdTCsBaixados, setQtdTCsBaixados] = React.useState(0);
    const [qtdTCsArquivados, setQtdTCsArquivados] = React.useState(0);
    const [qtdAPFsTramitando, setQtdAPFsTramitando] = React.useState(0);
    const [qtdAPFsRemetidos, setQtdAPFsRemetidos] = React.useState(0);
    const [qtdAPFsBaixados, setQtdAPFsBaixados] = React.useState(0);
    const [qtdAPFsArquivados, setQtdAPFsArquivados] = React.useState(0);
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
        if (event.target.value === "ip") {
            obterTotaisIPs(ano);
        } else if (event.target.value === "tc") {
            obterTotaisTCs(ano);
        } else if (event.target.value === "apf") {
            obterTotaisAPFs(ano);
        }
    }

    const handleChangeSelectAno = (event) => {
        setAno(event.target.value);
        if (tipoProcedimento === "ip") {
            obterTotaisIPs(event.target.value);
        } else if (tipoProcedimento === "tc") {
            obterTotaisTCs(event.target.value);
        } else if (tipoProcedimento === "apf") {
            obterTotaisAPFs(event.target.value);
        }
    }

    const obterTotaisIPs = (ano) => {
        GoogleAPI.consultar('IP').then((ip) => {
            let qtdIPsTramitando = 0;
            let qtdIPsRemetidos = 0;
            let qtdIPsBaixados = 0;
            let qtdIPsArquivados = 0;
            
            for (let i = 0; i < ip.length; i++) {
                if (ip[i].status === "Tramitando") {
                    qtdIPsTramitando = qtdIPsTramitando + 1;
                    
                } else if(ip[i].status === "Remetido") {
                    if (ip[i].dataRemessa.split("-")[0] === ano) {
                        qtdIPsRemetidos = qtdIPsRemetidos + 1
                    }

                } else if(ip[i].status === "Baixado") {
                    qtdIPsBaixados = qtdIPsBaixados + 1

                } else if(ip[i].status === "Arquivado") {
                    if (ip[i].dataRemessa.split("-")[0] === ano) {
                        qtdIPsArquivados = qtdIPsArquivados + 1
                    }
                }
            }

            setQtdIPsTramitando(qtdIPsTramitando);
            setQtdIPsRemetidos(qtdIPsRemetidos);
            setQtdIPsBaixados(qtdIPsBaixados);
            setQtdIPsArquivados(qtdIPsArquivados);
        });
    }

    const obterTotaisTCs = (ano) => {
        GoogleAPI.consultar('TC').then((tc) => {
            let qtdTCsTramitando = 0;
            let qtdTCsRemetidos = 0;
            let qtdTCsBaixados = 0;
            let qtdTCsArquivados = 0;
            
            for (let i = 0; i < tc.length; i++) {
                if (tc[i].status === "Tramitando") {
                    qtdTCsTramitando = qtdTCsTramitando + 1;

                } else if(tc[i].status === "Remetido") {
                    if (tc[i].dataRemessa.split("-")[0] === ano) {
                        qtdTCsRemetidos = qtdTCsRemetidos + 1
                    }

                } else if(tc[i].status === "Baixado") {
                    qtdTCsBaixados = qtdTCsBaixados + 1

                } else if(tc[i].status === "Arquivado") {
                    if (tc[i].dataRemessa.split("-")[0] === ano) {
                        qtdTCsArquivados = qtdTCsArquivados + 1
                    }
                }
            }

            setQtdTCsTramitando(qtdTCsTramitando);
            setQtdTCsRemetidos(qtdTCsRemetidos);
            setQtdTCsBaixados(qtdTCsBaixados);
            setQtdTCsArquivados(qtdTCsArquivados);
        });
    }

    const obterTotaisAPFs = (ano) => {
        GoogleAPI.consultar('APF').then((apf) => {
            let qtdAPFsTramitando = 0;
            let qtdAPFsRemetidos = 0;
            let qtdAPFsBaixados = 0;
            let qtdAPFsArquivados = 0;
            
            for (let i = 0; i < apf.length; i++) {
                if (apf[i].status === "Tramitando") {
                    qtdAPFsTramitando = qtdAPFsTramitando + 1;

                } else if(apf[i].status === "Remetido") {
                    if (apf[i].dataRemessa.split("-")[0] === ano) {
                        qtdAPFsRemetidos = qtdAPFsRemetidos + 1
                    }

                } else if(apf[i].status === "Baixado") {
                    qtdAPFsBaixados = qtdAPFsBaixados + 1

                } else if(apf[i].status === "Arquivado") {
                    if (apf[i].dataRemessa.split("-")[0] === ano) {
                        qtdAPFsArquivados = qtdAPFsArquivados + 1
                    }
                }
            }

            setQtdAPFsTramitando(qtdAPFsTramitando);
            setQtdAPFsRemetidos(qtdAPFsRemetidos);
            setQtdAPFsBaixados(qtdAPFsBaixados);
            setQtdAPFsArquivados(qtdAPFsArquivados);
        });
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

                    { tipoProcedimento === "ip" ?
                    <>
                    <Box sx={{ marginTop: '20px', fontSize: '15px', color: 'white', fontWeight: 'bold' }}>
                        <label htmlFor="tramitando">Tramitando: {qtdIPsTramitando}</label>
                    </Box>
                    <Box sx={{ marginTop: '10px', fontSize: '15px', color: 'white', fontWeight: 'bold' }}>
                        <label htmlFor="remetidos">Remetidos ({ano}): {qtdIPsRemetidos}</label>
                    </Box>
                    <Box sx={{ marginTop: '10px', fontSize: '15px', color: 'white', fontWeight: 'bold' }}>
                        <label htmlFor="baixados">Baixados: {qtdIPsBaixados}</label>
                    </Box>
                    <Box sx={{ marginTop: '10px', fontSize: '15px', color: 'white', fontWeight: 'bold' }}>
                        <label htmlFor="arquivados">Arquivados ({ano}): {qtdIPsArquivados}</label>
                    </Box>
                    </>
                    : undefined }
                    
                    { tipoProcedimento === "tc" ?
                    <>
                    <Box sx={{ marginTop: '20px', fontSize: '15px', color: 'white', fontWeight: 'bold' }}>
                        <label htmlFor="tramitando">Tramitando: {qtdTCsTramitando}</label>
                    </Box>
                    <Box sx={{ marginTop: '10px', fontSize: '15px', color: 'white', fontWeight: 'bold' }}>
                        <label htmlFor="remetidos">Remetidos ({ano}): {qtdTCsRemetidos}</label>
                    </Box>
                    <Box sx={{ marginTop: '10px', fontSize: '15px', color: 'white', fontWeight: 'bold' }}>
                        <label htmlFor="baixados">Baixados: {qtdTCsBaixados}</label>
                    </Box>
                    <Box sx={{ marginTop: '10px', fontSize: '15px', color: 'white', fontWeight: 'bold' }}>
                        <label htmlFor="arquivados">Arquivados ({ano}): {qtdTCsArquivados}</label>
                    </Box>
                    </>
                    : undefined }
                    
                    { tipoProcedimento === "apf" ?
                    <>
                    <Box sx={{ marginTop: '20px', fontSize: '15px', color: 'white', fontWeight: 'bold' }}>
                        <label htmlFor="tramitando">Tramitando: {qtdAPFsTramitando}</label>
                    </Box>
                    <Box sx={{ marginTop: '10px', fontSize: '15px', color: 'white', fontWeight: 'bold' }}>
                        <label htmlFor="remetidos">Remetidos ({ano}): {qtdAPFsRemetidos}</label>
                    </Box>
                    <Box sx={{ marginTop: '10px', fontSize: '15px', color: 'white', fontWeight: 'bold' }}>
                        <label htmlFor="baixados">Baixados: {qtdAPFsBaixados}</label>
                    </Box>
                    <Box sx={{ marginTop: '10px', fontSize: '15px', color: 'white', fontWeight: 'bold' }}>
                        <label htmlFor="arquivados">Arquivados ({ano}): {qtdAPFsArquivados}</label>
                    </Box>
                    </>
                    : undefined }

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