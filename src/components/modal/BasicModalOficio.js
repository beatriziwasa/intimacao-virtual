import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IncluirOficioComponent } from '../oficio/IncluirOficioComponent';

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

export default function BasicModalOficio(props) {
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <IncluirOficioComponent
              handleClose={props.handleClose} 
              buscarOficios={props.buscarOficios}
              oficioSelecionado={props.oficioSelecionado} />
        </Box>
      </Modal>
    </div>
  );
}
