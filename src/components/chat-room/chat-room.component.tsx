import { Link, useParams } from 'react-router-dom'
import { chatRooms } from '../../data/chat-rooms'
import MessageInput from '../message-input'
import MessageList from '../message-list'
import classes from './chat-room.module.css'

const ChatRoom = () => {
  const { id } = useParams<{ id: string }>()
  const room = chatRooms.find(x => x.id === id)

  if (!room) {
    return (
      <>
        <h2>That Room doesn't Exist</h2>
        <div>
          <Link to='/'>
            ⬅️ Back to all rooms
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <h2>{room.title}</h2>
      <div>
        <Link to='/'>
          ⬅️ Back to all rooms
        </Link>
      </div>
      <div className={classes['messages-container']}>
        <MessageList roomId={room.id} />
        <MessageInput roomId={room.id} />
      </div>
    </>
  )
}

export default ChatRoom