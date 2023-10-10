import { FC } from 'react';
import styles from '../NotFoundPage/NotFoundPage.module.scss';

import print from '../../images/printError.png';
import Filter from '../../components/Filter/Filter';
import SendBackButton from '../../components/SendBackButton/SendBackButton';

export const PrintErrorPage: FC = () => {
  return (
    <main className={styles.wrapper}>
      <Filter />
      <div className={styles.container}>
        <img className={styles.image} src={print} alt='Ошибка при печати'/>
        <SendBackButton />
        <p className={styles.title}>
          Упс! Не удалось вывести файл на печать
        </p>
        <p className={styles.text}>
          Извините, произошла ошибка при печати. Пожалуйста, 
          проверьте подключение принтера, наличие бумаги, а также 
          состояние чернильных или тонерных картриджей.
        </p>
      </div>
    </main>
  );
};

export default PrintErrorPage;
