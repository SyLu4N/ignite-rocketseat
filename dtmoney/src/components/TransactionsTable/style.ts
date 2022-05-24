import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 4rem;

  table {
    width: 100%;
    border-spacing: 0 0.5rem;
  }

  th {
    font-weight: 400;
    text-align: left;

    padding: 1rem 2rem;
    color: var(--text-body);
  }

  td {
    background: #fff;
    color: var(--text-body);

    padding: 1rem 2rem;
    border: 0;
    border-radius: 0.25rem;

    &:first-child {
      color: var(--text-title);
    }

    &.deposit {
      color: var(--green);
    }

    &.withdraw {
      color: var(--red);
    }
  }
`;
