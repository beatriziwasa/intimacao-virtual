import React, { useState, useEffect } from 'react';
import { GoogleAPI } from '../api/GoogleAPI';
import _ from 'lodash';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export const IncluirApfComponent = (props) => {
    
    useEffect(() => {
        setInputs(props.apfSelecionado);
        setStatus(props.apfSelecionado.status);
        setApreensao(props.apfSelecionado.apreensao);
        setIdApf(props.apfSelecionado.id);
    }, [props.apfSelecionado]);

    const [inputs, setInputs] = useState({});
    const [status, setStatus] = useState("");
    const [apreensao, setApreensao] = useState("Não");
    const [idApf, setIdApf] = useState();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    
    const handleChangeSelectStatus = (event) => {
        setStatus(event.target.value);
    }

    const handleChangeRadioApreensao = (event) => {
        setApreensao(event.target.value);
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        salvarApf();
    }

    const limpar = (event) => {
        event.preventDefault();
        setInputs({});
        setStatus("");
    }

    async function salvarApf() {
        let apf = {
            'escrivao': inputs.escrivao,
            'numero': inputs.numero,
            'ano': inputs.ano,
            'dataAutuacao': inputs.dataAutuacao,
            'delito': inputs.delito,
            'delegado': inputs.delegado,
            'conduzido': inputs.conduzido,
            'vitima': inputs.vitima,
            'origemBOOficio': inputs.origemBOOficio,
            'numAutoForum': inputs.numAutoForum,
            'dataRemessa': inputs.dataRemessa,
            'apreensao': apreensao,
            'status': status,
        };

        if (_.isNil(idApf)) { //Incluir
            GoogleAPI.incluir(apf, 'APF').then(() => {
                alert('APF incluído com sucesso!');
                props.buscarAPFs();
                props.handleClose();
            })
            .catch(err => {
                alert('Erro de inclusão do APF no sistema!');
                return;
            });
        } else { //Alterar
            apf['id'] = idApf;
            GoogleAPI.alterar(apf, 'APF').then(() => {
                alert('APF alterado com sucesso!');
                props.buscarAPFs();
                props.handleClose();
            })
            .catch(err => {
                alert('Erro de alteração do APF no sistema!');
                return;
            });
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <fieldset className="grupo" style={{display: 'flex', justifyContent: 'center'}}>
                    <div className="campo">
                        <label htmlFor="numero">Número:</label>
                        <input type="number" className="no-arrow" required id="numero" name="numero" size="10"
                            maxLength="3" value={inputs.numero || ""} onChange={handleChange} />
                    </div>
                    <div className="campo">
                        <label htmlFor="ano">Ano:</label>
                        <input type="number" className="no-arrow" required id="ano" name="ano" size="10"
                            maxLength="4" value={inputs.ano || ""} onChange={handleChange} />
                    </div>
                    <div className="campo">
                        <label htmlFor="dataAutuacao">Autuação:</label>
                        <input type="date" required id="dataAutuacao" name="dataAutuacao" 
                            value={inputs.dataAutuacao || ""} onChange={handleChange} />
                    </div>
                </fieldset>

                <fieldset className="grupo" style={{display: 'flex', justifyContent: 'center'}}>
                    <div className="campo">
                        <label htmlFor="vitima">Vítima:</label>
                        <input type="text" required id="vitima" name="vitima" size="35"
                            value={inputs.vitima || ""} onChange={handleChange} />
                    </div>
                    <div className="campo">
                        <label htmlFor="conduzido">Conduzido:</label>
                        <input type="text" required id="conduzido" name="conduzido" size="35"
                            value={inputs.conduzido || ""} onChange={handleChange} />
                    </div>
                </fieldset>
                
                <fieldset className="grupo" style={{display: 'flex', justifyContent: 'center'}}>
                    <div className="campo">
                        <label htmlFor="delito">Delito:</label>
                        <input type="text" required id="delito" name="delito" size="15"
                            value={inputs.delito || ""} onChange={handleChange} />
                    </div>
                    <div className="campo">
                        <label htmlFor="origemBOOficio">Origem BO Ofício:</label>
                        <input type="text" required id="origemBOOficio" name="origemBOOficio"
                            value={inputs.origemBOOficio || ""} onChange={handleChange} />
                    </div>
                    <div className="campo">
                        <label htmlFor="apreensao">Apreensão:</label>
                        <RadioGroup
                            row
                            aria-labelledby="apreensao"
                            name="apreensao"
                            value={apreensao}
                            onChange={handleChangeRadioApreensao}
                        >
                            <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
                            <FormControlLabel value="Não" control={<Radio />} label="Não" />
                        </RadioGroup>
                    </div>
                </fieldset>

                <fieldset className="grupo" style={{display: 'flex', justifyContent: 'center'}}>
                    <div className="campo">
                        <label htmlFor="status">Status:</label>
                        <select required id="status" name="status" value={status} 
                            onChange={handleChangeSelectStatus}>
                            <option value="">Selecione</option>
                            <option value="Tramitando">Tramitando</option>
                            <option value="Remetido">Remetido</option>
                            <option value="Baixado">Baixado</option>
                            <option value="Arquivado">Arquivado</option>
                        </select>
                    </div>
                    <div className="campo">
                        <label htmlFor="dataRemessa">Remessa:</label>
                        <input type="date" id="dataRemessa" name="dataRemessa" 
                            value={inputs.dataRemessa || ""} onChange={handleChange} />
                    </div>
                    <div className="campo">
                        <label htmlFor="numAutoForum">Eproc:</label>
                        <input type="text" id="numAutoForum" name="numAutoForum" size="20"
                            value={inputs.numAutoForum || ""} onChange={handleChange} />
                    </div>
                </fieldset>

                <fieldset className="grupo" style={{display: 'flex', justifyContent: 'center'}}>
                    <div className="campo">
                        <label htmlFor="delegado">Delegado:</label>
                        <input type="text" required id="delegado" name="delegado" size="30"
                            value={inputs.delegado || ""} onChange={handleChange} />
                    </div>
                    <div className="campo">
                        <label htmlFor="escrivao">Escrivã:</label>
                        <input type="text" required id="escrivao" name="escrivao" size="30"
                            value={inputs.escrivao || ""} onChange={handleChange} />
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