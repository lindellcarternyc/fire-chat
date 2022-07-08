import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ChatRoom from './chat-room'
import Landing from './landing'


const AuthenticatedApp = () => {
  return (
    <Router>
      <Routes>
        <Route path='/room/:id' element={<ChatRoom />} />
        <Route path='/' element={<Landing />} />
      </Routes>
    </Router>
  )
}

export default AuthenticatedApp