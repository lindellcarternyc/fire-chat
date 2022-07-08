import { Link } from 'react-router-dom'

import { useRooms } from '../../hooks/use-rooms'
import { createRoom } from '../../services/firebase.service'

import ButtonInput from '../button-input'

import classes from './landing.module.css'

const Landing = () => {
  const rooms = useRooms()
  
  return (
    <>
      <h2>Choose a Chat Room</h2>
      <ButtonInput 
        input={{
          placeholder: 'Add a new room?'
        }}
        submit={{
          text: 'Add',
          handler: createRoom
        }}
      />
      <ul className={classes['chat-room-list']}>
        {rooms.map(room => (
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