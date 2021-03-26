import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '../../../components/UI/Button/Button'
import { Checkbox } from '../../../components/UI/Form/Checkbox/Checkbox'
import styles from './EntryForm.module.css'
import axios from '../../../axios'
import { InputGroup } from '../../../components/UI/Form/InputGroup/InputGroup'
import { RadioButton } from '../../../components/UI/Form/RadioButton/RadioButton'
import { RadioGroup } from '../../../components/UI/Form/RadioGroup/RadioGroup'
import { changeValue, tickSubcategoryValue, submitEntry } from '../../../store/actions/entry'

export const EntryForm = () => {

  const [showForm, setShowForm] = useState(false);
  const onShowForm = () => setShowForm(!showForm)

  const subs = useSelector(state => state.data.subs)
  const entry = useSelector(state => state.entry)
  const dispatch = useDispatch()
  const onChangeHandler = (name, value) => dispatch(changeValue(name, value))
  const onCheckHandler = (name, checked) => dispatch(tickSubcategoryValue(name, checked))
  const onSubmitHandler = (entry) => dispatch(submitEntry(entry))

  const form = (
    <form className={!showForm ? styles.hide : ''}>

        <div className={styles.formDiv}>
          <label>Date:</label>
          <input
            type='date'
            name='date'
            value={entry.date}
            onChange={(event) => onChangeHandler('date', event.target.value)} />
        </div>

        <div className={styles.formDiv}>
          <label>Value:</label>
          <input
            type='number'
            name='value'
            value={entry.value}
            placeholder='Enter value'
            onChange={(event) => onChangeHandler('value', event.target.value)} />
        </div>

        <div className={styles.formDiv}>
          <label>Paid:</label>
          <RadioGroup onChange={onChangeHandler} selected={entry.payer}>
            <RadioButton text='Ben' name='payer' value='ben' key='ben'/>
            <RadioButton text='Ella' name='payer' value='ella' key='ella'/>
          </RadioGroup>
        </div>

        <div className={styles.formDiv}>
          <label>Category:</label>
          <input
            type='text'
            name='category'
            placeholder='Enter category'
            value={entry.category}
            onChange={(event) => onChangeHandler(event.target.name, event.target.value)} />
        </div>

        <div className={styles.formDiv}>
          <label>subcategories:</label>
          <InputGroup className={styles.choices}>
            {subs.map(
              sub => <Checkbox
                key={sub}
                name={sub}
                onTick={onCheckHandler}
                text={sub}
                checked={entry.subcategories[sub]} />)}
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
        onClick={() => onSubmitHandler(entry)}>
        Submit
      </Button>
    </div>
  )
}