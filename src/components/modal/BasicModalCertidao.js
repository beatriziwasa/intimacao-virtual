import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { jsPDF } from "jspdf";
import PdfGenerator from '../pdf/PdfGenerator';
//import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfDocument from '../pdf/PdfDocument';
import PdfOficioPciMunicao from '../pdf/PdfOficioPciMunicao';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import EventBusyIcon from '@mui/icons-material/EventBusy';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  backgroundColor: '#d3d3d3',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModalCertidao(props) {

  const tituloCertidaoRealizadaSucesso = "CertidaoIntimacaoRealizadaComSucesso.pdf";
  const tituloCertidaoNaoComparecimento = "CertidaoNaoComparecimentoIntimado.pdf";

  const generatePdfCertidaoIntimacao = () => {
    PdfGenerator(props.intimacaoSelecionada, true);
  }

  const generatePdfCertidaoNaoComparecimento = () => {
    PdfGenerator(props.intimacaoSelecionada, false);
  }
  
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <fieldset className="grupo" style={{display: 'flex', justifyContent: 'center'}}>
              <div className="campo">
                <div>Certidão da Intimação Realizada com Sucesso</div>
                <button className="botao-secundario" onClick={generatePdfCertidaoIntimacao}>Gerar PDF</button>
                {/*<PDFDownloadLink
                  document={<PdfDocument intimacao={props.intimacaoSelecionada} tipo={true} />}
                  fileName={tituloCertidaoRealizadaSucesso}
                >
                  {({ blob, url, loading, error }) =>
                    loading ? "Loading..." : <><DoneAllIcon /> Certidão da Intimação Realizada com Sucesso</>
                  }
                </PDFDownloadLink>*/}
              </div>
          </fieldset>
          <br></br>
          <fieldset className="grupo" style={{display: 'flex', justifyContent: 'center'}}>
              <div className="campo">
                <div>Certidão de Não Comparecimento do Intimado</div>
                <button className="botao-secundario" onClick={generatePdfCertidaoNaoComparecimento}>Gerar PDF</button>
                {/*<PDFDownloadLink
                  document={<PdfDocument intimacao={props.intimacaoSelecionada} tipo={false} />}
                  fileName={tituloCertidaoNaoComparecimento}
                >
                  {({ blob, url, loading, error }) =>
                    loading ? "Loading..." : <><EventBusyIcon /> Certidão de Não Comparecimento do Intimado</>
                  }
                </PDFDownloadLink>*/}
              </div>
          </fieldset>
          <fieldset className="grupo" style={{display: 'flex', justifyContent: 'center'}}>
              <div className="campo">
                {/*<PDFDownloadLink
                  document={<PdfOficioPciMunicao oficio={props.intimacaoSelecionada} />}
                  fileName={tituloCertidaoNaoComparecimento}
                >
                  {({ blob, url, loading, error }) =>
                    loading ? "Loading..." : <><EventBusyIcon /> Ofício Teste</>
                  }
                </PDFDownloadLink>*/}
              </div>
          </fieldset>
        </Box>
      </Modal>
    </div>
  );
}