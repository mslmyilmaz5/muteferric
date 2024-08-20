import { useAuthContext } from './useAuthContext'
import BASE_URL from '../utils/url'
import { useNavigate } from 'react-router-dom';

export const useLogOut = () => {
  const { dispatch } = useAuthContext()
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await fetch(`${BASE_URL}/auth/logout`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      localStorage.removeItem('user');
      dispatch({ type: 'LOGOUT' });
      navigate("/")

    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return { logout };
}