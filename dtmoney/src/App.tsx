import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { NewTrasctionsModal } from './components/NewTransactionsModal';
import { GlobalStyle } from './styles/global';

{
  /* <ModalButton
isModalOpem={isModalOpem}
handleModalClose={handleModalClose}
/> */
}

export function App() {
  const [isModalOpem, setIsModalOpen] = useState(false);

  function handleModalOpen() {
    setIsModalOpen(true);
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  return (
    <>
      <Header handleModalOpen={handleModalOpen} />
      <Dashboard />
      <NewTrasctionsModal
        isModalOpem={isModalOpem}
        handleModalClose={handleModalClose}
      />
      <GlobalStyle />
    </>
  );
}
