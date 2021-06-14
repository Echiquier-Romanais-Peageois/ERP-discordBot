const mongoose = require('mongoose')

const reqString ={
    type: String,
    required: true
}
const memberSchema = mongoose.Schema({
    idDiscord: reqString,
    pseudoDiscord:reqString,
    pseudoLichess:reqString,
    licenceFFE:reqString,
    firstNameFFE:reqString,
    lastNameFFE:reqString,
})

module.exports = mongoose.model('member', memberSchema)