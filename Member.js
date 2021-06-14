const Discord = require('discord.js')
const fetch = require('node-fetch');
const { StringStream } = require("scramjet");

class Member{
    constructor(idDiscord,pseudoDiscord,pseudoLichess,licenceFFE,firstNameFFE,lastNameFFE,rankFEE){
        idDiscord = msg.author.id
        pseudoDiscord = this.setPseudoDiscord
        pseudoLichess = this.setPseudoLichess
        licenceFFE ="";
        firstNameFFE ="";
        lastNameFFE ="";
        rankFEE ="";
    }
    getIdDiscord(){
        return idDiscord;
    }
    // Getting the user by ID.
    setPseudoDiscord(idDiscord){
        this.pseudoDiscord = client.users.cache.get(idDiscord); 
    }
    setPseudoLichess(listePseudoLichess, args){
        for (i = 0; i < listePseudoLichess.lenght; i++){
            if (args === listePseudoLichess[i]){
                this.pseudoLichess = args
            }   
            else{
                this.pseudoLichess = "null"
                console.log("errore on ")
            }
        }
        
    }
    /**
     * 
     * @returns array :userNane from lichess
     */
    getlistePseudoLichess(){
        let listePseudoLichess = [];
        let i = 0;
        teamId = 'erp-echiquier-romanais-peageois';
        url = `https://lichess.org/api/team/${teamId}/users`;
        const stream = StringStream.from(async () => (await fetch(url)).body).JSONParse();
        for await (const item of stream) {
          i++;
          const { username, online } = item;
          
          listePseudoLichess[i] = username;
        }
        return listePseudoLichess
    }
}



