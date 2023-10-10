import { FC } from 'react';
import styles from '../NotFoundPage/NotFoundPage.module.scss';

import exportError from '../../images/exportError.png';
import Filter from '../../components/Filter/Filter';
import SendBackButton from '../../components/SendBackButton/SendBackButton';

export const ExportErrorPage: FC = () => {
  return (
    <main className={styles.wrapper}>
      <Filter />
      <div className={styles.container}>
        <img className={styles.image} src={exportError} alt='Ошибка выгрузки файла'/>
        <SendBackButton />
        <p className={styles.title}>
          Упс! Не удалось экспортировать выбранный прогноз
        </p>
        <p className={styles.text}>
          Возможно у вас недостаточно прав доступа к папке для 
          выгрузки файла. Убедитесь, что у вас есть права на чтение 
          и запись в эту папку и повторите попытку экспорта.
        </p>
      </div>
    </main>
  );
};

export default ExportErrorPage;
