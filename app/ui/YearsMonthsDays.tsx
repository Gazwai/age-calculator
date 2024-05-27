import styles from '../page.module.css';

type TimeSince = {
  days: number;
  months: number;
  years: number;
};

type YearsMonthsDaysProps = {
  result: TimeSince | null | undefined;
};

const DisplayTimeUnit = ({
  unit,
  value,
}: {
  unit: string;
  value: number | undefined;
}) => (
  <div className={styles.body__text_container}>
    <span
      className={styles.body__dynamic_text}
      aria-label={`${unit}: ${value ?? '--'}`}
    >
      {value ?? '--'}
    </span>{' '}
    <span className={styles.body__static_text}>{unit}</span>
  </div>
);

const YearsMonthsDays = ({ result }: YearsMonthsDaysProps) => {
  return (
    <section className={styles.body}>
      <DisplayTimeUnit unit="years" value={result?.years} />
      <DisplayTimeUnit unit="months" value={result?.months} />
      <DisplayTimeUnit unit="days" value={result?.days} />
    </section>
  );
};

export default YearsMonthsDays;
