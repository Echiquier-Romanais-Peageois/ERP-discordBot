const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}
const notReqString = {
    type: String,
    require: false
}
const memberSchema = mongoose.Schema({
    idDiscord: reqString,
    pseudoDiscord: reqString,
    pseudoLichess: reqString,
    licenceFFE: notReqString,
    firstNameFFE: notReqString,
    lastNameFFE: notReqString
})

module.exports = mongoose.model('member', memberSchema)