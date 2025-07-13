import React from "react";
import jsPDF from 'jspdf';
import _ from 'lodash';
import moment from 'moment';
import 'moment/locale/pt';
import logo from "../../images/logo-policial-civil.png";

const formatDate = (date) => {
    let dataFormatada = null;
    if (!_.isNil(date)) {
        let dataTemp = date;
        dataTemp = dataTemp.split("-");
        dataFormatada = dataTemp[2].concat("/").concat(dataTemp[1]).concat("/").concat(dataTemp[0]);
    }
    return dataFormatada;
}

const formatDateHour = (date, hour) => {
    let dataFormatada = formatDate(date);
    let dataHoraFormatada = "";
    if (!_.isNil(date) && !_.isNil(hour)) {
        dataHoraFormatada = dataFormatada.concat(" às ").concat(hour).concat("hs");
    } else if (!_.isNil(date)) {
        dataHoraFormatada = dataFormatada;
    }
    return dataHoraFormatada;
}

const PdfGenerator = (intimacao, tipo) => {
    // Create a new jsPDF instance
    const pdf = new jsPDF();

    // Add images and text to the PDF
    const imageUrl = logo;
    pdf.addImage(imageUrl, 'PNG', 20, 10, 25, 30);
    pdf.setFontSize(10);
    pdf.setFont('Arial');
    pdf.text('ESTADO DE SANTA CATARINA', 50, 15);
    pdf.text('SECRETARIA DE ESTADO DA SEGURANÇA PÚBLICA', 50, 20);
    pdf.text('DELEGACIA GERAL DA POLÍCIA CIVIL', 50, 25);
    pdf.text('Delegacia de Proteção ao Turista - DPTUR - AEROPORTO', 50, 30);
    pdf.text('Rodovia de Acesso ao Aeroporto, 6200, Carianos - FLORIANÓPOLIS/SC (48)3665-5726', 50, 35);
    pdf.setFontSize(16);
    pdf.text('Certidão', 90, 100);
    
    if (tipo) {
        pdf.setFontSize(10);
        
        let mensagem = `Certifico que, no dia %DATA_HOJE%, foi intimado via WhatsApp a pessoa de %NOME_INTIMADO%,\natravés do telefone %TELEFONE_INTIMADO%, sendo agendada sua oitiva para o dia %DATA_HORA_OITIVA%.\nEu,______________, que o digitei.`;
        mensagem = mensagem.replaceAll("%DATA_HOJE%", moment(new Date()).format('L'));
        mensagem = mensagem.replaceAll("%NOME_INTIMADO%", intimacao.nome);
        mensagem = mensagem.replaceAll("%TELEFONE_INTIMADO%", intimacao.telefone);
        mensagem = mensagem.replaceAll("%DATA_HORA_OITIVA%", formatDateHour(intimacao.dataAudiencia, intimacao.horaAudiencia));
        
        pdf.text(mensagem, 20, 120);
        
        let dataLocal = `FLORIANÓPOLIS, %DATA_LOCAL%`;
        dataLocal = dataLocal.replaceAll("%DATA_LOCAL%", moment(new Date()).format('LL'));
        pdf.text(dataLocal, 70, 145);
        
        // Set document properties
        pdf.setProperties({
            title: "Certidão da Intimação Realizada com Sucesso"
        })
        
        // Save the PDF
        pdf.save(`CertidaoIntimacaoRealizadaComSucesso.pdf`);
    
    } else {
        pdf.setFontSize(10);

        let mensagem = `Certifico que, no dia %DATA_HORA_OITIVA%, a pessoa intimada %NOME_INTIMADO%\nnão se apresentou de forma presencial ou virtual para o ato designado.\nEu,______________, que o digitei.`;
        mensagem = mensagem.replaceAll("%NOME_INTIMADO%", intimacao.nome);
        mensagem = mensagem.replaceAll("%DATA_HORA_OITIVA%", formatDateHour(intimacao.dataAudiencia, intimacao.horaAudiencia));
        
        pdf.text(mensagem, 20, 120);

        let dataLocal = `FLORIANÓPOLIS, %DATA_LOCAL%`;
        dataLocal = dataLocal.replaceAll("%DATA_LOCAL%", moment(new Date()).format('LL'));
        pdf.text(dataLocal, 70, 145);

        // Set document properties
        pdf.setProperties({
            title: "Certidão de Não Comparecimento do Intimado"
        })
        
        // Save the PDF
        pdf.save(`CertidaoNaoComparecimentoIntimado.pdf`);
    }

    // pdf open in a new tab
    const pdfDataUri = pdf.output('datauristring');
    const newTab = window.open();
    newTab?.document.write(`<iframe width='100%' height='100%' src='${pdfDataUri}'></iframe>`);
}

export default PdfGenerator;