import React from "react";
import _ from 'lodash';
import { Page, Document, Text, StyleSheet, Image } from "@react-pdf/renderer";
import logo from "../logo-policial-civil.png";

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#fff',
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft: 50,
        paddingRight: 50,
        lineHeight: 1.5,
        flexDirection: 'column',
    },
    logo: {
        width: 84,
        height: 70,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    reportTitle: {
        fontSize: 12,
        textAlign: 'center',
        textTransform: 'uppercase',
    }
});

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
        dataHoraFormatada = dataFormatada.concat(" ").concat(hour);
    } else if (!_.isNil(date)) {
        dataHoraFormatada = dataFormatada;
    }
    return dataHoraFormatada;
}

const PdfDocument = ({ intimacao }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Image src={logo} />
                <Text style={styles.reportTitle}>Certifico que, na data {formatDate(intimacao.dataAudiencia)}, foi intimado via WhatsApp a pessoa de {intimacao.nome}, através do telefone {intimacao.telefone}, sendo agendada sua oitiva para a data de {formatDateHour(intimacao.dataAudiencia, intimacao.horaAudiencia)}.</Text>
            </Page>
        </Document>
    );
}

export default PdfDocument;