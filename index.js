import { CompreFace } from '@exadel/compreface-js-sdk';
import express from 'express';
import sharp from 'sharp'; // test

let api_key = "215bfb53-fd99-4a45-9b94-43775588bbce";
let url = "http://localhost";
let portCF = 8000;
let options = {
  limit: 0,
  det_prob_threshold: 0.8,
  prediction_count: 1,
  face_plugins: "age,gender,landmarks",
  status: "true"
}

let compreFace = new CompreFace(url, portCF); // set CompreFace url and port 
let recognitionService = compreFace.initFaceRecognitionService(api_key); // initialize service
let faceCollection = recognitionService.getFaceCollection(); // use face collection to fill it with known faces
let subjects = recognitionService.getSubjects(); // use subjects object to work with subjects directely

const app = express()
const port = 4000

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
  // sharp(path_to_image)
  // .resize({ height: 800 })
  // .toFile('output.jpg')
  // .then(data => {
  //   console.log(data)
    // 800 pixels high, auto-scaled width
    recognitionService.recognize(data, options)
      .then(response => {
        res.send(response)
      })
      .catch(error => {
        res.send(error)
        console.log(`Oops! There is problem with recognizing image ${error}`)
      })
  });
  // res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})