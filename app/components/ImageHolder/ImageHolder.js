import React from 'react'

const ImageHolder = ({url}) => {
  return(
    <div className = "image-holder">
      <img src = {url} />
    </div>
  )
}


export default ImageHolder
