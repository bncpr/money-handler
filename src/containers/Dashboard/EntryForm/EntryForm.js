import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '../../../components/UI/Button/Button'
import { CheckboxItem } from '../../../components/UI/Form/Checkbox/CheckboxItem'
import styles from './EntryForm.module.css'
import { changeValue, tickSubcategoryValue, submitEntry } from '../../../store/actions/entry'
import { Input } from '../../../components/UI/Form/Input/Input'
import { RadioInput } from '../../../components/UI/Form/RadioInput/RadioInput'
import { CheckboxWrapper } from '../../../components/UI/Form/Checkbox/CheckboxWrapper'

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

      <Input
        className={styles.formDiv}
        type={'date'}
        text='Date:'
        name='date'
        value={entry.date}
        onChange={(event) => onChangeHandler('date', event.target.value)}
      />

      <Input
        className={styles.formDiv}
        type={'number'}
        text='Value:'
        name='value'
        value={entry.value}
        placeholder='Enter value'
        onChange={(event) => onChangeHandler('value', event.target.value)}
      />

      <RadioInput
        className={styles.formDiv}
        selected={entry.payer}
        text='Paid:'
        onChange={onChangeHandler}
        buttonsList={[
          { text: 'ben', name: 'payer', value: 'ben', key: 'ben' },
          { text: 'ella', name: 'payer', value: 'ella', key: 'ella' }]}
      />

      <Input
        className={styles.formDiv}
        type={'text'}
        text='Category:'
        name='category'
        value={entry.category}
        placeholder='Enter category'
        onChange={(event) => onChangeHandler(event.target.name, event.target.value)}
      />

      <CheckboxWrapper className={styles.formDiv} text='Subcategories:'>
        {subs.map(
          sub => <CheckboxItem
            key={sub}
            name={sub}
            onTick={onCheckHandler}
            text={sub}
            checked={entry.subcategories[sub]}
          />)}
      </CheckboxWrapper>

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