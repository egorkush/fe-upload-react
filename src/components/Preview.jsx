import { formatBytes } from './formatBytes'
const Preview = ({ files, removeFiles }) => {
  const removeHandler = event => {
    if (!event.target.dataset.name) {
      return
    }
    const { name } = event.target.dataset

    // const block = document.querySelector(`[data-name="${name}"]`).closest('.preview-image')
    // block.classList.add('removing')
    //
    // setTimeout(() => {
    //   block.remove()
    // }, 300)

    removeFiles(name)
  }
   return files.length === 0
     ? null
     : <div className='preview' onClick={removeHandler}>
        {files && files.map(file => (
          <div className='preview-image' key={file.name + Date.now()}>
            <div className='preview-remove' data-name={file.name}>&times;</div>
            <img src={file.src} alt='uu' />
            <div className='preview-info'>
              <span>{file.name}</span>
              <span>{formatBytes(file.size)}</span>
            </div>
          </div>
        ))}
      </div>

}

export default Preview