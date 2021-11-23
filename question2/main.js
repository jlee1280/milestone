/*
 * Project:Question 2
 * File Name: main.js
 * Description:Exam practise question 2
 *
 * Created Date: 11/22/2021
 * Author:Jimmy Lee, A01064259
 *
 */

const IOhandler = require("./IOhandler"),
  zipFilePath = `${__dirname}/myfile.zip`,
  pathUnzipped = `${__dirname}/unzipped`,
  pathProcessed = `${__dirname}/grayscaled`;

IOhandler.unzip()
// .then(IOhandler.readDir())
// .then(IOhandler.grayScale())