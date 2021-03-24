import { useState, useEffect } from 'react'
import { Button } from '../../../components/UI/Button/Button'
import { Checkbox } from '../../../components/UI/Form/Checkbox/Checkbox'
import styles from './EntryForm.module.css'
import axios from '../../../axios'
import { InputGroup } from '../../../components/UI/Form/InputGroup/InputGroup'
import { RadioButton } from '../../../components/UI/Form/RadioButton/RadioButton'
import { RadioGroup } from '../../../components/UI/Form/RadioGroup/RadioGroup'

const reducer = (state, action) => {
  switch (action.type) {
    case ''
  }
}

export const EntryForm = ({ subs }) => {

  const [showForm, setShowForm] = useState(false);
  const onShowForm = () => setShowForm(!showForm)

  const [state, setState] = useState({
    date: '',
    payer: 'ben',
    value: '',
    category: '',
    subcategories: null
  })

  useEffect(() => {
    console.log(subs);
    const subcategories = {};
    subs.forEach(sub => { subcategories[sub] = false })
    setState({ ...state, subcategories: { ...subcategories } })
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

  const onSelectHandler = (name) => {
    setState({
      ...state,
      payer: name
    })
  }

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

      <RadioGroup onChange={onSelectHandler} selected={state.payer}>
        <RadioButton text='Ben' name='ben' />
        <RadioButton text='Ella' name='ella' />
      </RadioGroup>

      <label>Category:</label>
      <input
        type='text'
        name='category'
        placeholder='Enter category'
        value={state.category}
        onChange={onChangeHandler} />

      <label>Subcategories:</label>
      <InputGroup>
        {subs.map(
          sub => <Checkbox name={sub} onChange={onPickHandler} labelText={sub} />
        )}
      </InputGroup>

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