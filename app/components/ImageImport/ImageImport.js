import React, { Component } from 'react'
import { render } from 'react-dom'


export default class ImportImage extends Component {
  constructor(data){
    super()
    this.state ={
      file: '',
      imagePreviewUrl: '',
    }
  }

  handleSubmit(e) {
   e.preventDefault();
   this.props.handleImageData(this.state)
   this.setState({
     file: '',
     imagePreviewUrl: '',
   })
 }

 handleImageUpload(e) {
   e.preventDefault();

   let reader = new FileReader();
   let file = e.target.files[0];

   reader.readAsDataURL(file)
   reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      })
    }
 }

  render(){
    return(
      <div>
        <form className="fileform" onSubmit = {(e) => this.handleSubmit(e)}>
          <input
            id="fileInput"
            type="file"
            name="fileField"
            accept="image/jpeg"
            onChange = {(e) => this.handleImageUpload(e)}/>
          <label
            htmlFor= "fileInput"
            id="upload-photo-label">Upload a Vehicle Image</label>
          <button
            onClick = {(e) => this.handleSubmit(e)}
            id = "submit-btn"
            type="submit"
            name="submit"
            value="Submit"
            disabled = {!this.state.file}>Submit Image</button>
        </form>
      </div>
    )
  }
}
