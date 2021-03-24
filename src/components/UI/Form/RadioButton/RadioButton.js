import './RadioButton.css'
import { useState } from 'react'

export const RadioButton = ({ text, onChange, name, selected }) => {
  return (
    <div
      className={`radioButton ${name === selected ? 'selected' : ''}`}
      name={name}
      onClick={() => onChange(name)}>
      {text}
    </div>
  )
}