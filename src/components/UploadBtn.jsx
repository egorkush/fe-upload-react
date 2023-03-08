import React from 'react'
import  { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

const UploadBtn = ({ files, storage }) => {

  const clearPreview = element => {
    element.style.bottom = 0
    element.innerHTML = '<div class="preview-info-progress"></div>'
  }
  const uploadHandler = () => {
    document.querySelectorAll('.preview-remove').forEach(e => e.remove())
    const previewInfo = document.querySelectorAll('.preview-info')
    previewInfo.forEach(clearPreview)


    files.forEach((file, index) => {
        const uploadRef = ref(storage, `images/${file.name}`)
        const task = uploadBytesResumable(uploadRef, file)

      task.on('state_changed', (snapshot) => {
        const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100  + '%'
        const block = previewInfo[index].querySelector('.preview-info-progress')
        block.textContent = percentage
        block.style.width = percentage
      }, error => {
        console.log(error)
      }, () => {
        getDownloadURL(ref(storage, `images/${file.name}`)).then(url => console.log(url))
      })
    })

  }
  return (
    <button
      className='btn primary'
      onClick={uploadHandler}
    >
      Upload
    </button>
  )
}

export default UploadBtn