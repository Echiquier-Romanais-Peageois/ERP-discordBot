const mongo = require('../../mongo')
const memberSchema = require('../../schemas/memberSchemas')
const data = []
module.exports.getData = async (idDiscord) => {
    return await mongo().then(async mongoose =>{
        try{
            console.log('Running findOne()')

            const result = await memberSchema.findOne({
                idDiscord
            })

            console.log(result)
            let pseudoDiscord = ''
            let pseudoLichess ='' 
            let licenceFFE =''
            let firstNameFFE ='' 
            let lastNameFFE =''
            if(result){
                pseudoDiscord = result.pseudoDiscord
                pseudoLichess = result.pseudoLichess
                licenceFFE = result.licenceFFE
                firstNameFFE = result.firstNameFFE
                lastNameFFE = result.lastNameFFE
            }else{
                console.log('Inserting a document')
                await new memberSchema({
                    idDiscord,
                    pseudoDiscord,
                    pseudoLichess,
                    licenceFFE,
                    firstNameFFE,
                    lastNameFFE
                }).save()
            }
            return data[pseudoDiscord,pseudoLichess,licenceFFE,firstNameFFE,lastNameFFE]
        }finally{
            mongoose.connection.close()
        }
    })
}