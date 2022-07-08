import { useContext } from 'react'
import { AuthContext } from '../context/auth.context'

const useAuth = () => {
  const value = useContext(AuthContext)

  if (!value) {
    throw new Error('Auth Context value is undefined')
  }

  return value
}

export {
  useAuth
}