import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '../../../components/UI/Button/Button'
import { CheckboxItem } from '../../../components/UI/Form/CheckboxItem/CheckboxItem'
import styles from './EntryForm.module.css'
import { changeValue, tickTagValue } from '../../../store/entrySlice'
import { addTag, submitEntryThunk } from '../../../store/dataSlice'
import { RadioButton } from '../../../components/UI/Form/RadioButton/RadioButton'
import { resetTagState, resetTagValue, setTagValue, toggleShowValue } from '../../../store/tagSlice'
import { InputItem } from '../../../components/Form/InputItem/InputItem'
import { ChoiceItem } from '../../../components/Form/ChoiceItem/ChoiceItem'


export const EntryForm = () => {

  const [showForm, setShowForm] = useState(false);
  const onShowForm = () => setShowForm(!showForm)

  const { categories, subs, payers } = useSelector(state => state.data)

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
    console.log(name, value)
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

        <InputItem
          text='Date:' name='date' type='date' value={entry.date}
          onChange={onChangeHandler}
        />

        <InputItem
          text='Value:' name='value' type='number' value={entry.value}
          onChange={onChangeHandler} placeholder='Enter value'
        />

        <ChoiceItem
          text='Paid:' name='payer' value={tagValue} onChange={onChangeTagValue}
          onKey={onKeyDown} onShow={onShowTag} stateValue={showTag}
        >
          {payers.map(payer => (
            <RadioButton
              key={payer}
              text={payer} name={'payer'} value={payer}
              selected={entry.payer}
              onChange={onChangeHandler}
            />
          ))}
        </ChoiceItem>

        <ChoiceItem
          text='Category:' name='category' value={tagValue} onChange={onChangeTagValue}
          onKey={onKeyDown} onShow={onShowTag} stateValue={showTag}
        >
          {categories.map(category => (
            <RadioButton
              key={category}
              text={category} name='category' value={category}
              selected={entry.category}
              onChange={onChangeHandler}
            />
          ))}
        </ChoiceItem>

        <ChoiceItem
          text='Tags:' name='tag' value={tagValue} onChange={onChangeTagValue}
          onKey={onKeyDown} onShow={onShowTag} stateValue={showTag} className={styles.grid2}
        >
          {subs.map(sub =>
            <CheckboxItem
              key={sub} name={sub}
              onTick={onCheckHandler} text={sub}
              checked={entry.subcategories[sub]}
            />
          )}
        </ChoiceItem>

        {/* <div className={`${styles.formDiv} ${styles.grid2}`}>
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
        </div> */}

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