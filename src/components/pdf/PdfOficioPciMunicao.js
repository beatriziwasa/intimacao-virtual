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
    divMargem: {
        margin: '10px'
    },
    oficioTitulo: {
        fontSize: 11,
        fontWeight: 700,
        textAlign: 'left',
        paddingBottom: '20px'
    },
    oficioTexto: {
        fontSize: 11,
        paddingTop: '20px',
        textAlign: 'justify'
    },
    oficioSaudacao: {
        fontSize: 11,
        paddingTop: '40px',
        textAlign: 'left'
    },
    oficioData: {
        fontSize: 11,
        paddingTop: '20px',
        textAlign: 'left'
    },
    oficioAssinadoEletronicamente: {
        fontSize: 11,
        paddingTop: '80px',
        fontWeight: 700,
        textAlign: 'center'
    },
    oficioAssinatura: {
        fontSize: 11,
        paddingTop: '10px',
        fontWeight: 700,
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
const PdfOficioPciMunicao = ({ oficio }) => {
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
                <View style={styles.divMargem}>
                    <Text style={styles.oficioTitulo}>Ofício nº 122/2022</Text>
                    <Text style={styles.oficioTitulo}>Ref. Boletim de Ocorrência nº 490.2022.0000334</Text>
                    <Text style={styles.oficioTexto}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Senhor Diretor,</Text>
                    <Text style={styles.oficioTexto}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Cumprimentando-o cordialmente, pelo presente encaminhamos 
                    01 carregador contendo 33 (trinta e três) munições 9mm, marca CBC, encontradas com
                    ANGELA CRISTINA SAER MARCHETTI, investigada no Boletim de Ocorrência supramencionado,
                    para que sejam submetidos ao exame pericial.</Text>
                    <Text style={styles.oficioSaudacao}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Atenciosamente,</Text>
                    <Text style={styles.oficioData}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Florianópolis, {moment(new Date()).format('LL')}</Text>
                    <Text style={styles.oficioAssinadoEletronicamente}>[Assinado eletronicamente]</Text>
                    <Text style={styles.oficioAssinatura}>RENAN PELLENZ SCANDOLARA</Text>
                    <Text style={styles.oficioAssinatura}>Delegado de Polícia</Text>
                </View>
            </Page>
        </Document>*/}
    );
}

export default PdfOficioPciMunicao;