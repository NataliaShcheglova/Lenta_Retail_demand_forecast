import { FC } from 'react';
import styles from './NotFoundPage.module.scss';

import notFound from '../../images/notFoundError.png';
import Filter from '../../components/Filter/Filter';
import SendBackButton from '../../components/SendBackButton/SendBackButton';

export const NotFoundPage: FC = () => {
  return (
    <main className={styles.wrapper}>
      <Filter />
      <div className={styles.container}>
        <img className={styles.image} src={notFound} alt='Страница не найдена'/>
        <div className={styles.content}>
          <SendBackButton />
          <p className={styles.title}>
            404 Страница не найдена
          </p>
          <p className={styles.text}>
            Ошибка 404 означает, что запрашиваемый ресурс не найден на сервере. 
            Это может произойти, если вы ввели неправильный URL, ресурс был удален 
            или перемещен, или сервер временно недоступен.
          </p>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
