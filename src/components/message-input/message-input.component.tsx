import { ChangeEvent, FormEvent, useState } from 'react'
import { useAuth } from '../../hooks/use-auth'
import { sendMessage } from '../../services/firebase.service'
import classes from './message-input.module.css'

interface MessageInputProps {
  roomId: string
}

const MessageInput = ({ roomId }: MessageInputProps) => {
  const user = useAuth().user!
  const [value, setValue] = useState('')

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value)
  }

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault()
    sendMessage(roomId, user, value)
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit} className={classes['message-input-container']}>
      <input type='text' 
        placeholder='Enter a message'
        value={value}
        onChange={handleChange}
        className={classes['message-input']}
        required
        minLength={1}
      />
      <button type='submit' disabled={value.length < 1} className={classes['send-message']}>
        Send
      </button>
    </form>
  )
}

export default MessageInput