import css from '@/components/Loading/Loading.module.css';
import { BarLoader } from 'react-spinners';

export default function Loading() {
  return (
    <div className={css.loaderWrapper}>
      <BarLoader color="#555" speedMultiplier={0.6} />
    </div>
  );
}