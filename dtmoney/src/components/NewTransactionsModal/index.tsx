import React from 'react';
import Modal from 'react-modal';

import { Container } from './styles';
import closeModal from '../../assets/closeModal.svg';

interface NewTrasctionsModalProps {
  isModalOpem: boolean;
  handleModalClose: () => void;
}

Modal.setAppElement('#root');

export function NewTrasctionsModal(props: NewTrasctionsModalProps) {
  return (
    <Modal
      isOpen={props.isModalOpem}
      onRequestClose={props.handleModalClose}
      overlayClassName="reactModalOverlay"
      className="reactModalContent"
    >
      <button
        type="button"
        onClick={props.handleModalClose}
        className="reactModalClose"
      >
        <img src={closeModal} alt="Fechar o Modal" />
      </button>
      <Container>
        <h2>Cadastrar transação</h2>
        <input placeholder="Título" />
        <input placeholder="Valor" type="number" />
        <input placeholder="Categoria" />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
