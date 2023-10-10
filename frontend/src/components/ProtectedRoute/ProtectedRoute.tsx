import { FC, JSXElementConstructor, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { selectUser } from '../../services/redux/slices/user/user';
import { useAppSelector } from '../../utils/reduxHooks';

interface IProtectedRoute {
  children: ReactElement<string | JSXElementConstructor<unknown>> | null;
}

const ProtectedRoute: FC<IProtectedRoute> = ({ children }) => {
  const user = useAppSelector(selectUser);
  return user.token ? children : <Navigate to='/signin' />;
};

export default ProtectedRoute;
