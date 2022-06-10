import { GoogleSpreadsheet } from "google-spreadsheet";

const googleAPIOptions = async (op, data) => {
    // Config variables
    const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
    const SHEET_ID = process.env.REACT_APP_SHEET_ID;
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

        const sheet = doc.sheetsById[SHEET_ID];

        if (op === 'incluir') {
            data['id'] = Math.floor(Date.now() * Math.random() / 1000);
            await sheet.addRow(data);

        } else if (op === 'alterar') {
            const rows = await sheet.getRows();
            for (let i = 0; i < rows.length; i++) {
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
    incluir: (data) => googleAPIOptions('incluir', data),
    alterar: (data) => googleAPIOptions('alterar', data),
    consultar: () => googleAPIOptions('consultar', ''),
    excluir: (id) => googleAPIOptions('excluir', id)
}