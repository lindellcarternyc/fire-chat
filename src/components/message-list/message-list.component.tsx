import { useLayoutEffect, useRef } from 'react'
import { useAuth } from '../../hooks/use-auth'
import { useMessages } from '../../hooks/use-messages'
import Message from './message'

import classes from './message-list.module.css'

interface MessageListProps {
  roomId: string
}

const MessageList = ({ roomId }: MessageListProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()
  const messages = useMessages(roomId)

  useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  })
  return (
    <div className={classes['message-list-container']} ref={containerRef}>
      <ul className={classes['message-list']}>
        {messages.map(m => {
          return (
            <Message 
              key={m.id}
              message={m}
              isOwnMessage={m.uid === user?.uid}
            />
          )
        })}
      </ul>
    </div>
  )
}

export default MessageList