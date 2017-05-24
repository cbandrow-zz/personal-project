export default class cloudVisionRequest{
  constructor(data){
    this.data = data || ''
  }

  uploadFiles(event, file){
  event.stopPropagation(); // Stop stuff happening
  event.preventDefault(); // Totally stop stuff happening
  console.log(file)
  //Grab the file and asynchronously convert to base64.
  let uploadFile = file
  let reader = new FileReader()
  reader.onloadend = processFile
  let base64 = reader.readAsDataURL(uploadFile);
  }

  processFile(event) {
  var encodedFile = event.target.result;
  // sendFiletoCloudVision(encodedFile)
  }
}
