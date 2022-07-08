import AuthenticatedApp from './components/authenticated-app'
import UnauthenticatedApp from './components/unauthenticated-app'

import './App.css'

import { useAuth } from './hooks/use-auth'

const App = () => {
  const { user } = useAuth()

  return (
    <div className='container'>
      <h1>💬 Chat Room</h1>
      {user
        ? (
          <AuthenticatedApp />
        ) : (
          <UnauthenticatedApp />
        )
      }
    </div>
  )
}

export default App