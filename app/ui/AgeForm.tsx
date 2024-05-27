import styles from '../page.module.css';
import { useForm, SubmitHandler, UseFormSetError } from 'react-hook-form';

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

export const calculateDateDifference = (
  inputDate: string,
  setError: UseFormSetError<Inputs>
): TimeSince | undefined => {
  const startDate = new Date(inputDate);
  const endDate = new Date();

  if (startDate > endDate) {
    setError('day', { type: 'custom', message: 'Must be in the past.' });
    setError('month', { type: 'custom', message: '' });
    setError('year', { type: 'custom', message: '' });
    return;
  }

  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();
  let days = endDate.getDate() - startDate.getDate();

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
};

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

        <select
          {...register('day', { required: 'Day is required' })}
          id="day"
          className={styles.form__input}
          aria-invalid={errors.day ? 'true' : 'false'}
        >
          <option value="">DD</option>
          {Array.from({ length: 31 }, (_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

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

        <select
          {...register('month', { required: 'Month is required' })}
          id="month"
          className={styles.form__input}
          aria-invalid={errors.month ? 'true' : 'false'}
        >
          <option value="">MM</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

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

        <select
          {...register('year', { required: 'Year is required' })}
          id="year"
          className={styles.form__input}
          aria-invalid={errors.year ? 'true' : 'false'}
        >
          <option value="">YYYY</option>
          {Array.from({ length: 124 }, (_, i) => (
            <option key={i} value={2024 - i}>
              {2024 - i}
            </option>
          ))}
        </select>

        <div className={styles.form__input_errors}>
          {errors.year && <span role="alert">{errors.year.message}</span>}
        </div>
      </div>
    </form>
  );
}

export default AgeForm;
