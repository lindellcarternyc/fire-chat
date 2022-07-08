import { createContext, ReactNode, useState } from 'react'

import { loginWithGoogle } from '../services/firebase.service'

interface AuthContextValue {
  user: { 
    uid: string
    displayName: string | null
  } | null
  login(): Promise<void>
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  login: async () => { 
  }
})

interface AuthProviderProps {
  children: ReactNode | ReactNode[]
}

const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<{ uid: string; displayName: string | null} | null>(null)

  const login = async () => {
    const loggedInUser = await loginWithGoogle()

    if (!loggedInUser) {}

    setUser(loggedInUser)
  }

  const value = { user, login }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export {
  AuthContext,
  AuthProvider
}