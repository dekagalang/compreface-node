import { CompreFace } from '@exadel/compreface-js-sdk';
import express from 'express';

let api_key = "faf6f6c3-7700-4a2d-bda1-6e03440864f1";
let url = "http://localhost";
let portCF = 8000;
let options = {
  limit: 0, 
  det_prob_threshold: 0.8, 
  prediction_count: 1,
  face_plugins: "calculator,age,gender,landmarks",
  status: "true"
}

let compreFace = new CompreFace(url, portCF); // set CompreFace url and port 
let recognitionService = compreFace.initFaceRecognitionService(api_key); // initialize service
let faceCollection = recognitionService.getFaceCollection(); // use face collection to fill it with known faces
let subjects = recognitionService.getSubjects(); // use subjects object to work with subjects directely

const app = express()
const port = 3000

app.get('/', (req, res) => {
  let path_to_image = "./images/boy.jpg";
  let path_to_image_group = "./images/group.jpg";
  let name = encodeURIComponent('tom');

  // faceCollection.add(path_to_image, name)
  //   .then(response => {
  //     console.log(response)
  //   })
  //   .catch(error => {
  //     console.log(`Oops! There is problem in uploading image ${error}`)
  //   })
  recognitionService.recognize(path_to_image, options)
    .then(response => {
        console.log(JSON.stringify(response));
    })
    .catch(error => {
        console.log(`Oops! There is problem with recognizing image ${error}`)
    })
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})