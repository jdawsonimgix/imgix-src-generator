import './App.css'
import React, { useState } from 'react'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
const ImgixAPI = require('imgix-management-js')

function App() {
  const [image, setImage] = useState()
  const [cropData, setCropData] = useState('#')
  const [cropper, setCropper] = useState()
  let arrSearchImgix = []
  const [arrImgixSearched, setImgixSearchArray] = useState([])

  async function searchPictureTags(searchItemSent) {
    console.log(`searchItem is: ` + searchItemSent)

    const imgix_api_key = process.env.REACT_APP_IMGIX_KEY
    console.log(`imgix_api_key is: ` + imgix_api_key)

    const imgix = new ImgixAPI({
      apiKey: `${imgix_api_key}`,
    })

    await imgix
      .request(`assets/622f76522d67dbae5fb46268?filter[tags]=` + searchItemSent)
      .then((response) => {
        console.log(response)

        for (var i = 0; i < response.data.length; i++) {
          arrSearchImgix.push(response.data[i].attributes.origin_path)
        }
        setImgixSearchArray(arrSearchImgix)
        console.log(arrImgixSearched)
        return response
      })
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
        <button onClick={() => searchPictureTags('Dog')}>
          Dog button for management js call
        </button>
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
