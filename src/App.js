import './App.css'
import React, { useState, useEffect } from 'react'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
window.Buffer = window.Buffer || require('buffer').Buffer

function App() {
  const [image, setImage] = useState()
  const [cropData, setCropData] = useState('#')
  const [cropper, setCropper] = useState()
  const [baseURL, setBaseUrl] = useState('THIS SHOULD CHANGE')
  const [testVar, setTest] = useState('one')

  // async function settingBaseURLFunction(data) {
  //   console.log('Found settingBaseURLFunction')
  //   console.log('what data is sent to settingsBaseURLFunction: ' + data.name)
  //   setBaseUrl('Jamie update')
  //   console.log('baseURL inside settingsBaseURLFUnction is now: ' + baseURL)
  // }

  async function uploadPicturesToSource(data) {
    // console.log(data)
    console.log(data.name)
    // console.log(data.type)
    //setBaseUrl(data)
    //console.log('BaseURL ')

    await fetch(
      `https://api.imgix.com/api/v1/sources/upload/62e31fcb03d7afea23063596/` +
        data.name,
      {
        method: 'POST',
        body: data,
        headers: {
          Authorization: 'Bearer ' + process.env.REACT_APP_IMGIX_KEY,
          'Content-Type': data.type,
        },
      },
    )
  }

  const onChange = (e) => {
    e.preventDefault()
    let files
    if (e.dataTransfer) {
      files = e.dataTransfer.files
    } else if (e.target) {
      files = e.target.files
    }
    const reader = new FileReader()
    reader.onload = () => {
      setImage(reader.result) //adds it to display
      uploadPicturesToSource(files[0])
    }
    reader.readAsDataURL(files[0])
    setBaseUrl(files[0].name)
  }

  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      setCropData(cropper.getCroppedCanvas().toDataURL())
      //console.log(cropper.getCroppedCanvas().toDataURL());
      // createRectUrl();
    }
  } //

  useEffect(() => {
    console.log('setTimeOut baseURL is' + baseURL)
  }, [baseURL])

  const sayHello = () => {
    setTest('Two')
  }

  return (
    <div>
      <div style={{ width: '100%' }}>
        <button onClick={sayHello}>CLICK TO TEST STATE</button>

        <h1>Srcset Generator</h1>
        <input type="file" onChange={onChange} />
        <button>Use default img</button>
        <br />
        <br />
        <Cropper
          style={{ height: 400, width: '100%' }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          src={image}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          onInitialized={(instance) => {
            setCropper(instance)
          }}
          guides={true}
        />
      </div>
      <div>
        <div className="box" style={{ width: '50%', float: 'right' }}>
          <h1>Preview</h1>
          <div
            className="img-preview"
            style={{ width: '100%', float: 'left', height: '300px' }}
          />
        </div>
        <div
          className="box"
          style={{ width: '50%', float: 'right', height: '300px' }}
        >
          <h1>
            <span>Crop</span>
            <button style={{ float: 'right' }} onClick={getCropData}>
              Crop Image
            </button>
          </h1>
          <img style={{ width: '100%' }} src={cropData} alt="cropped" />
        </div>
      </div>
      <br style={{ clear: 'both' }} />
    </div>
  )
}

export default App
