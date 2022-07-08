import { ChangeEvent, FormEvent, useState } from 'react'
import classes from './button-input.module.css'

interface ButtonInputProps {
  input: {
    placeholder: string
  }
  submit: {
    text: string
    handler(value: string): void
  }
}

const ButtonInput = ({ input, submit }: ButtonInputProps): JSX.Element => {
  const [value, setValue] = useState('')

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault()
    evt.stopPropagation()
    submit.handler(value)
    setValue('')
  }

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value)
  }
  
  return (
    <form onSubmit={handleSubmit} className={classes['input-container']}>
      <input
        type='text'
        placeholder={input.placeholder}
        onChange={handleChange}
        className={classes['input']}
        required
        minLength={1}
        value={value}
      />
      <button type='submit' disabled={value.length < 1} className={classes['submit']}>
        {submit.text}
      </button>
    </form>
  )
}

export default ButtonInput