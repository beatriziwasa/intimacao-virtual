import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfDocument from '../pdf/PdfDocument';
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
                <PDFDownloadLink
                  document={<PdfDocument intimacao={props.intimacaoSelecionada} tipo={true} />}
                  fileName={tituloCertidaoRealizadaSucesso}
                >
                  {({ blob, url, loading, error }) =>
                    loading ? "Loading..." : <><DoneAllIcon /> Certidão da Intimação Realizada com Sucesso</>
                  }
                </PDFDownloadLink>
              </div>
          </fieldset>
          <fieldset className="grupo" style={{display: 'flex', justifyContent: 'center'}}>
              <div className="campo">
                <PDFDownloadLink
                  document={<PdfDocument intimacao={props.intimacaoSelecionada} tipo={false} />}
                  fileName={tituloCertidaoNaoComparecimento}
                >
                  {({ blob, url, loading, error }) =>
                    loading ? "Loading..." : <><EventBusyIcon /> Certidão de Não Comparecimento do Intimado</>
                  }
                </PDFDownloadLink>
              </div>
          </fieldset>
        </Box>
      </Modal>
    </div>
  );
}