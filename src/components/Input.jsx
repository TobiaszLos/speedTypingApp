const Input = ({
  type = 'text',
  name,
  value,
  onChange,
  className,
  onKeyDown,
  placeholder,
  disabled,
  label,
  ...props
}) => {

  return (

    <div className="flex flex-col">
      {label && <label>{label}</label>}
      <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} className={className} onKeyDown={onKeyDown} disabled={disabled} {...props} />
    </div >
  )
}

export default Input