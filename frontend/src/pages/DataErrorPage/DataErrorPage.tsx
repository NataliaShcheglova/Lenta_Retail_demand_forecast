import { FC } from 'react';
import styles from './DataErrorPage.module.scss';

import dataError from '../../images/dataError.png';
import Filter from '../../components/Filter/Filter';
import SendBackButton from '../../components/SendBackButton/SendBackButton';

export const DataErrorPage: FC = () => {
  return (
    <main className={styles.wrapper}>
      <Filter />
      <div className={styles.container}>
        <img className={styles.image} src={dataError} alt='Ошибка базы данных'/>
        <SendBackButton />
        <p className={styles.title}>
          Извините, произошла ошибка базы данных
        </p>
        <p className={styles.text}>
          {"Пожалуйста, повторите попытку позже или обратитесь в служубу поддержки "}
          <a className={styles.link} href="support@lenta.ru">support@lenta.ru</a>
        </p>
      </div>
    </main>
  );
};

export default DataErrorPage;
