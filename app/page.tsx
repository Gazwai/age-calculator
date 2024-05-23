import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.card}>
        <form className={styles.form}>
          <input></input>
          <input></input>
          <input></input>
        </form>

        <div className={styles.divider}>
          <hr className={styles.divider_linebreak} />

          <div className={styles.circle}>
            <Image
              src="/icon-arrow.svg"
              width={30}
              height={30}
              alt="Screenshots of the dashboard project showing desktop version"
            />
          </div>
        </div>

        <div className={styles.body}></div>
      </section>
    </main>
  );
}
