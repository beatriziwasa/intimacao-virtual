import React, { useState, useEffect } from 'react';
import { GoogleAPI } from '../api/GoogleAPI';
import _ from 'lodash';
import ApiCalendar from 'react-google-calendar-api';
import { gapi } from 'gapi-script';

export const IncluirIntimacaoComponent = (props) => {
    
    useEffect(() => {
        setInputs(props.intimacaoSelecionada);
        setTipoProcedimento(props.intimacaoSelecionada.tipoProcedimento);
        setClasse(props.intimacaoSelecionada.classe);
        setIdIntimacao(props.intimacaoSelecionada.id);
    }, [props.intimacaoSelecionada]);

    const [inputs, setInputs] = useState({});
    const [tipoProcedimento, setTipoProcedimento] = useState("");
    const [classe, setClasse] = useState("");
    const [idIntimacao, setIdIntimacao] = useState();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    
    const handleChangeSelectTipoProcedimento = (event) => {
        setTipoProcedimento(event.target.value);
    }
    
    const handleChangeSelectClasse = (event) => {
        setClasse(event.target.value);
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        salvarIntimacao();
    }

    const limpar = (event) => {
        event.preventDefault();
        setInputs({});
        setClasse("");
        setTipoProcedimento("");
    }

    const config = {
        "clientId": process.env.REACT_APP_GOOGLE_CLIENT_ID,
        "apiKey": process.env.REACT_APP_GOOGLE_API_KEY,
        "scope": "https://www.googleapis.com/auth/calendar",
        "discoveryDocs": [
          "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
        ]
    };
    
    const apiCalendar = new ApiCalendar(config);

    async function salvarIntimacao() {
        let intimacao = {
            'nome': inputs.nome,
            'telefone': inputs.telefone,
            'classe': classe,
            'crime': inputs.crime,
            'tipoProcedimento': tipoProcedimento,
            'codSISP': inputs.codSISP,
            'anoProcedimento': inputs.anoProcedimento,
            'numProcedimento': inputs.numProcedimento,
            'dataAudiencia': inputs.dataAudiencia,
            'horaAudiencia': inputs.horaAudiencia,
            'idCalendarEvent': inputs.idCalendarEvent,
            'googleMeetLink': inputs.googleMeetLink
        };
        
        let titulo = intimacao.tipoProcedimento + " " 
                    + intimacao.codSISP + "-"
                    + intimacao.anoProcedimento + "-"
                    + intimacao.numProcedimento + " - "
                    + intimacao.classe.substring(0,1) + " - "
                    + intimacao.nome;
        const dataHoraInicio = new Date(intimacao.dataAudiencia + " " + intimacao.horaAudiencia);
        let dataTemp = new Date(dataHoraInicio);
        let dataHoraFim = new Date(dataTemp.setMinutes(dataTemp.getMinutes() + 30));
        const event = {
            summary: titulo,
            start: {
                dateTime: dataHoraInicio
            },
            end: {
                dateTime: dataHoraFim
            },
            conferenceData: {
                createRequest: {
                    requestId: "7qxalsvy0e",//getRandomString(),
                    conferenceSolutionKey: {
                        type: "hangoutsMeet"
                    },
                }
            }
        }

        if (_.isNil(idIntimacao)) { //Incluir
            apiCalendar.listEvents({ //Calendario de feriados
                timeMin: dataHoraInicio.toISOString(),
                timeMax: dataHoraFim.toISOString()
            }, 'pt.brazilian#holiday@group.v.calendar.google.com').then(({ result }) => {
                if (!_.isEmpty(result.items)) {
                    alert('É feriado nessa data! É ' + result.items[0].summary + "!");
                    return;
                } else {
                    apiCalendar.listEvents({ //Calendario do delegado
                        timeMin: dataHoraInicio.toISOString(),
                        timeMax: dataHoraFim.toISOString()
                    }, 'scandolara.pcsc@gmail.com').then(({ result }) => {
                        if (!_.isEmpty(result.items)) {
                            alert('Já existe evento na agenda do delegado para esse horário!');
                            return;
                        } else {
                            apiCalendar.listEvents({ //Calendario das oitivas
                                timeMin: dataHoraInicio.toISOString(),
                                timeMax: dataHoraFim.toISOString()
                            }, 'tpfgaifi5bf5lsfn089nlc607k@group.calendar.google.com').then(({ result }) => {
                                if (!_.isEmpty(result.items)) {
                                    alert('Já existe evento no calendário para esse horário!');
                                    return;
                                } else {
                                    gapi.client.calendar.events.insert({
                                        calendarId: 'tpfgaifi5bf5lsfn089nlc607k@group.calendar.google.com',
                                        //eventId: "7cbh8rpc10lrc0ckih9tafss99",
                                        resource: event,
                                        conferenceDataVersion: 1
                                    }).execute(function(event) {
                                        alert('Inclusão no Google Calendar efetuada com sucesso!');
                                        intimacao['idCalendarEvent'] = event.id;
                                        intimacao['googleMeetLink'] = event.hangoutLink;
                                        GoogleAPI.incluir(intimacao, 'Intimacao').then(() => {
                                            alert('Intimação incluída com sucesso!');
                                            props.buscarIntimacoes();
                                            props.handleClose();
                                        })
                                        .catch(err => {
                                            alert('Erro de inclusão no sistema de Intimação Virtual!');
                                            return;
                                        });
                                    }).catch(err => {
                                        alert('Erro de inclusão no Google Calendar!');
                                        return;
                                    });
                                    /*apiCalendar.createEvent(event, 'tpfgaifi5bf5lsfn089nlc607k@group.calendar.google.com', { conferenceDataVersion: 1 })
                                        .then(res => {
                                            alert('Inclusão no Google Calendar efetuada com sucesso!');
                                            intimacao['idCalendarEvent'] = res.result.id;
                                            GoogleAPI.incluir(intimacao, 'Intimacao').then(() => {
                                                alert('Intimação incluída com sucesso!');
                                                props.buscarIntimacoes();
                                                props.handleClose();
                                            })
                                            .catch(err => {
                                                alert('Erro de inclusão no sistema de Intimação Virtual!');
                                                return;
                                            });
                                        })
                                        .catch(err => {
                                            alert('Erro de inclusão no Google Calendar!');
                                            return;
                                        })*/
                                }
                            }).catch(err => {
                                console.log('Erro de listagem de eventos do Google Calendar! (calendário de oitivas) ' + err);
                                //alert('Erro de listagem de eventos do Google Calendar! (calendário de oitivas)');
                                return;
                            });
                        }
                    }).catch(err => {
                        alert('Erro de listagem de eventos do Google Calendar! (agenda do delegado)');
                        return;
                    });
                }
            }).catch(err => {
                alert('Erro de listagem de eventos do Google Calendar! (calendário de feriados)');
                return;
            });

        } else { //Alterar
            if ((props.intimacaoSelecionada.dataAudiencia === inputs.dataAudiencia) 
                && (props.intimacaoSelecionada.horaAudiencia === inputs.horaAudiencia)) {
                    
                    intimacao['id'] = idIntimacao;
                    GoogleAPI.alterar(intimacao, 'Intimacao').then(() => {
                        alert('A intimação foi alterada com sucesso!');
                        props.buscarIntimacoes();
                        props.handleClose();
                    })
                    .catch(err => {
                        alert('Erro de alteração no sistema de Intimação Virtual!');
                        return;
                    });

            } else {
                apiCalendar.listEvents({ //Calendario de feriados
                    timeMin: dataHoraInicio.toISOString(),
                    timeMax: dataHoraFim.toISOString()
                }, 'pt.brazilian#holiday@group.v.calendar.google.com').then(({ result }) => {
                    if (!_.isEmpty(result.items)) {
                        alert('É feriado nessa data! É ' + result.items[0].summary + "!");
                        return;
                    } else {
                        apiCalendar.listEvents({ //Calendario do delegado
                            timeMin: dataHoraInicio.toISOString(),
                            timeMax: dataHoraFim.toISOString()
                        }, 'scandolara.pcsc@gmail.com').then(({ result }) => {
                            if (!_.isEmpty(result.items)) {
                                alert('Já existe evento na agenda do delegado para esse horário!');
                                return;
                            } else {
                                apiCalendar.listEvents({ //Calendario das oitivas
                                    timeMin: dataHoraInicio.toISOString(),
                                    timeMax: dataHoraFim.toISOString()
                                }, 'tpfgaifi5bf5lsfn089nlc607k@group.calendar.google.com').then(({ result }) => {
                                    if (!_.isEmpty(result.items)) {
                                        alert('Já existe evento no calendário para esse horário!');
                                        return;
                                    } else {
                                        apiCalendar.updateEvent(event, intimacao.idCalendarEvent, 'tpfgaifi5bf5lsfn089nlc607k@group.calendar.google.com')
                                        .then(res => {
                                            alert('Alteração no Google Calendar efetuada com sucesso!');
                                            intimacao['id'] = idIntimacao;
                                            GoogleAPI.alterar(intimacao, 'Intimacao').then(() => {
                                                alert('Intimação alterada com sucesso!');
                                                props.buscarIntimacoes();
                                                props.handleClose();
                                            })
                                            .catch(err => {
                                                alert('Erro de alteração no sistema de Intimação Virtual!');
                                                return;
                                            });
                                        })
                                        .catch((err) => {
                                            alert('Erro de alteração no Google Calendar!');
                                            return;
                                        })
                                    }
                                }).catch(err => {
                                    alert('Erro de listagem de eventos do Google Calendar! (calendário de oitivas)');
                                    return;
                                });
                            }
                        }).catch(err => {
                            alert('Erro de listagem de eventos do Google Calendar! (agenda do delegado)');
                            return;
                        });
                    }
                }).catch(err => {
                    alert('Erro de listagem de eventos do Google Calendar! (calendário de feriados)');
                    return;
                });
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <fieldset className="grupo" style={{display: 'flex', justifyContent: 'center'}}>
                    <div className="campo">
                        <label htmlFor="nome">Nome:</label>
                        <input type="text" required id="nome" name="nome" size="51"
                            value={inputs.nome || ""} onChange={handleChange} />
                    </div>
                    <div className="campo">
                        <label htmlFor="telefone">Fone: <small>(apenas números)</small></label>
                        <input type="number" className="no-arrow" required id="telefone" name="telefone" size="16"
                            value={inputs.telefone || ""} onChange={handleChange} />
                    </div>
                </fieldset>

                <fieldset className="grupo" style={{display: 'flex', justifyContent: 'center'}}>
                    <div className="campo">
                        <label htmlFor="classe">Classe:</label>
                        <select required id="classe" name="classe" value={classe} 
                            onChange={handleChangeSelectClasse}>
                            <option value="">Selecione</option>
                            <option value="Vítima">Vítima</option>
                            <option value="Testemunha">Testemunha</option>
                            <option value="Autor">Autor</option>
                            <option value="Advogado">Advogado</option>
                        </select>
                    </div>
                    <div className="campo">
                        <label htmlFor="crime">Tipo de Crime:</label>
                        <input type="text" required id="crime" name="crime" size="27"
                            value={inputs.crime || ""} onChange={handleChange} />
                    </div>
                    <div className="campo">
                        <label htmlFor="tipoProcedimento">Tipo de Procedimento:</label>
                        <select required id="tipoProcedimento" name="tipoProcedimento" value={tipoProcedimento} 
                            onChange={handleChangeSelectTipoProcedimento}>
                            <option value="">Selecione</option>
                            <option value="BO">Boletim de Ocorrência</option>
                            <option value="VPI">Verificação Preliminar de Informação</option>
                            <option value="TC">Termo Circunstanciado</option>
                            <option value="IP">Inquérito Policial</option>
                            <option value="APF">Auto de Prisão em Flagrante</option>
                        </select>
                    </div>
                </fieldset>
                
                <fieldset className="grupo" style={{display: 'flex', justifyContent: 'center'}}>
                    <div className="campo">
                        <label htmlFor="codSISP">Unidade:</label>
                        <input type="text" required id="codSISP" name="codSISP" size="20"
                            value={inputs.codSISP || ""} onChange={handleChange} />
                    </div>
                    <div className="campo">
                        <label htmlFor="anoProcedimento">Ano do Procedimento:</label>
                        <input type="text" required id="anoProcedimento" name="anoProcedimento" size="20" 
                            value={inputs.anoProcedimento || ""} onChange={handleChange} />
                    </div>
                    <div className="campo">
                        <label htmlFor="numProcedimento">Número do Procedimento:</label>
                        <input type="text" required id="numProcedimento" name="numProcedimento" size="20"
                            value={inputs.numProcedimento || ""} onChange={handleChange} />
                    </div>
                </fieldset>

                <fieldset className="grupo" style={{display: 'flex', justifyContent: 'center'}}>
                    <div className="campo">
                        <label htmlFor="dataAudiencia">Data da Audiência:</label>
                        <input type="date" required id="dataAudiencia" name="dataAudiencia" 
                            value={inputs.dataAudiencia || ""} onChange={handleChange} />
                    </div>
                    <div className="campo">
                        <label htmlFor="horaAudiencia">Hora da Audiência:</label>
                        <input type="time" required id="horaAudiencia" name="horaAudiencia"
                            value={inputs.horaAudiencia || ""} onChange={handleChange} />
                    </div>
                </fieldset>

                <fieldset className="grupo" style={{display: 'flex', justifyContent: 'center'}}>
                    <div className="campo">
                        <button type="submit" className="botao submit">Salvar</button>
                    </div>
                    <div className="campo">
                        <button className="botao-secundario" onClick={limpar}>Limpar</button>
                    </div>
                </fieldset>
            </fieldset>
        </form>
    )
}