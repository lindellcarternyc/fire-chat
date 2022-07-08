import { Link, useParams } from 'react-router-dom'

import { chatRooms } from '../../data/chat-rooms'
import { useAuth } from '../../hooks/use-auth'
import { sendMessage } from '../../services/firebase.service'

import ButtonInput from '../button-input'
import MessageList from '../message-list'

import classes from './chat-room.module.css'

const ChatRoom = () => {
  const user = useAuth().user!
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
        <ButtonInput 
          input={{
            placeholder: 'Enter a message'
          }}
          submit={{
            text: 'Send',
            handler: (text) => {
              sendMessage(room.id, user, text)
            }
          }}
        />
      </div>
    </>
  )
}

export default ChatRoom