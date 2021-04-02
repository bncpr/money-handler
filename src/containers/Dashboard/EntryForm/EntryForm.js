import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '../../../components/UI/Button/Button'
import { CheckboxItem } from '../../../components/UI/Form/CheckboxItem/CheckboxItem'
import styles from './EntryForm.module.css'
import { changeValue, tickTagValue } from '../../../store/entrySlice'
import { addTag, submitEntryThunk } from '../../../store/dataSlice'
import { RadioButton } from '../../../components/UI/Form/RadioButton/RadioButton'
import { resetTagState, resetTagValue, setTagValue, toggleShowValue } from '../../../store/tagSlice'


export const EntryForm = () => {

  const [showForm, setShowForm] = useState(false);
  const onShowForm = () => setShowForm(!showForm)

  const { categories, subs } = useSelector(state => state.data)
  
  const dispatch = useDispatch()

  const entry = useSelector(state => state.entry)
  const onChangeHandler = (name, value) => dispatch(changeValue({ name, value }))
  const onCheckHandler = (name, checked) => dispatch(tickTagValue({ name, checked }))
  const onSubmitHandler = (entry) => dispatch(submitEntryThunk(entry))

  const { showTag, tagValue } = useSelector(state => state.tag)
  
  const onShowTag = (event, name) => {
    event.preventDefault()
    dispatch(resetTagValue)
    dispatch(toggleShowValue(name))
  }
  const onChangeTagValue = (event) => { dispatch(setTagValue(event.target.value)) }
  
  const onKeyDown = (event, name, value) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      dispatch(addTag({ name, value }))
      dispatch(resetTagState())
    } else if (event.key === 'Escape') {
      dispatch(resetTagState())
    }
  }

  return (
    <div className={styles.entryForm}>

      <form className={!showForm ? styles.hide : ''}>

        <div className={styles.formDiv}>
          <label>Date:</label>
          <input
            className={styles.entryFormInput}
            type='date' name='date' value={entry.date}
            onChange={(event) => onChangeHandler('date', event.target.value)}
          />
        </div>

        <div className={styles.formDiv}>
          <label>Value:</label>
          <input
            className={styles.entryFormInput}
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
            {showTag === 'payer' ? <input autoFocus className={styles.hiddenInput} /> : null}
          </div>
          <Button onClick={(event) => onShowTag(event, 'payer')}>+</Button>
        </div>

        <div className={styles.formDiv}>
          <label>Category:</label>
          <div className={styles.inputGroup}>
            {categories.map(category => (
              <RadioButton
                key={category}
                text={category} name='category' value={category}
                selected={entry.category}
                onChange={onChangeHandler}
              />))}
            {showTag === 'category'
              ?
              <div className={styles.hiddenBox}>
                <input
                  autoFocus
                  className={styles.hiddenInput}
                  value={tagValue}
                  onChange={onChangeTagValue}
                  onKeyDown={event => onKeyDown(event, 'categories', tagValue)}
                />
                <span>Press enter to add.</span>
              </div>
              : null}
          </div>
          <Button onClick={(event) => onShowTag(event, 'category')}>+</Button>
        </div>

        <div className={`${styles.formDiv} ${styles.grid2}`}>
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
            {showTag === 'tag'
              ?
              <div className={styles.hiddenBox}>
                <input
                  autoFocus
                  className={styles.hiddenInput}
                  value={tagValue}
                  onChange={onChangeTagValue}
                  onKeyDown={event => onKeyDown(event, 'subs', tagValue)}
                />
                <span>Press enter to add.</span>
              </div>
              : null}
          </div>
          <Button onClick={(event) => onShowTag(event, 'tag')}>+</Button>
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