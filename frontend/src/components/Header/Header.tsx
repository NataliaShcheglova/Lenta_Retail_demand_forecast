import { FC } from 'react';
import styles from './Header.module.scss';
import logo from '../../images/logo.svg';
// import mockPerson from '../../images/person.jpeg';
import { useAppDispatch, useAppSelector } from '../../utils/reduxHooks';
import { selectUser, signOut } from '../../services/redux/slices/user/user';
import { useNavigate } from 'react-router-dom';

const Header: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);

  const handleSignOut = (): void => {
    dispatch(signOut());
    // dispatch(resetFilters());
    navigate('/signin');
  };

  return (
    <header className={styles.header}>
      <img
        className={styles.header__logo}
        src={logo}
        alt='Логотип Лента'
      />
      <div className={styles.header__container}>
        {user.token ? (
          <>
            <div className={styles.header__filter}>
              <div className={styles.header__filterIcon}></div>
              <p className={styles.header__filterText}>Cохранённые фильтры</p>
            </div>
            <div className={styles.header__user}>
              <img
                className={styles.header__userpic}
                src={user.photo}
                alt='Ваша фотография'
              />
              <p className={styles.header__username}>{user.name}</p>
            </div>
            <button
              className={styles.header__logout}
              onClick={handleSignOut}
              aria-label='logout'
            />
          </>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
