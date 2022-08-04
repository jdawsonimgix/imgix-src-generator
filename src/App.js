import React, { useState } from 'react'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import './App.css'

function App() {
  const [image, setImage] = useState()
  const [cropData, setCropData] = useState('#')
  const [cropper, setCropper] = useState()

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
      setImage(reader.result)
      console.log(reader.result)
    }
    reader.readAsDataURL(files[0])
  }

  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      setCropData(cropper.getCroppedCanvas().toDataURL())
      //console.log(cropper.getCroppedCanvas().toDataURL());
      // createRectUrl();
    }
  }

  return (
    <div>
      <div style={{ width: '100%' }}>
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
