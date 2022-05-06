import React, { useEffect } from 'react';
import { api } from '../../services/api';

import { Container } from './style';

export function TransactionsTable() {
  useEffect(() => {
    api.get('transactions').then((response) => console.log(response.data));
  }, []);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Desenvolvimento de website</td>
            <td className="deposit">R$ 12.88</td>
            <td>Tencnologia</td>
            <td>10/04/2022</td>
          </tr>

          <tr>
            <td>Aluguel</td>
            <td className="withdraw">- R$200</td>
            <td>Moradia</td>
            <td>17/04/2022</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}
