
export const Input = ({ type, className, text, name, value, onChange, placeholder }) => {
  return (
    <div className={className}>
      <label>{text}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  )
}