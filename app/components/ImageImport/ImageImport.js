import React, { Component } from 'react'
import { render } from 'react-dom'
import HelperCloudAPI from '../helpers/HelperCloudAPI'

export default class ImportImage extends Component {
  constructor(data){
    super()
    this.helper = new HelperCloudAPI(data)
    this.state ={
      file: '',
      imagePreviewUrl: '',
    }
  }

  handleSubmit(e) {
   e.preventDefault();
   console.log('handle uploading-', this.state.file);
   this.props.handleImageData(this.state)
 }

 handleImageUpload(e) {
   e.preventDefault();

   let reader = new FileReader();
   let file = e.target.files[0];

   let imagePromise = new Promise((resolve, reject)=>{
     reader.readAsDataURL(file)
     reader.onloadend = () => {
       this.setState({
         file: file,
         imagePreviewUrl: reader.result
       });
     }
     setTimeout(function(){
       resolve("Supposedly your shit was transformed!");
     }, 200);
   });
   imagePromise.then(()=>{
     console.log("readerResult should be through")
     console.log(this.state)
   })


 }

  render(){
    return(
      <div>
        <form id="fileform" onSubmit = {(e) => this.handleSubmit(e)}>
          <input id="fileInput" type="file" name="fileField" onChange = {(e) => this.handleImageUpload(e)}/>
          <input onClick = {(e) => this.handleSubmit(e)}
          type="submit" name="submit" value="Submit" disabled = {!this.state.file}/>
        </form>
      </div>
    )
  }
}
