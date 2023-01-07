import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfDocument from './PdfDocument';

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

  const fileName = "Certidao.pdf";
  
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
                  document={<PdfDocument intimacao={props.intimacaoSelecionada} />}
                  fileName={fileName}
                >
                  {({ blob, url, loading, error }) =>
                    loading ? "Loading..." : "Download Certidão"
                  }
                </PDFDownloadLink>
              </div>
          </fieldset>
        </Box>
      </Modal>
    </div>
  );
}