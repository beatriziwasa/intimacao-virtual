import React from "react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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
    pdf.setFont('Helvetica');
    pdf.setFontSize(9);
    pdf.text('ESTADO DE SANTA CATARINA', 50, 15);
    pdf.text('SECRETARIA DE ESTADO DA SEGURANÇA PÚBLICA', 50, 20);
    pdf.text('DELEGACIA GERAL DA POLÍCIA CIVIL', 50, 25);
    pdf.text('Delegacia de Proteção ao Turista - DPTUR - AEROPORTO', 50, 30);
    pdf.text('Rodovia de Acesso ao Aeroporto, 6200, Carianos - FLORIANÓPOLIS/SC (48)3665-5726', 50, 35);
    
    let mensagem = "";
    
    if (tipo) {
        mensagem = `Certifico que, no dia ${moment(new Date()).format('L')}, foi intimado via WhatsApp a pessoa de ${intimacao.nome},\n
        através do telefone ${intimacao.telefone}, sendo agendada sua oitiva para o dia ${formatDateHour(intimacao.dataAudiencia, intimacao.horaAudiencia)}.\n
        Eu,______________, que o digitei.`;
    } else {
        mensagem = `Certifico que, no dia ${formatDateHour(intimacao.dataAudiencia, intimacao.horaAudiencia)}, a pessoa intimada ${intimacao.nome}\n
        não se apresentou de forma presencial ou virtual para o ato designado.\n
        Eu,______________, que o digitei.`;
    }

    let htmlString = `
    <div style="border: solid; border-width: 2px; width: 450px">
        <p style="margin-top: 20px; text-transform: uppercase; text-align: center; font-size: 12">Certidão</p>
        <br/>
        <p style="margin: 20px; font-family: Helvetica; font-size: 9; text-align: justify">${mensagem}</p>
        <br/>
        <p style="margin: 20px; text-align: center">FLORIANÓPOLIS, ${moment(new Date()).format('LL')}</p>
    </div>`;
    
    // Create a temporary div element
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute'; // Prevent it from affecting layout visually
    tempDiv.style.left = '-9999px'; // Move it off-screen
    document.body.appendChild(tempDiv);

    // Set the innerHTML of the temporary div to your HTML string
    tempDiv.innerHTML = htmlString;

    html2canvas(tempDiv).then((canvas) => {
        // Append the generated canvas to the body or another desired location
        document.body.appendChild(canvas);

        // Remove the temporary div
        document.body.removeChild(tempDiv);
        
        const img = canvas.toDataURL("image/png");
        pdf.addImage(img, 'JPEG', 45, 60);

        // Set document properties
        if (tipo) {
            pdf.setProperties({title: "Certidão da Intimação Realizada com Sucesso"});
        } else {
            pdf.setProperties({title: "Certidão de Não Comparecimento do Intimado"})
        }
        
        // Save the PDF
        pdf.save(`CertidaoIntimacaoRealizadaComSucesso.pdf`);

        // pdf open in a new tab
        const pdfDataUri = pdf.output('datauristring');
        const newTab = window.open();
        newTab?.document.write(`<iframe width='100%' height='100%' src='${pdfDataUri}'></iframe>`);
    });
}

export default PdfGenerator;