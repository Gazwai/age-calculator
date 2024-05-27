import Image from 'next/image';
import styles from '../page.module.css';

const DividerButton = () => {
  return (
    <div className={styles.divider}>
      <div className={styles.divider__circle_container}>
        <button
          type="submit"
          form="dobForm"
          className={styles.circle}
          aria-label="Submit form"
        >
          <Image
            className={styles.circle__img}
            src="/icon-arrow.svg"
            width={30}
            height={30}
            alt="Submit"
          />
        </button>
      </div>
    </div>
  );
};

export default DividerButton;
