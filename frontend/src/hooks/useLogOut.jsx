import { useAuthContext } from './useAuthContext'
import BASE_URL from '../utils/url'
export const useLogOut = () => {
  const { dispatch } = useAuthContext()

  const logout = async () => {
    try {
      await fetch(`${BASE_URL}/auth/logout`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      localStorage.removeItem('user');
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return { logout };
}