import { useRef, FC } from 'react';
import styles from './ForecastPage.module.scss';
import { Link } from 'react-router-dom';
import ForecastTable from '../../components/Table/Table';
import LabelsMenu from '../../components/LabelsMenu/LabelsMenu';
import Filter from '../../components/Filter/Filter';
import { useReactToPrint } from 'react-to-print';
import { exportToExcel } from '../../utils/utils';
import { forecastDataMany } from '../../utils/forecast_archive';

const ForecastPage: FC = () => {
  const tableRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
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
      className={styles.forecast}>
      <Filter />
      <div className={styles.container}>
        <LabelsMenu />
        <div className={styles.controls}>
          <div className={styles.switch}>
            <h1 className={styles.title}>Прогноз на 14 дней</h1>
            <button className={styles.statistics}>Статистика прогнозов</button>
          </div>
          <div className={styles.buttons}>
            <Link
              className={`${styles.button} ${styles.button_chart}`}
              to={'chart'}>
              <p className={`${styles.button__text} ${styles.button__text_chart}`}>Построить график</p>
              <div className={`${styles.button__icon} ${styles.button__icon_chart}`}></div>
            </Link>
            <button
              className={`${styles.button} ${styles.button_print}`}
              onClick={handlePrint}>
              <p className={`${styles.button__text} ${styles.button__text_print}`}>Напечатать</p>
              <div className={`${styles.button__icon} ${styles.button__icon_print}`}></div>
            </button>
            <button
              className={`${styles.button} ${styles.button_excel}`}
              onClick={() => exportToExcel(forecastDataMany)}>
              <p className={`${styles.button__text} ${styles.button__text_excel}`}>Выгрузить в Excel</p>
              <div className={`${styles.button__icon} ${styles.button__icon_excel}`}></div>
            </button>
          </div>
        </div>
        <div ref={tableRef}>
          <ForecastTable data={forecastDataMany} />
        </div>
      </div>
    </main>
  );
};
export default ForecastPage;
