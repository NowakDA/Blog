import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@app/store';
import { JSX } from 'react/jsx-runtime';

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute = ({ element }: PrivateRouteProps) => {
  const isAuth = useSelector((state: RootState) => state.user.isAuthenticated);

  return isAuth ? element : <Navigate to="/sign-in" replace />;
};

export default PrivateRoute;
