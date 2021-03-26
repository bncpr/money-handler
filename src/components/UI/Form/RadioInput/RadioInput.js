import { RadioButton } from "./RadioButton/RadioButton"
import { RadioGroup } from "./RadioGroup/RadioGroup"

export const RadioInput = ({ className, text, onChange, selected, buttonsList }) => {
  return (
    <div className={className}>
      <label>{text}</label>
      <RadioGroup onChange={onChange} selected={selected}>
        {buttonsList.map(props => <RadioButton {...props} />)}
      </RadioGroup>
    </div>
  )
}