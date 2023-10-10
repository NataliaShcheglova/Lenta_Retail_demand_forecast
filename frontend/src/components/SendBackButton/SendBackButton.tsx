import React from 'react';
import { useNavigate } from "react-router-dom";

import styles from './SendBackButton.module.scss';

const SendBackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <button className={styles.backButton} onClick={handleGoBack}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M10.5 7L5.5 12L10.5 17" stroke="#003D96" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18 12H6" stroke="#003D96" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Назад
    </button>
  );
};

export default SendBackButton;
