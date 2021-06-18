/**
 * @author Ollivier chris
 * @version 1.0.0
 * Ce fichier permet la 
 */
const config = require('./config.json')
const mongoose = require('mongoose')
const mongoPath = config.mongoPath

module.exports = async function () {
  await mongoose.connect(mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  return mongoose
}
