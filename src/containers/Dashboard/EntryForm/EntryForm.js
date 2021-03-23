import { Fragment, useState, useEffect } from 'react'
import { Button } from '../../../components/UI/Button/Button'
import styles from './EntryForm.module.css'
import axios from '../../../axios'

const Checkbox = ({ labelText, onChange, name }) => {
  const [checked, setChecked] = useState(false)
  const onChecked = event => {
    setChecked(event.target.checked)
  }

  return (
    <div className={styles.checkBox} onChange={onChange}>
      <label>
        <input
          name={name}
          type='checkbox'
          checked={checked}
          onChange={onChecked} />
        <span className={
          checked
            ? styles.checked
            : styles.notChecked
        }>
          {labelText}</span>
      </label>
    </div>
  )
}

export const EntryForm = ({ subs }) => {
  
  const [showForm, setShowForm] = useState(false);
  const onShowForm = () => setShowForm(!showForm)
  
  const [state, setState] = useState({
    date: '',
    payer: '',
    value: '',
    category: '',
    subcategories: null
  })
  
  useEffect(() => {
    const subcategories = {};
    subs.forEach(sub => {subcategories[sub] = false})
    setState({...state, subcategories: {...subcategories}})
  }, [subs])

  const onChangeHandler = (event) => {
    const target = event.target
    setState({
      ...state,
      [target.name]: target.value
    })
  }

  const onPickHandler = (event) => {
    const target = event.target
    setState({
      ...state,
      subcategories: {
        ...state.subcategories,
        [target.name]: target.checked
      }
    })
  }

  const onSubmitEntry = (event) => {
    event.preventDefault()
    axios.post('entries/entry.json', state)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const form = (
    <form onSubmit={onSubmitEntry}>
      <label>Date:</label>
      <input
        type='date'
        name='date'
        value={state.date}
        onChange={onChangeHandler} />
      <label>Value:</label>
      <input
        type='number'
        name='value'
        value={state.value}
        placeholder='Enter value'
        onChange={onChangeHandler} />
      <label>Paid:</label>
      <select
        onChange={onChangeHandler}
        value={state.payer}
        name='payer'>
        <option value='ben'>Ben</option>
        <option value='ella'>Ella</option>
      </select>
      <label>Category:</label>
      <input
        type='text'
        name='category'
        placeholder='Enter category'
        value={state.category}
        onChange={onChangeHandler} />
      <label>subs:</label>
      <div className={styles.inputGroup}>
        {subs.map(
          sub => <Checkbox
            name={sub}
            onChange={onPickHandler}
            labelText={sub} />
        )}
      </div>
      <Button>Submit</Button>
    </form>
  )
  return (
    <div className={styles.entryForm}>
      {showForm ? form : null}
      <Button onClick={onShowForm}>{
        showForm ? 'Cancel' : 'Add'
      }</Button>
    </div>
  )
}