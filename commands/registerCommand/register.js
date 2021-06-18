const mongo = require('../../mongo')
const memberSchema = require('../../schemas/memberSchemas')

module.exports.getData = async () => {
  return await mongo().then(async Mongoose => {
    try {
      idDiscord = msg.author.id
      pseudoDiscord = msg.author.username
      console.log('Inserting a document')
      await new memberSchema({
        idDiscord,
        pseudoDiscord,
        pseudoLichess,
        licenceFFE,
        firstNameFFE,
        lastNameFFE
      }).save
    }
    finally {
      Mongoose.connection.close()
    }
  });

}