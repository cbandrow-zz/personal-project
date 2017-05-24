export default class HelperCloudAPI{
  constructor(data){
    this.data = data || ''
  }

  uploadFiles(event, uploadedFile){
  // event.stopPropagation();
  // event.preventDefault();
  //Grab the file and asynchronously convert to base64.
  let file = uploadedFile
  let reader = new FileReader()
  // let base64 = reader.readAsDataURL(file);
  // console.log(base64)
  }

  processFile(event) {
    let encodedFile = event.target.result;
    console.log(encodedFile)
  }

  handleFiles(file){
    let reader = new FileReader();
    let result = reader.readAsDataURL(file);
    console.log(reader.readAsDataURL(file))
    console.log(result);
  }
}
