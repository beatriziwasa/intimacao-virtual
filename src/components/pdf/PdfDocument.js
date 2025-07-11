import React from "react";
import _ from 'lodash';
import moment from 'moment';
import 'moment/locale/pt';
//import { Page, Document, Text, StyleSheet, Image, View } from "@react-pdf/renderer";
import logo from "../../images/logo-policial-civil.png";

/*const styles = StyleSheet.create({
    page: {
        backgroundColor: '#fff',
        fontFamily: 'Helvetica',
        fontSize: 9,
        paddingTop: 30,
        paddingLeft: 50,
        paddingRight: 50,
        lineHeight: 1.5,
        flexDirection: 'column',
    },
    logo: {
        width: 70,
        height: 84,
        marginLeft: 0,
        marginRight: 'auto'
    },
    divCertidao: {
        borderColor: '#000000',
        borderWidth: '2px',
        borderStyle: 'solid',
        marginLeft: '110px',
        marginRight: '110px'
    },
    divMargem: {
        margin: '10px'
    },
    certidaoTitulo: {
        fontSize: 12,
        fontWeight: 'heavy',
        textAlign: 'center',
        textTransform: 'uppercase',
        paddingBottom: '20px'
    },
    certidaoTexto: {
        textAlign: 'justify'
    },
    certidaoData: {
        paddingTop: '20px',
        textAlign: 'center'
    },
    row: {
        flexDirection: 'row',
        paddingBottom: '50px'
    },
    right: {
        padding: 5
    }
});
*/
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

const PdfDocument = ({ intimacao, tipo }) => {
    moment.locale('pt');
    return (
        {/*<Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.row}>
                    <View>
                        <Image src={logo} style={styles.logo} />
                    </View>
                    <View style={styles.right}>
                        <Text>ESTADO DE SANTA CATARINA</Text>
                        <Text>SECRETARIA DE ESTADO DA SEGURANÇA PÚBLICA</Text>
                        <Text>DELEGACIA GERAL DA POLÍCIA CIVIL</Text>
                        <Text>Delegacia de Proteção ao Turista - DPTUR - AEROPORTO</Text>
                        <Text>Rodovia de Acesso ao Aeroporto, 6200, Carianos - FLORIANÓPOLIS/SC (48)3665-5726</Text>
                    </View>
                </View>
                <View style={styles.divCertidao}>
                    <View style={styles.divMargem}>
                        <Text style={styles.certidaoTitulo}>Certidão</Text>
                        { tipo ?
                            <Text style={styles.certidaoTexto}>Certifico que, no dia {moment(new Date()).format('L')}, foi intimado via WhatsApp a pessoa de {intimacao.nome}, através do telefone {intimacao.telefone}, sendo agendada sua oitiva para o dia {formatDateHour(intimacao.dataAudiencia, intimacao.horaAudiencia)}. Eu,______________, que o digitei.</Text>
                        :
                            <Text style={styles.certidaoTexto}>Certifico que, no dia {formatDateHour(intimacao.dataAudiencia, intimacao.horaAudiencia)}, a pessoa intimada {intimacao.nome} não se apresentou de forma presencial ou virtual para o ato designado. Eu,______________, que o digitei.</Text>
                        }
                        <Text style={styles.certidaoData}>FLORIANÓPOLIS, {moment(new Date()).format('LL')}</Text>
                    </View>
                </View>
            </Page>
        </Document>*/}
    );
}

export default PdfDocument;