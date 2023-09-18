import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import _ from 'lodash';
import MaterialTable from 'material-table'
import { ThemeProvider, createTheme } from '@mui/material';
import BasicModalAPF from '../modal/BasicModalAPF';
import BasicModalCertidao from '../modal/BasicModalCertidao';
import { GoogleAPI } from '../api/GoogleAPI';
import BasicBreadcrumbs from '../layout/BasicBreadcrumbs';
import SidebarMenu from '../layout/SidebarMenu';

export const ApfComponent = (props) => {

    useEffect(() => {
        buscarAPFs();
    }, []);

    const { ano } = useParams();
    
    const [open, setOpen] = React.useState(false);
    const [openCertidao, setOpenCertidao] = React.useState(false);
    const [apfs, setAPFs] = useState([]);
    const [apfSelecionado, setAPFSelecionado] = useState({});

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenCertidao = () => setOpenCertidao(true);
    const handleCloseCertidao = () => setOpenCertidao(false);

    const handleAlterar = (rowData) => {
        setAPFSelecionado(rowData);
        handleOpen();
    }

    const handleIncluir = () => {
        setAPFSelecionado({});
        handleOpen();
    }
    
    const buscarAPFs = () => {
        GoogleAPI.consultar('APF').then((apf) => {
            const listaApfs = [];
            for (let i = 0; i < apf.length; i++) {
                if (apf[i].ano === ano) {
                    let dataAutuacaoTabela = "";
                    let dataTemp = apf[i].dataAutuacao;
                    if(!_.isEmpty(dataTemp)) {
                        dataTemp = dataTemp.split("-");
                        dataAutuacaoTabela = dataTemp[2].concat("/").concat(dataTemp[1]).concat("/").concat(dataTemp[0]);
                    }

                    let dataRemessaTabela = "";
                    let dataTemp1 = apf[i].dataRemessa;
                    if(!_.isEmpty(dataTemp1)) {
                        dataTemp1 = dataTemp1.split("-");
                        dataRemessaTabela = dataTemp1[2].concat("/").concat(dataTemp1[1]).concat("/").concat(dataTemp1[0]);
                    }

                    const apfJSON = {
                        'id': apf[i].id,
                        'escrivao': apf[i].escrivao,
                        'numero': apf[i].numero,
                        'ano': apf[i].ano,
                        'numeroAno': apf[i].numero + '/' + apf[i].ano,
                        'dataAutuacao': apf[i].dataAutuacao,
                        'dataAutuacaoTabela': dataAutuacaoTabela,
                        'delito': apf[i].delito,
                        'delegado': apf[i].delegado,
                        'conduzido': apf[i].conduzido,
                        'vitima': apf[i].vitima,
                        'origemBOOficio': apf[i].origemBOOficio,
                        'numAutoForum': apf[i].numAutoForum,
                        'dataRemessa': apf[i].dataRemessa,
                        'dataRemessaTabela': dataRemessaTabela,
                        'apreensao': apf[i].apreensao,
                        'status': apf[i].status
                    };
                    listaApfs.push(apfJSON);
                }
            }
            setAPFs(listaApfs);
        });
    }

    async function excluirAPF(id) {
        GoogleAPI.excluir(id, 'APF').then(() => {
            alert('APF excluído com sucesso!');
            buscarAPFs();
        });
    }

    const emitirCertidao = (rowData) => {
        setAPFSelecionado(rowData);
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
        { title: 'Conduzido', field: 'conduzido', sorting: false, cellStyle: {
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
            onClick: (event, rowData) => window.confirm('Realmente deseja excluir este APF?') ? excluirAPF(rowData.id) : undefined
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
                    <BasicBreadcrumbs texto={"APF " + JSON.stringify(ano).replace(/^"(.+(?="$))"$/, '$1')} />
                    <ThemeProvider theme={defaultMaterialTheme}>
                        <MaterialTable
                            style={{ background:'#e4dbb1' }}
                            title={"AUTO DE PRISÃO EM FLAGRANTE " + JSON.stringify(ano).replace(/^"(.+(?="$))"$/, '$1')}
                            columns={columns}
                            data={apfs}
                            actions={actions}
                            options={options}
                        />
                    </ThemeProvider>
                    
                    <BasicModalAPF open={open}
                        handleClose={handleClose}
                        buscarAPFs={buscarAPFs}
                        apfSelecionado={apfSelecionado} />

                    <BasicModalCertidao open={openCertidao}
                        handleClose={handleCloseCertidao}
                        apfSelecionado={apfSelecionado} />

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