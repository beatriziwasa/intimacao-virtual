import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import Parse from 'parse/dist/parse.min.js';
import MaterialTable from 'material-table'
import { ThemeProvider, createTheme } from '@mui/material';
import BasicModal from './BasicModal';


export const IntimacaoComponent = () => {

    useEffect(() => {
        buscarIntimacoes();
    });
    
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
    
    async function buscarIntimacoes() {
        //event.preventDefault();
        // create your Parse Query using the Person Class you've created
        const query = new Parse.Query('Intimacao');
        // use the equalTo filter to look for user which the name is John. this filter can be used in any data type
        //query.equalTo('nome', 'Tiago Yugo Iwasa');
        // run the query
        const results = await query.find();
        // access the Parse Object attributes
        const listaIntimacoes = [];
        
        for (const object of results) {
            
            let dataHoraTabela = "";
            let dataFormatada = "";
            if (!_.isNil(object.get('dataAudiencia')) && !_.isNil(object.get('horaAudiencia'))) {
                let dataAudiencia = object.get('dataAudiencia');
                dataAudiencia = dataAudiencia.split("-");
                dataFormatada = dataAudiencia[2].concat("/").concat(dataAudiencia[1]).concat("/").concat(dataAudiencia[0]);
                dataHoraTabela = dataFormatada.concat(" ").concat(object.get('horaAudiencia'));
            } else if (!_.isNil(object.get('dataAudiencia'))) {
                let dataAudiencia = object.get('dataAudiencia');
                dataAudiencia = dataAudiencia.split("-");
                dataFormatada = dataAudiencia[2].concat("/").concat(dataAudiencia[1]).concat("/").concat(dataAudiencia[0]);
                dataHoraTabela = dataFormatada;
            }

            let procedimentoTabela = "";
            if (!_.isNil(object.get('tipoProcedimento'))) {
                procedimentoTabela = object.get('tipoProcedimento');
            }
            if (!_.isNil(object.get('codSISP'))) {
                procedimentoTabela = procedimentoTabela.concat(" ").concat(object.get('codSISP'));
            }
            if (!_.isNil(object.get('anoProcedimento'))) {
                procedimentoTabela = procedimentoTabela.concat(".").concat(object.get('anoProcedimento'));
            }
            if (!_.isNil(object.get('numProcedimento'))) {
                procedimentoTabela = procedimentoTabela.concat(".").concat(object.get('numProcedimento'));
            }

            const intimacao = {
                'id': object.id,
                'nome': object.get('nome'),
                'telefone': object.get('telefone'),
                'classe': object.get('classe'),
                'crime': object.get('crime'),
                'numProcedimento': object.get('numProcedimento'),
                'dataAudiencia': object.get('dataAudiencia'),
                'horaAudiencia': object.get('horaAudiencia'),
                'codProcedimento': object.get('codProcedimento'),
                'anoProcedimento': object.get('anoProcedimento'),
                'tipoProcedimento': object.get('tipoProcedimento'),
                'codSISP': object.get('codSISP'),
                'dataHoraTabela': dataHoraTabela,
                'procedimentoTabela': procedimentoTabela
            }
            listaIntimacoes.push(intimacao);
        }
        //console.log(`ParseObjects found: ${JSON.stringify(results)}`);
        //console.log(`Lista de intimações: ${JSON.stringify(listaIntimacoes)}`);
        setIntimacoes(listaIntimacoes);
    }

    const excluirIntimacoes = async function (event, id) {
        // Create a new Intimacao parse object instance and set intimacao id
        const Intimacao = new Parse.Object('Intimacao');
        Intimacao.set('objectId', id);
        // .destroy should be called to delete a parse object
        try {
          await Intimacao.destroy();
          alert('Intimação excluída com sucesso!');
          // Refresh intimacoes to remove this one
          buscarIntimacoes();
          return true;
        } catch (error) {
          // Error can be caused by lack of Internet connection
          alert(`Error ${error.message}`);
          return false;
        };
    };

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

        let dataFormatada = "";
        let dataAudiencia = intimacao.dataAudiencia;
        dataAudiencia = dataAudiencia.split("-");
        dataFormatada = dataAudiencia[2].concat("/").concat(dataAudiencia[1]).concat("/").concat(dataAudiencia[0]);
        
        mensagemPrimeiroContato = mensagemPrimeiroContato.replaceAll("%NOME%", intimacao.nome);
        mensagemPrimeiroContato = mensagemPrimeiroContato.replaceAll("%CLASSE%", intimacao.classe.toLowerCase());
        mensagemPrimeiroContato = mensagemPrimeiroContato.replaceAll("%CRIME%", intimacao.crime.toLowerCase());
        mensagemPrimeiroContato = mensagemPrimeiroContato.replaceAll("%PROCEDIMENTO%", intimacao.tipoProcedimento);
        mensagemPrimeiroContato = mensagemPrimeiroContato.replaceAll("%SISP%", intimacao.codSISP);
        mensagemPrimeiroContato = mensagemPrimeiroContato.replaceAll("%DATA%", dataFormatada);
        mensagemPrimeiroContato = mensagemPrimeiroContato.replaceAll("%HORA%", intimacao.horaAudiencia);
        mensagemPrimeiroContato = mensagemPrimeiroContato.replaceAll("%PROC%", intimacao.codProcedimento);
        mensagemPrimeiroContato = mensagemPrimeiroContato.replaceAll("%N_PROCED%", intimacao.numProcedimento);
        mensagemPrimeiroContato = mensagemPrimeiroContato.replaceAll("%ANO_PROCED%", intimacao.anoProcedimento);
        
        /*fetch(mensagem1)
        .then((r) => r.text())
        .then(msg  => {
            console.log(msg)
            mensagemPrimeiroContato = msg;
            setMensagem1(msg);
        });*/

        let URL = 'https://wa.me';
        let number = intimacao.telefone;
        number = number.replace(/[^\w\s]/gi, '').replace(/ /g, '');
        let url = "".concat(URL, "/").concat(number);
        if (mensagemPrimeiroContato) {
            url += "?text=".concat(encodeURI(mensagemPrimeiroContato));
        }
        window.open(url);
    }

    const enviarLink = (intimacao) => {
        let mensagemLink = `O link para acesso à videoconferência é https://webconf.pc.sc.gov.br/dptur-%SISP%-%N_PROCED%-%ANO_PROCED%

        O link ficará ativo momentos antes da data e hora agendadas.`;
        
        mensagemLink = mensagemLink.replaceAll("%SISP%", intimacao.codSISP);
        mensagemLink = mensagemLink.replaceAll("%N_PROCED%", intimacao.numProcedimento);
        mensagemLink = mensagemLink.replaceAll("%ANO_PROCED%", intimacao.anoProcedimento);

        /*fetch(mensagem2)
        .then((r) => r.text())
        .then(msg  => {
            console.log(msg)
            mensagemLink = msg;
        });*/

        let URL = 'https://wa.me';
        let number = intimacao.telefone;
        number = number.replace(/[^\w\s]/gi, '').replace(/ /g, '');
        let url = "".concat(URL, "/").concat(number);
        if (mensagemLink) {
            url += "?text=".concat(encodeURI(mensagemLink));
        }
        window.open(url);
    }

    const enviarRelembrar = (intimacao) => {
        let mensagemRelembrar = `Prezado(a) Sr(a). %NOME%, 

        Relembramos Vossa Senhoria da audiência marcada para a data de *%DATA% às %HORA%*.
        
        O link para acesso à videoconferência é https://webconf.pc.sc.gov.br/dptur-%SISP%-%N_PROCED%-%ANO_PROCED%
        
        Atenciosamente,
        DELEGACIA DE PROTEÇÃO AO TURISTA (DPTUR)
        POLÍCIA CIVIL DO ESTADO DE SANTA CATARINA`;
        
        let dataFormatada = "";
        let dataAudiencia = intimacao.dataAudiencia;
        dataAudiencia = dataAudiencia.split("-");
        dataFormatada = dataAudiencia[2].concat("/").concat(dataAudiencia[1]).concat("/").concat(dataAudiencia[0]);

        mensagemRelembrar = mensagemRelembrar.replaceAll("%NOME%", intimacao.nome);
        mensagemRelembrar = mensagemRelembrar.replaceAll("%DATA%", dataFormatada);
        mensagemRelembrar = mensagemRelembrar.replaceAll("%HORA%", intimacao.horaAudiencia);
        mensagemRelembrar = mensagemRelembrar.replaceAll("%SISP%", intimacao.codSISP);
        mensagemRelembrar = mensagemRelembrar.replaceAll("%N_PROCED%", intimacao.numProcedimento);
        mensagemRelembrar = mensagemRelembrar.replaceAll("%ANO_PROCED%", intimacao.anoProcedimento);

        /*fetch(mensagem3)
        .then((r) => r.text())
        .then(msg  => {
            console.log(msg)
            mensagemRelembrar = msg;
        });*/

        let URL = 'https://wa.me';
        let number = intimacao.telefone;
        number = number.replace(/[^\w\s]/gi, '').replace(/ /g, '');
        let url = "".concat(URL, "/").concat(number);
        if (mensagemRelembrar) {
            url += "?text=".concat(encodeURI(mensagemRelembrar));
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
            onClick: (event, rowData) => window.confirm('Realmente deseja excluir esta intimação?') ? excluirIntimacoes(event, rowData.id) : undefined
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

            <BasicModal open={open} handleClose={handleClose} intimacaoSelecionada={intimacaoSelecionada} />
        </div>
    );
};