import { useEffect, useState } from 'react'
import { MessageDTO } from '../dtos/message.dtos'
import { getMessages } from '../services/firebase.service'

const useMessages = (roomId: string) => {
  const [messages, setMessages] = useState<MessageDTO[]>([])

  useEffect(() => {
    const unsubscribe = getMessages(roomId, setMessages)
    return unsubscribe
  }, [roomId])

  return messages
}

export {
  useMessages
}