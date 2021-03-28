import styles from './PlusButton.module.css'
import { useEffect, useState } from "react"
import { Button } from "../Button/Button"

export const PlusButton = () => {
  const [show, setShow] = useState(false)
  const toggleShow = () => setShow(!show)

  useEffect(() => {
    console.log(show)
  })
  return (
    <>
        <Button
          onClick={
            (event) => {
              event.preventDefault()
              toggleShow()
            }
          }
        >+</Button>
      <input
        className={`${styles.hiddenInput} ${!show ? styles.hide : ''}`}
        type='text'
        placeholder='Add tag'
      />
    </>
  )
}
