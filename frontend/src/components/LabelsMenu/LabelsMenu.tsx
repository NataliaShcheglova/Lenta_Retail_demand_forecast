import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeSelected } from '../../services/redux/slices/filter/filter'
import { RootState } from '../../services/redux/store';
import cross from '../../images/cross.svg';
import more from '../../images/more.svg';

import styles from './LabelsMenu.module.scss';

const BubblesBox: React.FC = () => {
  const { selectedCities, selectedVenues, selectedGroups, selectedCategories, selectedSubcategories, selectedSku } = useSelector(
    (state: RootState) => state.filter
  ); 
  const labels = [
    ...selectedCities, 
    ...selectedVenues, 
    ...selectedGroups,
    ...selectedCategories,
    ...selectedSubcategories,
    ...selectedSku]; 

  console.log(labels.slice(0, 6));
  console.log(labels.slice(6));
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = (item: string) => {
    dispatch(removeSelected(item));
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  React.useEffect(() => {
    const closeEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowModal(false);
      }
    }
    document.addEventListener('keydown', closeEsc);   

    return () => {
      document.removeEventListener('keydown', closeEsc);
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.labels}>
      {labels.length <= 6 && labels.map((label, index) => (
        <button type='button' key={index} className={styles.label} onClick={() => handleDelete(label)}>
          <span className={styles.text}>{label}</span>
          <img className={styles.deleteImg} src={cross} alt='Удалить' />
        </button>
      ))}
      {labels.length > 6 && labels.slice(0,6).map((label, index) => (
        <button type='button' key={index} className={styles.label} onClick={() => handleDelete(label)}>
          <span className={styles.text}>{label}</span>
          <img className={styles.deleteImg} src={cross} alt='Удалить' />
        </button>
      ))}
      </div>
      {labels.length > 6 && <button className={styles.more} onClick={toggleModal}>
        <img className={styles.moreImg} src={more} alt='Развернуть' />
      </button>}
      {labels.length > 0 && showModal && (
        <div className={styles.box}>
          {labels.slice(6).map((label, index) => (
            <button type='button' key={index} className={styles.label} onClick={() => handleDelete(label)}>
              <span className={styles.text}>{label}</span>
              <img className={styles.deleteImg} src={cross} alt='Удалить' />
            </button>
          ))}  
        </div>
      )}
    </div>
  );
};

export default BubblesBox;
