import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import _ from 'lodash';
import MaterialTable from 'material-table'
import { ThemeProvider, createTheme } from '@mui/material';
import BasicModalOficio from '../modal/BasicModalOficio';
import BasicModalCertidao from '../modal/BasicModalCertidao';
import { GoogleAPI } from '../api/GoogleAPI';
import BasicBreadcrumbs from '../layout/BasicBreadcrumbs';
import SidebarMenu from '../layout/SidebarMenu';

export const OficioComponent = (props) => {

    useEffect(() => {
        buscarOficios();
    }, []);

    const { ano } = useParams();
    
    const [open, setOpen] = React.useState(false);
    const [openCertidao, setOpenCertidao] = React.useState(false);
    const [oficios, setOficios] = useState([]);
    const [oficioSelecionado, setOficioSelecionado] = useState({});

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenCertidao = () => setOpenCertidao(true);
    const handleCloseCertidao = () => setOpenCertidao(false);

    const handleAlterar = (rowData) => {
        setOficioSelecionado(rowData);
        handleOpen();
    }

    const handleIncluir = () => {
        setOficioSelecionado({});
        handleOpen();
    }
    
    const buscarOficios = () => {
        GoogleAPI.consultar('Oficio').then((oficio) => {
            const listaOficios = [];
            for (let i = 0; i < oficio.length; i++) {
                if (oficio[i].ano === ano) {
                    let dataAutuacaoTabela = "";
                    let dataTemp = oficio[i].dataAutuacao;
                    if(!_.isEmpty(dataTemp)) {
                        dataTemp = dataTemp.split("-");
                        dataAutuacaoTabela = dataTemp[2].concat("/").concat(dataTemp[1]).concat("/").concat(dataTemp[0]);
                    }

                    let dataRemessaTabela = "";
                    let dataTemp1 = oficio[i].dataRemessa;
                    if(!_.isEmpty(dataTemp1)) {
                        dataTemp1 = dataTemp1.split("-");
                        dataRemessaTabela = dataTemp1[2].concat("/").concat(dataTemp1[1]).concat("/").concat(dataTemp1[0]);
                    }

                    const oficioJSON = {
                        'id': oficio[i].id,
                        'escrivao': oficio[i].escrivao,
                        'numero': oficio[i].numero,
                        'ano': oficio[i].ano,
                        'numeroAno': oficio[i].numero + '/' + oficio[i].ano,
                        'dataAutuacao': oficio[i].dataAutuacao,
                        'dataAutuacaoTabela': dataAutuacaoTabela,
                        'delito': oficio[i].delito,
                        'delegado': oficio[i].delegado,
                        'investigado': oficio[i].investigado,
                        'vitima': oficio[i].vitima,
                        'origemBOOficio': oficio[i].origemBOOficio,
                        'apreensao': oficio[i].apreensao,
                        'dataRemessa': oficio[i].dataRemessa,
                        'dataRemessaTabela': dataRemessaTabela,
                        'numAutoForum': oficio[i].numAutoForum,
                        'status': oficio[i].status
                    };
                    listaOficios.push(oficioJSON);
                }
            }
            setOficios(listaOficios);
        });
    }

    async function excluirOficio(id) {
        GoogleAPI.excluir(id, 'Oficio').then(() => {
            alert('Ofício excluído com sucesso!');
            buscarOficios();
        });
    }

    const emitirCertidao = (rowData) => {
        setOficioSelecionado(rowData);
        handleOpenCertidao();
    }

    const defaultMaterialTheme = createTheme();

    const columns = [
        { title: 'Nº/Ano', field: 'numeroAno', sorting: false, cellStyle: {
            whiteSpace: 'nowrap', width: "3%"//, position: "sticky", left: 0, background: "#e4dbb1",
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
            onClick: (event, rowData) => window.confirm('Realmente deseja excluir este Ofício?') ? excluirOficio(rowData.id) : undefined
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
                    <BasicBreadcrumbs texto={"Ofício " + JSON.stringify(ano).replace(/^"(.+(?="$))"$/, '$1')} />
                    <ThemeProvider theme={defaultMaterialTheme}>
                        <MaterialTable
                            style={{ background:'#e4dbb1' }}
                            title={"OFÍCIO " + JSON.stringify(ano).replace(/^"(.+(?="$))"$/, '$1')}
                            columns={columns}
                            data={oficios}
                            actions={actions}
                            options={options}
                        />
                    </ThemeProvider>
                    
                    <BasicModalOficio open={open}
                        handleClose={handleClose}
                        buscarOficios={buscarOficios}
                        oficioSelecionado={oficioSelecionado} />

                    <BasicModalCertidao open={openCertidao}
                        handleClose={handleCloseCertidao}
                        oficioSelecionado={oficioSelecionado} />

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