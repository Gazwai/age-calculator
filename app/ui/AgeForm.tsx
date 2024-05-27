import styles from '../page.module.css';
import { useForm, SubmitHandler, UseFormSetError } from 'react-hook-form';
import { useState } from 'react';

type Inputs = {
  day: number;
  month: number;
  year: number;
};

type TimeSince = {
  days: number;
  months: number;
  years: number;
};

type AgeFormProps = {
  setResult: (result: TimeSince | null | undefined) => void;
};

function calculateDateDifference(
  inputDate: string,
  setError: UseFormSetError<Inputs>
): TimeSince | undefined {
  const startDate = new Date(inputDate);
  const endDate = new Date();

  // Ensure the start date is before the end date
  if (startDate > endDate) {
    setError('day', { type: 'custom', message: 'Must be in the past.' });
    setError('month', { type: 'custom', message: '' });
    setError('year', { type: 'custom', message: '' });
    return;
  }

  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();
  let days = endDate.getDate() - startDate.getDate();

  // Adjust days and months if needed
  if (days < 0) {
    months--;
    const lastMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
    days += lastMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

function AgeForm({ setResult }: AgeFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = ({ day, month, year }) => {
    const inputDate = `${year}-${month}-${day}`;

    const result = calculateDateDifference(inputDate, setError);

    setResult(result);
  };

  return (
    <form
      className={styles.form}
      id="dobForm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles.form__input_container}>
        <label
          className={styles.form__input_label}
          htmlFor="day"
          style={{ color: errors.day && '#f3797f' }}
        >
          Day
        </label>

        <input
          className={styles.form__input}
          {...register('day', {
            min: { value: 1, message: 'Must be between 1 - 31' },
            max: { value: 31, message: 'Must be between 1 - 31' },
            required: { value: true, message: 'Day is required' },
          })}
          aria-invalid={errors.day ? 'true' : 'false'}
          id="day"
          type="number"
        />

        <div className={styles.form__input_errors}>
          {errors.day && <span role="alert">{errors.day.message}</span>}
        </div>
      </div>

      <div className={styles.form__input_container}>
        <label
          className={styles.form__input_label}
          htmlFor="month"
          style={{ color: errors.month && '#f3797f' }}
        >
          Month
        </label>

        <input
          className={styles.form__input}
          {...register('month', {
            min: { value: 1, message: 'Must be between 1 - 12' },
            max: { value: 12, message: 'Must be between 1 - 12' },
            required: { value: true, message: 'Month is required' },
          })}
          aria-invalid={errors.month ? 'true' : 'false'}
          id="month"
        />

        <div className={styles.form__input_errors}>
          {errors.month && <span role="alert">{errors.month.message}</span>}
        </div>
      </div>

      <div className={styles.form__input_container}>
        <label
          className={styles.form__input_label}
          htmlFor="year"
          style={{ color: errors.year && '#f3797f' }}
        >
          Year
        </label>

        <input
          className={styles.form__input}
          id="year"
          {...register('year', {
            min: { value: 0, message: "Must be after JC's sacrifice" },
            required: { value: true, message: 'Year is required' },
          })}
          aria-invalid={errors.year ? 'true' : 'false'}
          name="year"
          type="number"
        />

        <div className={styles.form__input_errors}>
          {errors.year && <span role="alert">{errors.year.message}</span>}
        </div>
      </div>
    </form>
  );
}

export default AgeForm;
