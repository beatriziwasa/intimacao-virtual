import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IncluirIntimacaoComponent } from './IncluirIntimacaoComponent';

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

export default function BasicModal(props) {
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <IncluirIntimacaoComponent
              handleClose={props.handleClose} 
              buscarIntimacoes={props.buscarIntimacoes}
              intimacaoSelecionada={props.intimacaoSelecionada} />
        </Box>
      </Modal>
    </div>
  );
}
