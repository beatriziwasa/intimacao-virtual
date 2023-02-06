import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import MaterialTable from 'material-table'
import { ThemeProvider, createTheme } from '@mui/material';
import BasicModalIP from './BasicModalIP';
import BasicModalCertidao from './BasicModalCertidao';
import { GoogleAPI } from './GoogleAPI';
import BasicBreadcrumbs from './BasicBreadcrumbs';
import SidebarMenu from './SidebarMenu';

export const IpComponent = (props) => {

    useEffect(() => {
        buscarIPs();
    }, []);

    const { ano } = useParams();
    
    const [open, setOpen] = React.useState(false);
    const [openCertidao, setOpenCertidao] = React.useState(false);
    const [ips, setIPs] = useState([]);
    const [ipSelecionado, setIPSelecionado] = useState({});

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenCertidao = () => setOpenCertidao(true);
    const handleCloseCertidao = () => setOpenCertidao(false);

    const handleAlterar = (rowData) => {
        setIPSelecionado(rowData);
        handleOpen();
    }

    const handleIncluir = () => {
        setIPSelecionado({});
        handleOpen();
    }
    
    const buscarIPs = () => {
        GoogleAPI.consultar('IP').then((ip) => {
            const listaIps = [];
            for (let i = 0; i < ip.length; i++) {
                if (ip[i].ano === ano) {
                    let dataAutuacaoTabela = "";
                    let dataTemp = ip[i].dataAutuacao;
                    dataTemp = dataTemp.split("-");
                    dataAutuacaoTabela = dataTemp[2].concat("/").concat(dataTemp[1]).concat("/").concat(dataTemp[0]);

                    let dataRemessaTabela = "";
                    let dataTemp1 = ip[i].dataAutuacao;
                    dataTemp1 = dataTemp1.split("-");
                    dataRemessaTabela = dataTemp1[2].concat("/").concat(dataTemp1[1]).concat("/").concat(dataTemp1[0]);

                    const ipJSON = {
                        'id': ip[i].id,
                        'escrivao': ip[i].escrivao,
                        'numero': ip[i].numero,
                        'ano': ip[i].ano,
                        'dataAutuacao': ip[i].dataAutuacao,
                        'dataAutuacaoTabela': dataAutuacaoTabela,
                        'delito': ip[i].delito,
                        'delegado': ip[i].delegado,
                        'investigado': ip[i].investigado,
                        'vitima': ip[i].vitima,
                        'origemBOOficio': ip[i].origemBOOficio,
                        'apreensao': ip[i].apreensao,
                        'dataRemessa': ip[i].dataRemessa,
                        'dataRemessaTabela': dataRemessaTabela,
                        'numAutoForum': ip[i].numAutoForum,
                        'status': ip[i].status
                    };
                    listaIps.push(ipJSON);
                }
            }
            setIPs(listaIps);
        });
    }

    async function excluirIntimacoes(id) {
        GoogleAPI.excluir(id, 'IP').then(() => {
            alert('IP excluído com sucesso!');
            buscarIPs();
        });
    }

    const emitirCertidao = (rowData) => {
        setIPSelecionado(rowData);
        handleOpenCertidao();
    }

    const defaultMaterialTheme = createTheme();

    const columns = [
        { title: 'Número', field: 'numero', sorting: false, cellStyle: {
            whiteSpace: 'nowrap'//, position: "sticky", left: 0, background: "#e4dbb1",
        }},
        { title: 'Ano', field: 'ano', sorting: false, cellStyle: {
            whiteSpace: 'nowrap'
        }},
        { title: 'Autuação', field: 'dataAutuacaoTabela', sorting: false, cellStyle: {
            whiteSpace: 'nowrap'
        }},
        { title: 'Delito', field: 'delito', sorting: false, cellStyle: {
            whiteSpace: 'nowrap'
        }},
        { title: 'Vítima', field: 'vitima', sorting: false, cellStyle: {
            whiteSpace: 'nowrap'
        }},
        { title: 'Investigado', field: 'investigado', sorting: false, cellStyle: {
            whiteSpace: 'nowrap'
        }},
        { title: 'Remessa', field: 'dataRemessaTabela', sorting: false, cellStyle: {
            whiteSpace: 'nowrap'
        }},
        { title: 'Eproc', field: 'numAutoForum', sorting: false, cellStyle: {
            whiteSpace: 'nowrap'
        }},
        { title: 'Status', field: 'status', sorting: false, cellStyle: {
            whiteSpace: 'nowrap'
        }},
        { title: 'Apreensão', field: 'apreensao', sorting: false, cellStyle: {
            whiteSpace: 'nowrap'
        }}
    ];

    const actions = [
        {
            icon: 'edit',
            tooltip: 'Alterar',
            onClick: (event, rowData) => handleAlterar(rowData)
        },
        /*{
            icon: 'task',
            tooltip: 'Emitir certidão',
            onClick: (event, rowData) => emitirCertidao(rowData)
        },*/
        {
            icon: 'delete',
            tooltip: 'Excluir',
            onClick: (event, rowData) => window.confirm('Realmente deseja excluir este IP?') ? excluirIntimacoes(rowData.id) : undefined
        },
        {
            icon: "add_box",
            tooltip: "Incluir",
            position: "toolbar",
            onClick: () => handleIncluir()
        }
    ];

    const options = {
        actionsColumnIndex: -1,
        paging: false,
        tableLayout: "auto",
        headerStyle: {
            backgroundColor: "#dbca9e",
            color: "#000000",
            fontWeight: "bold",
            whiteSpace: 'nowrap'
        },
        rowStyle: (rowData) => {
            return {
                backgroundColor: rowData.status === 'Remetido' ? "#D3D3D3" : rowData.status === 'Arquivado' ? "#C0C0C0" : "#dbca9e",
                color: "#000000",
            };
        }
    };
    
    return (
        <div>
            { props.loggedIn ? 
                <div style={{ marginBottom: "20px" }}>
                    <BasicBreadcrumbs texto={"IP " + JSON.stringify(ano).replace(/^"(.+(?="$))"$/, '$1')} />
                    <ThemeProvider theme={defaultMaterialTheme}>
                        <MaterialTable
                            style={{ background:'#e4dbb1' }}
                            title={"INQUÉRITOS POLICIAIS " + JSON.stringify(ano).replace(/^"(.+(?="$))"$/, '$1')}
                            columns={columns}
                            data={ips}
                            actions={actions}
                            options={options}
                        />
                    </ThemeProvider>
                    
                    <BasicModalIP open={open}
                        handleClose={handleClose}
                        buscarIPs={buscarIPs}
                        ipSelecionado={ipSelecionado} />

                    <BasicModalCertidao open={openCertidao}
                        handleClose={handleCloseCertidao}
                        ipSelecionado={ipSelecionado} />

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