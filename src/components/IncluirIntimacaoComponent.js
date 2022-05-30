import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import Parse from 'parse/dist/parse.min.js';

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
        incluirIntimacao();
    }

    const limpar = (event) => {
        event.preventDefault();
        setInputs({});
        setClasse("");
        setTipoProcedimento("");
    }

    async function incluirIntimacao() {
        try {
            // create a new Parse Object instance
            const Intimacao = new Parse.Object('Intimacao');
            // define the attributes you want for your Object
            if (!_.isNil(idIntimacao)) { //Para alterar ao inves de incluir
                Intimacao.set('objectId', idIntimacao);
            }
            Intimacao.set('nome', inputs.nome);
            Intimacao.set('telefone', inputs.telefone);
            Intimacao.set('classe', classe);
            Intimacao.set('tipoProcedimento', tipoProcedimento);
            Intimacao.set('codSISP', inputs.codSISP);
            Intimacao.set('anoProcedimento', inputs.anoProcedimento);
            Intimacao.set('numProcedimento', inputs.numProcedimento);
            Intimacao.set('crime', inputs.crime);
            Intimacao.set('dataAudiencia', inputs.dataAudiencia);
            Intimacao.set('horaAudiencia', inputs.horaAudiencia);
            // save it on Back4App Data Store
            await Intimacao.save();
            alert('Intimacao salva com sucesso!!');
            props.handleClose();
        } catch (error) {
            console.log('Erro na inclusão de nova intimacao: ', error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <fieldset class="grupo" style={{display: 'flex', justifyContent: 'center'}}>
                    <div class="campo">
                        <label for="nome">Nome:</label>
                        <input type="text" required id="nome" name="nome" size="51"
                            value={inputs.nome || ""} onChange={handleChange} />
                    </div>
                    <div class="campo">
                        <label for="telefone">Telefone:</label>
                        <input type="tel" required id="telefone" name="telefone" size="16"
                            pattern="[0-9]{2} [0-9]{2} [0-9]{5}-[0-9]{4}"
                            placeholder="55 XX XXXXX-XXXX"
                            maxlength="16"
                            value={inputs.telefone || ""} onChange={handleChange} />
                        <small>Exemplo: 55 48 99999-9999</small>
                    </div>
                </fieldset>

                <fieldset class="grupo" style={{display: 'flex', justifyContent: 'center'}}>
                    <div class="campo">
                        <label for="classe">Classe:</label>
                        <select required id="classe" name="classe" value={classe} 
                            onChange={handleChangeSelectClasse}>
                            <option value="">Selecione</option>
                            <option value="Vítima">Vítima</option>
                            <option value="Testemunha">Testemunha</option>
                            <option value="Autor">Autor</option>
                            <option value="Advogado">Advogado</option>
                        </select>
                    </div>
                    <div class="campo">
                        <label for="crime">Tipo de Crime:</label>
                        <input type="text" required id="crime" name="crime" size="27"
                            value={inputs.crime || ""} onChange={handleChange} />
                    </div>
                    <div class="campo">
                        <label for="tipoProcedimento">Tipo de Procedimento:</label>
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
                
                <fieldset class="grupo" style={{display: 'flex', justifyContent: 'center'}}>
                    <div class="campo">
                        <label for="codSISP">Unidade:</label>
                        <input type="text" required id="codSISP" name="codSISP" size="20"
                            value={inputs.codSISP || ""} onChange={handleChange} />
                    </div>
                    <div class="campo">
                        <label for="anoProcedimento">Ano do Procedimento:</label>
                        <input type="text" required id="anoProcedimento" name="anoProcedimento" size="20" 
                            value={inputs.anoProcedimento || ""} onChange={handleChange} />
                    </div>
                    <div class="campo">
                        <label for="numProcedimento">Número do Procedimento:</label>
                        <input type="text" required id="numProcedimento" name="numProcedimento" size="20"
                            value={inputs.numProcedimento || ""} onChange={handleChange} />
                    </div>
                </fieldset>

                <fieldset class="grupo" style={{display: 'flex', justifyContent: 'center'}}>
                    <div class="campo">
                        <label for="dataAudiencia">Data da Audiência:</label>
                        <input type="date" required id="dataAudiencia" name="dataAudiencia" 
                            value={inputs.dataAudiencia || ""} onChange={handleChange} />
                    </div>
                    <div class="campo">
                        <label for="horaAudiencia">Hora da Audiência:</label>
                        <input type="time" required id="horaAudiencia" name="horaAudiencia"
                            value={inputs.horaAudiencia || ""} onChange={handleChange} />
                    </div>
                </fieldset>

                <fieldset class="grupo" style={{display: 'flex', justifyContent: 'center'}}>
                    <div class="campo">
                        <button type="submit" class="botao submit">Salvar</button>
                    </div>
                    <div class="campo">
                        <button class="botao-secundario" onClick={limpar}>Limpar</button>
                    </div>
                </fieldset>
            </fieldset>
        </form>
    )
}