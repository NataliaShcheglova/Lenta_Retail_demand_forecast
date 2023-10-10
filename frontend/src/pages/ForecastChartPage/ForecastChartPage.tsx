import { useRef } from 'react';
import styles from './ForecastChartPage.module.scss';
import LabelsMenu from '../../components/LabelsMenu/LabelsMenu';
import Filter from '../../components/Filter/Filter';
import ForecastChart from '../../components/ForecastChart/ForecastChart';
import { forecast } from '../../utils/forecast';
import SendBackButton from '../../components/SendBackButton/SendBackButton';
import { useReactToPrint } from 'react-to-print';

export default function ForecastPage() {
  const chartRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => chartRef.current,
    //   pageStyle: `
    //   @page {
    //     size: landscape;
    //     width: 100%;
    //   }
    // `,
  });
  return (
    <main
      id='forecast'
      className={styles.forecastChart}>
      <Filter />
      <div className={styles.container}>
        {forecast.data.length > 5 && <SendBackButton />}
        <LabelsMenu />
        <div className={styles.controls}>
          <div className={styles.buttons}>
            <button
              className={`${styles.button} ${styles.button_print}`}
              onClick={handlePrint}>
              <p className={`${styles.button__text} ${styles.button__text_print}`}>Напечатать</p>
              <div className={`${styles.button__icon} ${styles.button__icon_print}`}></div>
            </button>
          </div>
        </div>
        <div ref={chartRef}>
          <ForecastChart />
        </div>
      </div>
    </main>
  );
}
