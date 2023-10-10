import { useState, useEffect } from 'react';
import styles from './SignInPage.module.scss';

import eye_opened from '../../images/eye_opened.svg';
import { useAppDispatch } from '../../utils/reduxHooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { setUser, signInUser } from '../../services/redux/slices/user/user';
import { useNavigate } from 'react-router-dom';

interface ISignInFields {
  login: string;
  password: string;
}

export default function SignInPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
    getValues,
  } = useForm<ISignInFields>({ mode: 'onChange' });

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  useEffect(() => {
    setIsPasswordHidden(true);
  }, []);

  function togglePassword() {
    setIsPasswordHidden(!isPasswordHidden);
  }

  const onSubmit: SubmitHandler<ISignInFields> = () => {
    // const formValues = getValues();

    // dispatch(signInUser(formValues))
    //   .unwrap()
    //   .then((res) => {
    //     console.log(res);
    //     navigate('/');
    //   })
    //   .catch((err) => console.log(err));

    // пока не подключено апи
    dispatch(
      setUser({
        name: getValues('login'),
        login: getValues('login'),
        token: '123qwe',
        photo:
          'https://sun9-north.userapi.com/sun9-78/s/v1/ig2/nqtA2B6RTvn847GOO7O7SukmarJ7cp966DVid-AqjZ_5p7tpwHUNucjRDay43XWfGvfRPmOdfvj9se_nTc6bR1wI.jpg?size=512x512&quality=95&type=album',
      })
    );
    navigate('/');
  };

  return (
    <main
      id='sign-in'
      className={styles.signIn}>
      <h1 className={styles.signIn__title}>Для входа введите логин и пароль</h1>
      <form
        className={styles.signIn__form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate>
        <input
          className={styles.signIn__input}
          type='text'
          placeholder='Введите логин'
          // error={errors?.login?.message}
          maxLength={30}
          {...register('login', {
            required: {
              value: true,
              message: 'Логин – обязательное поле',
            },
            minLength: {
              value: 6,
              message: 'Логин слишком короткий',
            },
          })}
        />
        <div className={styles.signIn__container}>
          <input
            className={styles.signIn__input}
            type={isPasswordHidden ? 'password' : 'text'}
            placeholder='Введите пароль'
            // showPasswordButton={true}
            // validation={{ ...register('password', PASSWORD_VALIDATION_CONFIG) }}
            // error={errors?.password?.message}
            maxLength={30}
            {...register('password', {
              required: {
                value: true,
                message: 'Пароль – обязательное поле',
              },
              minLength: {
                value: 8,
                message: 'Пароль слишком короткий',
              },
            })}
          />
          {/* <span className={styles.signIn__error}>Неверное имя и/или пароль</span> */}
          <span className={styles.signIn__error}>{errors?.login?.message || errors?.password?.message}</span>

          <button
            className={styles.signIn__showPassword}
            type='button'
            onClick={togglePassword}
            aria-label='show password'
            style={isPasswordHidden ? undefined : { backgroundImage: `url(${eye_opened})` }}
          />
        </div>
        <button
          className={styles.signIn__button}
          type='submit'
          disabled={!isDirty || !isValid}>
          Войти
        </button>
      </form>
    </main>
  );
}
