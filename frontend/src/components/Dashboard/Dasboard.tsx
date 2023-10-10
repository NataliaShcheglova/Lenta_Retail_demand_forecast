import { FC } from 'react';
import styles from './Dasboard.module.scss';

import welcome from '../../images/welcome.png';
import Filter from '../Filter/Filter';

export const Dashboard: FC = () => {
  return (
    <main className={styles.dashboard}>
      <Filter />
      <div className={styles.container}>
        <img
          className={styles.image}
          src={welcome}
          alt='Добро пожаловать'
        />
        <p className={styles.title}>Добро пожаловать в приложение прогнозирования спроса на товары собственного производства компании Лента!</p>
        <p className={styles.text}>
          Для построения прогноза выберите интересующий ТК или группу ТК, а также группы, категории и конкретные товары в фильтрах в левой части
          экрана. После выбора нажмите кнопку “Применить фильтр” для построения прогноза.
        </p>
        <p className={styles.text}>
          У вас есть есть возможность сохранять выбранные фильтры с помощью кнопки внизу меню с фильтрами. Воспользоваться ими можно в верхней панели
          приложения.
        </p>
        <p className={styles.text}>Для сброса фильтров нажмите “Сбросить”.</p>
      </div>
    </main>
  );
};
