import { FC } from 'react';

import styles from './Button.module.scss';

interface IButton {
  color: 'white' | 'blue' | 'bordered';
  icon: 'excel' | 'print' | 'delete' | 'chart' | undefined;
  text: string;
}

export const Button: FC<IButton> = ({ color, icon, text }) => {
  const buttonClass = `styles.${color}`;
  const textClass = `styles.button__${icon} styles.button__text_${color}`;
  const iconClass = `styles.button__icon_${icon} styles.button__icon_${color}`;

  return (
    <button className={`${styles.button} ${buttonClass}`}>
      <p className={`${styles.button__text} ${textClass}`}>{text}</p>
      {icon ? <div className={`${styles.button__icon} ${iconClass}`}></div> : null}
    </button>
  );
};
