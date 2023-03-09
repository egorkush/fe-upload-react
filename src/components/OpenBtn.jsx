const OpenBtn = () => {
  const triggerInput = () => {
    const input = document.getElementById('file')
    input.click()
  }

  return (
    <button
      className='btn'
      onClick={triggerInput}
    >
      Open
    </button>
  )
}

export default OpenBtn