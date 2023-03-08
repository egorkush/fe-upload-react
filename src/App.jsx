import Input from './components/Input'
import OpenBtn from './components/OpenBtn'
import Preview from './components/Preview'
import { useState } from 'react'
import UploadBtn from './components/UploadBtn'

import { initializeApp } from 'firebase/app'
import { getStorage } from'firebase/storage'


const firebaseConfig = {
  apiKey: 'AIzaSyABtYqUFZViObFkrypLbk3JR4nkgPsk_Ro',
  authDomain: 'fe-upload-react.firebaseapp.com',
  projectId: 'fe-upload-react',
  storageBucket: 'fe-upload-react.appspot.com',
  messagingSenderId: '687900834923',
  appId: '1:687900834923:web:d79e3926fdfc72124c052e'
}

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

const App = () => {
  const [preview, setPreview] = useState(false)
  const [files, setFiles] = useState([])

  const options = {
    multi: true,
    accept: ['.png', '.jpg', '.jpeg', '.gif']
  }

  const changeHandler = event => {
    setFiles([])
    if (!event.target.files.length) {
      return
    }
    const files = Array.from(event.target.files)
    files.map(file => {
      if (!file.type.match('image')) {
        return file
      }
      const reader = new FileReader()
      reader.onload = event => {
        setPreview(true)
        file.src = event.target.result
        file.key = file.name + Math.random()
        setFiles(prevState => [...prevState, file])
      }
      reader.readAsDataURL(file)
      return file
    })
  }

  const removeFiles = name => {
      setFiles(files.filter(file => file.name !== name))
  }

  return (
    <div className='container'>
        <div className='card'>
          <Input
            options={options}
            changeHandler={changeHandler}
          />
          <OpenBtn />
          {Boolean(files.length) && <UploadBtn files={files} storage={storage}/>}
          {preview && <Preview
            files={files}
            removeFiles={removeFiles}
          />}
        </div>
    </div>
  )
}

export default App

