import decode from 'jwt-decode';

import { setupAPIClient } from '../services/api';
import { withSSRAuth } from '../services/utils/withSSRAuth';

export default function Metrics() {
  return (
    <>
      <h1>Metrcis </h1>
    </>
  );
}

export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    return {
      props: {},
    };
  },
  {
    permissions: ['metrics.list'],
    roles: ['administrator'],
  }
);
