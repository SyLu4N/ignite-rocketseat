import styles from './styles.module.scss';

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton(props: SubscribeButtonProps) {
  console.log(props.priceId);
  return (
    <button
    type='button'
    className={styles.subscribeButton}
    >
      Subscribe now
    </button>
  );
}
