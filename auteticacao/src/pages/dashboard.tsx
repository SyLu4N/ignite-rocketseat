import { useContext } from 'react';

import { Can } from '../components/Can';
import { AuthContext } from '../contexts/AuthContext';
import { setupAPIClient } from '../services/api';
import { withSSRAuth } from '../services/utils/withSSRAuth';

export default function Dashboard() {
  const { user, signOut } = useContext(AuthContext);

  return (
    <>
      <h1>Dashboard: {user?.email}</h1>

      <button onClick={signOut}>Sign Out</button>

      <Can permissions={['metrics.list']}>
        <div>Metricas</div>
      </Can>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get('/me');
  console.log(response.data);

  return {
    props: {},
  };
});
