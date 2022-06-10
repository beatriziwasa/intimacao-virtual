import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import MaterialTable from 'material-table'
import { ThemeProvider, createTheme } from '@mui/material';
import BasicModal from './BasicModal';
import { GoogleAPI } from './GoogleAPI';

export const IntimacaoComponent = () => {

    useEffect(() => {
        buscarIntimacoes();
    }, []);

    const [open, setOpen] = React.useState(false);
    const [intimacoes, setIntimacoes] = useState([]);
    const [intimacaoSelecionada, setIntimacaoSelecionada] = useState({});

    const handleOpen = () => setOpen(true);
    
    const handleClose = () => setOpen(false);

    const handleAlterar = (rowData) => {
        setIntimacaoSelecionada(rowData);
        handleOpen();
    }

    const handleIncluir = () => {
        setIntimacaoSelecionada({});
        handleOpen();
    }
    
    const buscarIntimacoes = () => {
        GoogleAPI.consultar().then((intimacao) => {
            const listaIntimacoes = [];
            for (let i = 0; i < intimacao.length; i++) {
                let dataHoraTabela = "";
                let dataFormatada = "";
                if (!_.isNil(intimacao[i].dataAudiencia)) {
                    let dataTemp = intimacao[i].dataAudiencia;
                    dataTemp = dataTemp.split("-");
                    dataFormatada = dataTemp[2].concat("/").concat(dataTemp[1]).concat("/").concat(dataTemp[0]);
                }
                if (!_.isNil(intimacao[i].dataAudiencia) && !_.isNil(intimacao[i].horaAudiencia)) {
                    dataHoraTabela = dataFormatada.concat(" ").concat(intimacao[i].horaAudiencia);
                } else if (!_.isNil(intimacao[i].dataAudiencia)) {
                    dataHoraTabela = dataFormatada;
                }
        
                let procedimentoTabela = "";
                if (!_.isNil(intimacao[i].tipoProcedimento)) {
                    procedimentoTabela = intimacao[i].tipoProcedimento;
                }
                if (!_.isNil(intimacao[i].codSISP)) {
                    procedimentoTabela = procedimentoTabela.concat(" ").concat(intimacao[i].codSISP);
                }
                if (!_.isNil(intimacao[i].anoProcedimento)) {
                    procedimentoTabela = procedimentoTabela.concat(".").concat(intimacao[i].anoProcedimento);
                }
                if (!_.isNil(intimacao[i].numProcedimento)) {
                    procedimentoTabela = procedimentoTabela.concat(".").concat(intimacao[i].numProcedimento);
                }

                const intimacaoJSON = {
                    'id': intimacao[i].id,
                    'nome': intimacao[i].nome,
                    'telefone': intimacao[i].telefone,
                    'classe': intimacao[i].classe,
                    'crime': intimacao[i].crime,
                    'tipoProcedimento': intimacao[i].tipoProcedimento,
                    'codSISP': intimacao[i].codSISP,
                    'anoProcedimento': intimacao[i].anoProcedimento,
                    'numProcedimento': intimacao[i].numProcedimento,
                    'dataAudiencia': intimacao[i].dataAudiencia,
                    'horaAudiencia': intimacao[i].horaAudiencia,
                    'dataHoraTabela': dataHoraTabela,
                    'procedimentoTabela': procedimentoTabela
                };
                listaIntimacoes.push(intimacaoJSON);
            }
            setIntimacoes(listaIntimacoes);
        });
    }

    const excluirIntimacoes = (id) => {
        GoogleAPI.excluir(id).then(() => {
            alert('Intimação excluída com sucesso!');
            buscarIntimacoes();
        })
    }

    const enviarPrimeiroContato = (intimacao) => {
        let mensagemPrimeiroContato = `Prezado(a) Sr(a). %NOME%, 

        A Delegacia de Proteção ao Turista (DPTUR) - Unidade Aeroporto, da Polícia Civil do Estado de Santa Catarina, entra em contato para fim de INTIMÁ-LO(A) a prestar depoimento na condição de %CLASSE% nos autos do %PROCEDIMENTO% n. %SISP%.%ANO_PROCED%.%N_PROCED%.
        
        O procedimento refere-se à apuração de suposto ato de %CRIME%.
        
        A data prevista para sua oitiva será em *%DATA% às %HORA%*.
        
        Tendo em vista a atual situação pandêmica, estamos priorizando as oitivas através de videoconferência. Nesse caso, o(a) Sr(a). deverá conectar-se utilizando um computador com webcam e microfone ou telefone celular.
        
        Caso queira fazer-se acompanhar de advogado(a), o mesmo link poderá ser utilizado por seu(sua) procurador(a).
        
        *Para envio do link para videoconferência, solicitamos que confirme o recebimento desta mensagem*.
        
        Para dúvidas, solicitação de cópias de documentos e demais informações, favor utilizar exclusivamente o e-mail dpaeroporto@pc.sc.gov.br , com o assunto %PROCEDIMENTO% n. %SISP%.%ANO_PROCED%.%N_PROCED%.
        
        Atenciosamente,
        DELEGACIA DE PROTEÇÃO AO TURISTA (DPTUR)
        POLÍCIA CIVIL DO ESTADO DE SANTA CATARINA`;
        
        mensagemPrimeiroContato = mensagemPrimeiroContato.replaceAll("%NOME%", intimacao.nome);
        mensagemPrimeiroContato = mensagemPrimeiroContato.replaceAll("%CLASSE%", intimacao.classe.toLowerCase());
        mensagemPrimeiroContato = mensagemPrimeiroContato.replaceAll("%CRIME%", intimacao.crime.toLowerCase());
        mensagemPrimeiroContato = mensagemPrimeiroContato.replaceAll("%PROCEDIMENTO%", intimacao.tipoProcedimento);
        mensagemPrimeiroContato = mensagemPrimeiroContato.replaceAll("%SISP%", intimacao.codSISP);
        mensagemPrimeiroContato = mensagemPrimeiroContato.replaceAll("%ANO_PROCED%", intimacao.anoProcedimento);
        mensagemPrimeiroContato = mensagemPrimeiroContato.replaceAll("%N_PROCED%", intimacao.numProcedimento);
        mensagemPrimeiroContato = mensagemPrimeiroContato.replaceAll("%DATA%", formatDate(intimacao.dataAudiencia));
        mensagemPrimeiroContato = mensagemPrimeiroContato.replaceAll("%HORA%", intimacao.horaAudiencia);

        whatsappAPI(intimacao.telefone, mensagemPrimeiroContato);
    }

    const enviarLink = (intimacao) => {
        let mensagemLink = `O link para acesso à videoconferência é https://webconf.pc.sc.gov.br/dptur-%PROCEDIMENTO%-%SISP%-%N_PROCED%-%ANO_PROCED%

        O link ficará ativo momentos antes da data e hora agendadas.`;
        
        mensagemLink = mensagemLink.replaceAll("%PROCEDIMENTO%", intimacao.tipoProcedimento);
        mensagemLink = mensagemLink.replaceAll("%SISP%", intimacao.codSISP);
        mensagemLink = mensagemLink.replaceAll("%N_PROCED%", intimacao.numProcedimento);
        mensagemLink = mensagemLink.replaceAll("%ANO_PROCED%", intimacao.anoProcedimento);

        whatsappAPI(intimacao.telefone, mensagemLink);
    }

    const enviarRelembrar = (intimacao) => {
        let mensagemRelembrar = `Prezado(a) Sr(a). %NOME%, 

        Relembramos Vossa Senhoria da audiência marcada para a data de *%DATA% às %HORA%*.
        
        O link para acesso à videoconferência é https://webconf.pc.sc.gov.br/dptur-%SISP%-%N_PROCED%-%ANO_PROCED%
        
        Atenciosamente,
        DELEGACIA DE PROTEÇÃO AO TURISTA (DPTUR)
        POLÍCIA CIVIL DO ESTADO DE SANTA CATARINA`;
        
        mensagemRelembrar = mensagemRelembrar.replaceAll("%NOME%", intimacao.nome);
        mensagemRelembrar = mensagemRelembrar.replaceAll("%DATA%", formatDate(intimacao.dataAudiencia));
        mensagemRelembrar = mensagemRelembrar.replaceAll("%HORA%", intimacao.horaAudiencia);
        mensagemRelembrar = mensagemRelembrar.replaceAll("%SISP%", intimacao.codSISP);
        mensagemRelembrar = mensagemRelembrar.replaceAll("%N_PROCED%", intimacao.numProcedimento);
        mensagemRelembrar = mensagemRelembrar.replaceAll("%ANO_PROCED%", intimacao.anoProcedimento);

        whatsappAPI(intimacao.telefone, mensagemRelembrar);
    }

    const formatDate = (data) => {
        let dataTemp = data;
        dataTemp = dataTemp.split("-");
        return dataTemp[2].concat("/").concat(dataTemp[1]).concat("/").concat(dataTemp[0]);
    }

    const whatsappAPI = (telefone, msg) => {
        let URL = 'https://wa.me';
        let number = telefone;
        number = number.replace(/[^\w\s]/gi, '').replace(/ /g, '');
        let url = "".concat(URL, "/").concat(number);
        if (msg) {
            url += "?text=".concat(encodeURI(msg));
        }
        window.open(url);
    }

    const defaultMaterialTheme = createTheme();

    const columns = [
        { title: 'Nome', field: 'nome', sorting: false, cellStyle: {
            whiteSpace: 'nowrap'
           }},
        { title: 'Envolvimento', field: 'classe', sorting: false, cellStyle: {
            whiteSpace: 'nowrap'
           }},
        { title: 'Crime', field: 'crime', sorting: false, cellStyle: {
            whiteSpace: 'nowrap'
           }},
        { title: 'Procedimento', field: 'procedimentoTabela', sorting: false, cellStyle: {
            whiteSpace: 'nowrap'
           }},
        { title: 'Data Audiência', field: 'dataHoraTabela', sorting: false, cellStyle: {
            whiteSpace: 'nowrap'
           }}
    ];

    const actions = [
        {
            icon: 'outgoing_mail',
            tooltip: 'Enviar primeiro contato',
            onClick: (event, rowData) => enviarPrimeiroContato(rowData)
        },
        {
            icon: 'link',
            tooltip: 'Enviar link',
            onClick: (event, rowData) => enviarLink(rowData)
        },
        {
            icon: 'event_repeat',
            tooltip: 'Relembrar oitiva',
            onClick: (event, rowData) => enviarRelembrar(rowData)
        },
        {
            icon: 'edit',
            tooltip: 'Alterar',
            onClick: (event, rowData) => handleAlterar(rowData)
        },
        {
            icon: 'delete',
            tooltip: 'Excluir',
            onClick: (event, rowData) => window.confirm('Realmente deseja excluir esta intimação?') ? excluirIntimacoes(rowData.id) : undefined
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
        tableLayout: "auto",
        headerStyle: {
            backgroundColor: "#dbca9e",
            color: "#000000",
            fontWeight: "bold",
            whiteSpace: 'nowrap'
        },
        rowStyle: {
            backgroundColor: "#dbca9e",
            color: "#000000",
        }
    };

    return (
        <div>
            <ThemeProvider theme={defaultMaterialTheme}>
                <MaterialTable
                    style={{ background:'#e4dbb1' }}
                    title="INTIMAÇÕES"
                    columns={columns}
                    data={intimacoes}
                    actions={actions}
                    options={options}
                />
            </ThemeProvider>

            <BasicModal open={open}
                handleClose={handleClose}
                buscarIntimacoes={buscarIntimacoes}
                intimacaoSelecionada={intimacaoSelecionada} />
        </div>
    );
}