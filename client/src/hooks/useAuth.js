import { useSelector } from 'react-redux'

export const useAuth = () => {
  const { user } = useSelector((state) => state.auth)
  
  return {
    isAuthenticated: !!user,
    user,
    isAdmin: user?.role === 'admin',
  }
}