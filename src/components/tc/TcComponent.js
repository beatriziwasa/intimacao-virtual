import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import _ from 'lodash';
import MaterialTable from 'material-table'
import { ThemeProvider, createTheme } from '@mui/material';
import BasicModalTC from '../modal/BasicModalTC';
import BasicModalCertidao from '../modal/BasicModalCertidao';
import { GoogleAPI } from '../api/GoogleAPI';
import BasicBreadcrumbs from '../layout/BasicBreadcrumbs';
import SidebarMenu from '../layout/SidebarMenu';

export const TcComponent = (props) => {

    useEffect(() => {
        buscarTCs();
    }, []);

    const { ano } = useParams();
    
    const [open, setOpen] = React.useState(false);
    const [openCertidao, setOpenCertidao] = React.useState(false);
    const [tcs, setTCs] = useState([]);
    const [tcSelecionado, setTCSelecionado] = useState({});

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenCertidao = () => setOpenCertidao(true);
    const handleCloseCertidao = () => setOpenCertidao(false);

    const handleAlterar = (rowData) => {
        setTCSelecionado(rowData);
        handleOpen();
    }

    const handleIncluir = () => {
        setTCSelecionado({});
        handleOpen();
    }
    
    const buscarTCs = () => {
        GoogleAPI.consultar('TC').then((tc) => {
            const listaTcs = [];
            for (let i = 0; i < tc.length; i++) {
                if (tc[i].ano === ano) {
                    let dataAutuacaoTabela = "";
                    let dataTemp = tc[i].dataAutuacao;
                    if(!_.isEmpty(dataTemp)) {
                        dataTemp = dataTemp.split("-");
                        dataAutuacaoTabela = dataTemp[2].concat("/").concat(dataTemp[1]).concat("/").concat(dataTemp[0]);
                    }

                    let dataRemessaTabela = "";
                    let dataTemp1 = tc[i].dataRemessa;
                    if(!_.isEmpty(dataTemp1)) {
                        dataTemp1 = dataTemp1.split("-");
                        dataRemessaTabela = dataTemp1[2].concat("/").concat(dataTemp1[1]).concat("/").concat(dataTemp1[0]);
                    }

                    const tcJSON = {
                        'id': tc[i].id,
                        'escrivao': tc[i].escrivao,
                        'numero': tc[i].numero,
                        'ano': tc[i].ano,
                        'numeroAno': tc[i].numero + '/' + tc[i].ano,
                        'dataAutuacao': tc[i].dataAutuacao,
                        'dataAutuacaoTabela': dataAutuacaoTabela,
                        'delito': tc[i].delito,
                        'delegado': tc[i].delegado,
                        'autor': tc[i].autor,
                        'vitima': tc[i].vitima,
                        'origemBOOficio': tc[i].origemBOOficio,
                        'numAutoForum': tc[i].numAutoForum,
                        'dataRemessa': tc[i].dataRemessa,
                        'dataRemessaTabela': dataRemessaTabela,
                        'apreensao': tc[i].apreensao,
                        'status': tc[i].status
                    };
                    listaTcs.push(tcJSON);
                }
            }
            setTCs(listaTcs);
        });
    }

    async function excluirTC(id) {
        GoogleAPI.excluir(id, 'TC').then(() => {
            alert('TC excluído com sucesso!');
            buscarTCs();
        });
    }

    const emitirCertidao = (rowData) => {
        setTCSelecionado(rowData);
        handleOpenCertidao();
    }

    const defaultMaterialTheme = createTheme();

    const columns = [
        { title: 'Número/Ano', field: 'numeroAno', sorting: false, cellStyle: {
            whiteSpace: 'nowrap'//, position: "sticky", left: 0, background: "#e4dbb1",
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
        { title: 'Autor', field: 'autor', sorting: false, cellStyle: {
            whiteSpace: 'nowrap'
        }},
        { title: 'Remessa', field: 'dataRemessaTabela', sorting: false, cellStyle: {
            whiteSpace: 'nowrap'
        }},
        { title: 'Eproc', field: 'numAutoForum', sorting: false, cellStyle: {
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
            onClick: (event, rowData) => window.confirm('Realmente deseja excluir este TC?') ? excluirTC(rowData.id) : undefined
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
                    <BasicBreadcrumbs texto={"TC " + JSON.stringify(ano).replace(/^"(.+(?="$))"$/, '$1')} />
                    <ThemeProvider theme={defaultMaterialTheme}>
                        <MaterialTable
                            style={{ background:'#e4dbb1' }}
                            title={"TERMO CIRCUNSTANCIADO " + JSON.stringify(ano).replace(/^"(.+(?="$))"$/, '$1')}
                            columns={columns}
                            data={tcs}
                            actions={actions}
                            options={options}
                        />
                    </ThemeProvider>
                    
                    <BasicModalTC open={open}
                        handleClose={handleClose}
                        buscarTCs={buscarTCs}
                        tcSelecionado={tcSelecionado} />

                    <BasicModalCertidao open={openCertidao}
                        handleClose={handleCloseCertidao}
                        tcSelecionado={tcSelecionado} />

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