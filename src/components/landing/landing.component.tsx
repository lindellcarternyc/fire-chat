import { Link } from 'react-router-dom'
import { chatRooms } from '../../data/chat-rooms'
import classes from './landing.module.css'

const Landing = () => {
  return (
    <>
      <h2>Choose a Chat Room</h2>
      <ul className={classes['chat-room-list']}>
        {chatRooms.map(room => (
          <li key={room.id}>
            <Link to={`/room/${room.id}`}>
              {room.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Landing