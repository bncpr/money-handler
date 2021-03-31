import { useEffect, useReducer, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '../../../components/UI/Button/Button'
import { CheckboxItem } from '../../../components/UI/Form/CheckboxItem/CheckboxItem'
import styles from './EntryForm.module.css'
import { changeValue, tickSubcategoryValue, submitEntry } from '../../../store/actions/entry'
import { getEntryFormData, submitTag } from '../../../store/actions/data'
import { RadioButton } from '../../../components/UI/Form/RadioButton/RadioButton'
import { tagReducer, init } from './tagReducer'

export const EntryForm = () => {

  const [showForm, setShowForm] = useState(false);
  const onShowForm = () => setShowForm(!showForm)

  const dispatch = useDispatch()
  const didReqEntryFormData = useSelector(state => state.data.didReqEntryFormData)

  useEffect(() => {
    if (!didReqEntryFormData) { dispatch(getEntryFormData()) }
  })

  const categories = useSelector(state => state.data.categories)
  const subs = useSelector(state => state.data.subs)
  const entry = useSelector(state => state.entry)

  const onChangeHandler = (name, value) => dispatch(changeValue(name, value))
  const onCheckHandler = (name, checked) => dispatch(tickSubcategoryValue(name, checked))
  const onSubmitHandler = (entry) => dispatch(submitEntry(entry))
  const onAddTagHandler = (name, value) => dispatch(submitTag(name, value))

  const [tagState, tagDispatch] = useReducer(tagReducer, '', init)
  const { showTag, tagValue } = tagState

  const onShowTag = (event, name) => {
    event.preventDefault()
    tagDispatch({ type: 'RESET_TAG_VALUE' })
    tagDispatch({ type: 'TOGGLE_SHOW_TAG', payload: { name } })
  }
  
  const onChangeTagValue = (event) => {
    tagDispatch({ type: 'SET_TAG_VALUE', payload: { value: event.target.value } })
  }
  
  const onKeyDown = (event, name, value) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      onAddTagHandler(name, value)
      tagDispatch({ type: 'RESET' })
    } else if (event.key === 'Escape') {
      tagDispatch({ type: 'RESET' })
    }
  }

  useEffect(() => { console.log(tagValue) })

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