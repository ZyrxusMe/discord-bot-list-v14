const db = require("../settings/db")
const Discord = require("discord.js")

module.exports = async(client, member) => {
    let guild = member.guild
    let serverdb = db.fetch("ayarlar."+guild.id);
    if(member.user.bot) {
      let a1 = db.fetch("botlar."+guild.id).filter(x=>x.bot != member.id)
      if(!db.fetch("botlar."+guild.id).find(x=>x.bot == member.id)) return
      let userrr = await client.users.fetch(member.id)
       client.channels.cache.get(serverdb["modlog"]).send({content: `${config.emojis.red} **|** \`${userrr.username}\` isimli bot sunucudan ayrıldıgı için verilerden kaldırıldı.`})
      db.set("botlar."+guild.id, a1)
      return db.save_data()
    } else {

      let a2 = db.fetch("botlar."+guild.id).filter(x=>x.owner == member.id);
      
      let a1 = db.fetch("botlar."+guild.id).filter(x=>x.owner != member.id)
      db.set("botlar."+guild.id, a1)
      db.save_data()
      for (const x of a2) {
        let a3 = await guild.members.fetch(x.bot)
        a3.kick().catch(err=>{
          console.log(err)
        })
      }
      client.channels.cache.get(serverdb["modlog"]).send({content: `${config.emojis.red} **|** \`${member.user.tag}\` sunucudan ayrıldıgı için botları kaldırıldı.`})
    }

}