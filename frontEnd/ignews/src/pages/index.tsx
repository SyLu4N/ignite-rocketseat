import { GetStaticProps } from 'next';
import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';

import styles from './home.module.scss';

interface HomeProps {
  product: {
    priceId: string,
    amount: number,
  }
}

export default function Home(props: HomeProps) {
  return (
    <>
      <Head>
        <title>Inicio | Ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>Get access to all the publication <br />
            <span>for {props.product.amount} month</span>
          </p>
          <SubscribeButton priceId={props.product.priceId}/>
        </section>

        <img src="/images/avatar.svg" alt="Girl Coding" />
      </main>
    </>
  )
}

//GetServerSideProps === Sempre atualiza
//GetStacticProps === Atualiza em um determinado tempo

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1Ky4DaBVvAjyeoqcv5S0BMcK'
  );

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  };

  return{
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,
  };
}
