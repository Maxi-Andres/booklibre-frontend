import { Navigate } from "react-router"
import { getUser } from '@/context/AuthContext'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  //const user = localStorage.getItem('user');
  const user = getUser()
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};