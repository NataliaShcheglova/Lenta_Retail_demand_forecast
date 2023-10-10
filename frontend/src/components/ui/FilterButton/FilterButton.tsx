import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './FilterButton.module.scss';

interface IFilterButton {
  text: string;
}

const FilterButton: FC<IFilterButton> = ({ text }) => {
  return (
    <Link to='/forecast' className={styles.button}>
      <p className={styles.text}>{text}</p> 
    </Link>
  );
};

export default FilterButton;

