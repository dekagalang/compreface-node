import { CompreFace } from '@exadel/compreface-js-sdk';
import express from 'express';
import fileUpload from 'express-fileupload';
import sharp from 'sharp'; // test

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let api_key = "fa176a2b-00c7-444e-bec4-df055c97beb2";
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

app.use(fileUpload());

app.post('/', async (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  let path_to_image = "./images/taylor.webp";
  let path_to_image_group = "./images/group.jpg";
  let name = encodeURIComponent('tom');

  const { image } = req.files;

  // If no image submitted, exit
  if (!image) return res.sendStatus(400);

  // If does not have image mime type prevent from uploading
  if (!/^image/.test(image.mimetype)) return res.sendStatus(400);

  // Move the uploaded image to our upload folder
  await image.mv(__dirname + '/upload/' + image.name);

  // All good
  // res.sendStatus(200);

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

  recognitionService.recognize('./upload/' + image.name, options)
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