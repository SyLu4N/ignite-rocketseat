import { useState } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/router';

import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripeJs';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton(props: SubscribeButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleSubscribe() {
    setLoading(true);
    if (!session) {
      signIn('github');
      return;
    }

    if (session.activeSubscription) {
      router.push('/posts');
      return;
    }

    //Create at checkout session
    try {
      const response = await api.post('/subscribe');

      const { sessionId } = response.data;

      const stripe = await getStripeJs();
      await stripe.redirectToCheckout({ sessionId });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
      disabled={loading}
    >
      <div className="containerTeste">
        Subscribe now
        {loading ? (
          <span className="loading">
            <BiLoaderAlt />
          </span>
        ) : (
          ''
        )}
      </div>
    </button>
  );
}
