import React, { FormEvent, useState } from 'react';
import Modal from 'react-modal';

import { api } from '../../services/api';
import { Container, TransactionTypeContainer, RadioBox } from './styles';
import closeModal from '../../assets/closeModal.svg';
import income from '../../assets/entradas.svg';
import outcome from '../../assets/saidas.svg';

interface NewTrasctionsModalProps {
  isModalOpem: boolean;
  handleModalClose: () => void;
}

Modal.setAppElement('#root');

export function NewTrasctionsModal(props: NewTrasctionsModalProps) {
  const [type, setType] = useState('deposit');
  const [transctionTitle, setTransctionTitle] = useState('');
  const [transctionValue, setTransctionValue] = useState(0);
  const [transctionCategory, setTransctionCategory] = useState('');

  function sendCreateNewTransaction(e: FormEvent) {
    e.preventDefault();

    const data = { transctionTitle, transctionValue, transctionCategory, type };

    api.post('/transactions', data);
  }

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
      <Container onSubmit={sendCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input
          placeholder="Título"
          onChange={(e) => setTransctionTitle(e.target.value)}
          value={transctionTitle}
        />

        <input
          placeholder="Valor"
          type="number"
          onChange={(e) => setTransctionValue(Number(e.target.value))}
          value={transctionValue}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setType('deposit')}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img src={income} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={() => setType('withdraw')}
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcome} alt="Saida" />
            <span>Entrada</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="Categoria"
          onChange={(e) => setTransctionCategory(e.target.value)}
          value={transctionCategory}
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
