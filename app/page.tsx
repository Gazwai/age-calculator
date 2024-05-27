'use client';

import styles from './page.module.css';
import { useState } from 'react';
import DividerButton from './ui/DividerButton';
import YearsMonthsDays from './ui/YearsMonthsDays';
import AgeForm from './ui/AgeForm';

type TimeSince = {
  days: number;
  months: number;
  years: number;
};

export default function Home() {
  const [result, setResult] = useState<TimeSince | null | undefined>(null);

  return (
    <main className={styles.main}>
      <section className={styles.card}>
        <AgeForm setResult={setResult} />

        <DividerButton />

        <YearsMonthsDays result={result} />
      </section>
    </main>
  );
}
