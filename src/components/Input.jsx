const Input = ({ options, changeHandler }) => {
  return (
    <input
      type='file'
      id='file'
      onChange={changeHandler}
      multiple={options.multi}
      accept={options.accept}
    />
  )
}

export default Input