import { useState, useEffect, useReducer } from 'react'
import { Button } from '../../../components/UI/Button/Button'
import { Checkbox } from '../../../components/UI/Form/Checkbox/Checkbox'
import styles from './EntryForm.module.css'
import axios from '../../../axios'
import { InputGroup } from '../../../components/UI/Form/InputGroup/InputGroup'
import { RadioButton } from '../../../components/UI/Form/RadioButton/RadioButton'
import { RadioGroup } from '../../../components/UI/Form/RadioGroup/RadioGroup'
import { updateObj } from '../../../utility/utility'

const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_VALUE':
      return updateObj(state, { [action.name]: action.value })
    case 'TICK_SUBCATEGORY_VALUE':
      return updateObj(state, { 'subcategories': updateObj(state.subcategories, { [action.name]: (!action.checked) }) })
    default: return state
  }
}

export const EntryForm = ({ subs }) => {

  const [showForm, setShowForm] = useState(false);
  const onShowForm = () => setShowForm(!showForm)

  const [state, dispatch] = useReducer(reducer, {
    date: '',
    payer: 'ben',
    value: '',
    category: '',
    subcategories: null
  })

  const onChangeHandler = (name, value) => {
    dispatch({ type: 'CHANGE_VALUE', name, value })
  }

  const onCheckHandler = (name, checked) => {
    dispatch({ type: 'TICK_SUBCATEGORY_VALUE', name, checked })
  }

  useEffect(() => {
    const subcategories = {};
    subs.forEach(sub => { subcategories[sub] = false })
    onChangeHandler('subcategories', subcategories)
  }, [subs])

  useEffect(() => {
    console.log('[useEffect]', state)
  })

  const onSubmitEntry = (event) => {
    event.preventDefault()
    const newState = { ...state }
    const subs = [];
    Object.keys(newState['subcategories'])
      .map(key => {
        if (newState['subcategories'][key]) subs.push(key)
      })
    newState['subcategories'] = subs
    axios.post('entries/entries.json', newState)
      .then(res => {
        alert('submit')
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const form = (
    <form onSubmit={onSubmitEntry} className={!showForm ? styles.hide : ''}>

        <div className={styles.formDiv}>
          <label>Date:</label>
          <input
            type='date'
            name='date'
            value={state.date}
            onChange={(event) => onChangeHandler('date', event.target.value)} />
        </div>

        <div className={styles.formDiv}>
          <label>Value:</label>
          <input
            type='number'
            name='value'
            value={state.value}
            placeholder='Enter value'
            onChange={(event) => onChangeHandler('value', event.target.value)} />
        </div>

        <div className={styles.formDiv}>
          <label>Paid:</label>
          <RadioGroup onChange={onChangeHandler} selected={state.payer}>
            <RadioButton text='Ben' name='payer' value='ben' />
            <RadioButton text='Ella' name='payer' value='ella' />
          </RadioGroup>
        </div>

        <div className={styles.formDiv}>
          <label>Category:</label>
          <input
            type='text'
            name='category'
            placeholder='Enter category'
            value={state.category}
            onChange={(event) => onChangeHandler(event.target.name, event.target.value)} />
        </div>

        <div className={styles.formDiv}>
          <label>subcategories:</label>
          <InputGroup className={styles.choices}>
            {subs.map(
              sub => <Checkbox
                name={sub}
                onTick={onCheckHandler}
                text={sub}
                checked={state.subcategories[sub]} />)}
          </InputGroup>
        </div>

    </form>
  )
  return (
    <div className={styles.entryForm}>
      {form}
      <Button onClick={onShowForm}>
        {showForm ? 'Cancel' : 'Add'}
      </Button>
      <Button
        className={showForm ? '' : styles.hide}
        onClick={onSubmitEntry}>
        Submit
      </Button>
    </div>
  )
}