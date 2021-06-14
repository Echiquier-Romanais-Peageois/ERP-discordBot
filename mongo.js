const mongoose = require('mongoose')
const mongoPhat = 'mongodb+srv://admin:AUsN7dvQU2eBpq6B@cluster0.mjso8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'//require('./config.json')''

module.exports = async function () {
  await mongoose.connect(mongoPhat, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  return mongoose
}
