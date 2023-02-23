import { GoogleSpreadsheet } from "google-spreadsheet";

const googleAPIOptions = async (op, data, tipoProcedimento) => {
    // Config variables
    const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
    const CLIENT_EMAIL = process.env.REACT_APP_GOOGLE_CLIENT_EMAIL;
    const PRIVATE_KEY = process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY;

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

    try {
        await doc.useServiceAccountAuth({
            client_email: CLIENT_EMAIL,
            private_key: PRIVATE_KEY.replace(/\\n/g, '\n'),
        });

        // loads document properties and worksheets
        await doc.loadInfo();

        let sheetId = 0;
        switch (tipoProcedimento) {
            case 'Intimacao':
                sheetId = 0;
                break;
            case 'IP':
                sheetId = 1;
                break;
            case 'TC':
                sheetId = 2;
                break;
            case 'APF':
                sheetId = 3;
                break;
            default:
                break;
        }

        const sheet = doc.sheetsByIndex[sheetId];

        if (op === 'incluir') {
            data['id'] = Math.floor(Date.now() * Math.random() / 1000);
            await sheet.addRow(data);

        } else if (op === 'alterar') {
            const rows = await sheet.getRows();
            for (let i = 0; i < rows.length; i++) {
                if (tipoProcedimento === 'Intimacao') {
                    if (rows[i].id === data['id']) {
                        rows[i].nome = data['nome'];
                        rows[i].telefone = data['telefone'];
                        rows[i].classe = data['classe'];
                        rows[i].crime = data['crime'];
                        rows[i].tipoProcedimento = data['tipoProcedimento'];
                        rows[i].codSISP = data['codSISP'];
                        rows[i].anoProcedimento = data['anoProcedimento'];
                        rows[i].numProcedimento = data['numProcedimento'];
                        rows[i].dataAudiencia = data['dataAudiencia'];
                        rows[i].horaAudiencia = data['horaAudiencia'];
                        await rows[i].save();
                        break;
                    }
                } else if (tipoProcedimento === 'IP') {
                    if (rows[i].id === data['id']) {
                        rows[i].escrivao = data['escrivao'];
                        rows[i].numero = data['numero'];
                        rows[i].ano = data['ano'];
                        rows[i].dataAutuacao = data['dataAutuacao'];
                        rows[i].delito = data['delito'];
                        rows[i].delegado = data['delegado'];
                        rows[i].investigado = data['investigado'];
                        rows[i].vitima = data['vitima'];
                        rows[i].origemBOOficio = data['origemBOOficio'];
                        rows[i].apreensao = data['apreensao'];
                        rows[i].dataRemessa = data['dataRemessa'];
                        rows[i].numAutoForum = data['numAutoForum'];
                        rows[i].status = data['status'];
                        await rows[i].save();
                        break;
                    }
                } else if (tipoProcedimento === 'TC') {
                    if (rows[i].id === data['id']) {
                        rows[i].escrivao = data['escrivao'];
                        rows[i].numero = data['numero'];
                        rows[i].ano = data['ano'];
                        rows[i].dataAutuacao = data['dataAutuacao'];
                        rows[i].delito = data['delito'];
                        rows[i].delegado = data['delegado'];
                        rows[i].investigado = data['autor'];
                        rows[i].vitima = data['vitima'];
                        rows[i].origemBOOficio = data['origemBOOficio'];
                        rows[i].numAutoForum = data['numAutoForum'];
                        rows[i].dataRemessa = data['dataRemessa'];
                        rows[i].apreensao = data['apreensao'];
                        rows[i].status = data['status'];
                        await rows[i].save();
                        break;
                    }
                } else if (tipoProcedimento === 'APF') {
                    if (rows[i].id === data['id']) {
                        rows[i].escrivao = data['escrivao'];
                        rows[i].numero = data['numero'];
                        rows[i].ano = data['ano'];
                        rows[i].dataAutuacao = data['dataAutuacao'];
                        rows[i].delito = data['delito'];
                        rows[i].delegado = data['delegado'];
                        rows[i].investigado = data['conduzido'];
                        rows[i].vitima = data['vitima'];
                        rows[i].origemBOOficio = data['origemBOOficio'];
                        rows[i].numAutoForum = data['numAutoForum'];
                        rows[i].dataRemessa = data['dataRemessa'];
                        rows[i].apreensao = data['apreensao'];
                        rows[i].status = data['status'];
                        await rows[i].save();
                        break;
                    }
                }
            }

        } else if (op === 'consultar') {
            return await sheet.getRows();

        } else if (op === 'excluir') {
            const rows = await sheet.getRows();
            for (let i = 0; i < rows.length; i++) {
                if (rows[i].id === data) {
                    await rows[i].delete();
                    break;
                }
            }
        }
    } catch (e) {
        console.error('Error: ', e);
        alert('Erro nesta operação!');
    }
}

export const GoogleAPI = {
    incluir: (data, tipoProcedimento) => googleAPIOptions('incluir', data, tipoProcedimento),
    alterar: (data, tipoProcedimento) => googleAPIOptions('alterar', data, tipoProcedimento),
    consultar: (tipoProcedimento) => googleAPIOptions('consultar', '', tipoProcedimento),
    excluir: (id, tipoProcedimento) => googleAPIOptions('excluir', id, tipoProcedimento)
}