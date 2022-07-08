import classes from './message.module.css'

interface MessageProps {
  message: { 
    displayName: string
    text: string
  }
  isOwnMessage: boolean
}

const Message = ({ message, isOwnMessage }: MessageProps) => {
  const { displayName, text } = message

  return (
    <li className={[classes['message'], isOwnMessage ? classes['own-message'] : ''].join(' ')}>
      <h4 className={classes['sender']}>
        {isOwnMessage ? 'You' : displayName }
      </h4>
      <div>{text}</div>
    </li>
  )
}

export default Message