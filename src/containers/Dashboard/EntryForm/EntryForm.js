import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '../../../components/UI/Button/Button'
import { CheckboxItem } from '../../../components/UI/Form/Checkbox/CheckboxItem'
import styles from './EntryForm.module.css'
import { changeValue, tickSubcategoryValue, submitEntry } from '../../../store/actions/entry'
import { Input } from '../../../components/UI/Form/Input/Input'
import { RadioInput } from '../../../components/UI/Form/RadioInput/RadioInput'
import { CheckboxWrapper } from '../../../components/UI/Form/Checkbox/CheckboxWrapper'
import { getEntryFormData } from '../../../store/actions/data'
import { RadioGroup } from '../../../components/UI/Form/RadioInput/RadioGroup/RadioGroup'
import { RadioButton } from '../../../components/UI/Form/RadioInput/RadioButton/RadioButton'

export const EntryForm = () => {

  const [showForm, setShowForm] = useState(false);
  const onShowForm = () => setShowForm(!showForm)

  const dispatch = useDispatch()
  const didReqEntryFormData = useSelector(state => state.data.didReqEntryFormData)
  useEffect(() => {
    if (!didReqEntryFormData) { dispatch(getEntryFormData()) }
  }, [didReqEntryFormData])

  const categories = useSelector(state => state.data.categories)
  const subs = useSelector(state => state.data.subs)
  const entry = useSelector(state => state.entry)
  const onChangeHandler = (name, value) => dispatch(changeValue(name, value))
  const onCheckHandler = (name, checked) => dispatch(tickSubcategoryValue(name, checked))
  const onSubmitHandler = (entry) => dispatch(submitEntry(entry))

  return (
    <div className={styles.entryForm}>

      <form className={!showForm ? styles.hide : ''}>

        <div className={styles.formDiv}>
          <label>Date:</label>
          <input
            type='date' name='date' value={entry.date}
            onChange={(event) => onChangeHandler('date', event.target.value)}
          />
        </div>

        <div className={styles.formDiv}>
          <label>Value:</label>
          <input
            type='number' name='value' value={entry.value}
            placeholder='Enter value'
            onChange={(event) => onChangeHandler('value', event.target.value)}
          />
        </div>

        <div className={styles.formDiv}>
          <label>Paid:</label>
          <div className={styles.inputGroup}>
            <RadioButton text='ben' name='payer' value='ben' selected={entry.payer} onChange={onChangeHandler} />
            <RadioButton text='ella' name='payer' value='ella' selected={entry.payer} onChange={onChangeHandler} />
          </div>
        </div>

        <div className={styles.formDiv}>
          <label>Category:</label>
          <div className={styles.inputGroup}>
            {categories.map(category => (
              <RadioButton
                text={category} name='category' value={category}
                selected={entry.category}
                onChange={onChangeHandler}
              />))}
          </div>
        </div>

        <div className={styles.formDiv}>
          <label>Tags:</label>
          <div className={styles.inputGroup}>
            {subs.map(
              sub =>
                <CheckboxItem
                  key={sub}
                  name={sub}
                  onTick={onCheckHandler}
                  text={sub}
                  checked={entry.subcategories[sub]}
                />)}
          </div>
        </div>

      </form>

      <Button onClick={onShowForm}>
        {showForm ? 'Hide' : 'Add'}
      </Button>
      <Button
        className={showForm ? '' : styles.hide}
        onClick={() => onSubmitHandler(entry)}>
        Submit
      </Button>

    </div>
  )
}