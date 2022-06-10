import React, { useState, useEffect } from 'react';
import { GoogleAPI } from './GoogleAPI';
import _ from 'lodash';

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
    
    const handleSubmit = (event) => {
        event.preventDefault();
        salvarIntimacao();
    }

    const limpar = (event) => {
        event.preventDefault();
        setInputs({});
        setClasse("");
        setTipoProcedimento("");
    }

    async function salvarIntimacao() {
        const intimacao = {
            'nome': inputs.nome,
            'telefone': inputs.telefone,
            'classe': classe,
            'crime': inputs.crime,
            'tipoProcedimento': tipoProcedimento,
            'codSISP': inputs.codSISP,
            'anoProcedimento': inputs.anoProcedimento,
            'numProcedimento': inputs.numProcedimento,
            'dataAudiencia': inputs.dataAudiencia,
            'horaAudiencia': inputs.horaAudiencia
        };
        
        if (_.isNil(idIntimacao)) { //Incluir
            GoogleAPI.incluir(intimacao).then(() => {
                alert('Intimação incluída com sucesso!');
                props.buscarIntimacoes();
                props.handleClose();
            });
        } else { //Alterar
            intimacao['id'] = idIntimacao;
            GoogleAPI.alterar(intimacao).then(() => {
                alert('Intimação alterada com sucesso!');
                props.buscarIntimacoes();
                props.handleClose();
            });
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
                        <label htmlFor="telefone">Telefone:</label>
                        <input type="tel" required id="telefone" name="telefone" size="16"
                            pattern="[0-9]{2} [0-9]{2} [0-9]{5}-[0-9]{4}"
                            placeholder="55 XX XXXXX-XXXX"
                            maxLength="16"
                            value={inputs.telefone || ""} onChange={handleChange} />
                        <small>Exemplo: 55 48 99999-9999</small>
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