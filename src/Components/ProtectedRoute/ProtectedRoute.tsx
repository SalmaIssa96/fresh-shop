import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../Context/UserContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { userToken } = useUserContext();
  const token = localStorage.getItem('userToken');

  if (!userToken && !token) {
    return <Navigate to="/login" />;
  } else {
    return <>{children}</>;
  }
};

export default ProtectedRoute;
