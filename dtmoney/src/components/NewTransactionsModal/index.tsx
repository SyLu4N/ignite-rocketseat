import React, { FormEvent, useState } from 'react';
import Modal from 'react-modal';

import { Container, TransactionTypeContainer, RadioBox } from './styles';
import closeModal from '../../assets/closeModal.svg';
import income from '../../assets/entradas.svg';
import outcome from '../../assets/saidas.svg';
import { useTransactions } from '../../hooks/useTransactions';

interface NewTrasctionsModalProps {
  isModalOpem: boolean;
  handleModalClose: () => void;
}

Modal.setAppElement('#root');

export function NewTrasctionsModal(props: NewTrasctionsModalProps) {
  const { createTransaction } = useTransactions();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState('deposit');
  const [category, setCategory] = useState('');

  async function sendCreateNewTransaction(e: FormEvent): Promise<void> {
    e.preventDefault();

    await createTransaction({
      title,
      type,
      category,
      amount,
    });
    clearModal();
    props.handleModalClose();
  }

  function clearModal(): void {
    setTitle('');
    setAmount(0);
    setType('deposit');
    setCategory('');
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
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <input
          placeholder="Valor"
          type="number"
          onChange={(e) => setAmount(Number(e.target.value))}
          value={amount}
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
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="Categoria"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
