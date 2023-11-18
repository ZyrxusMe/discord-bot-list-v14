const db = require("../settings/db")
const Discord = require("discord.js")
const {ButtonBuilder,ButtonStyle,ActionRowBuilder} = require("discord.js")

module.exports = async(client, member) => {
    let guild = member.guild
    let serverbots = await db.fetch("botlar."+guild.id)
    let serverdb = db.fetch("ayarlar."+guild.id);
    if(member.user.bot) {
      let bot = serverbots.find(x=>x.bot == member.id)
      if(bot) {
        let modlog = await client.channels.cache.get(serverdb["modlog"])
        let message = await modlog.messages.fetch(bot.message)
        let member = await client.guilds.cache.get(guild.id).members.fetch(bot.owner);
        let botcuk = await client.users.fetch(bot["bot"]);
        let member2 = await client.guilds.cache.get(guild.id).members.fetch(bot.bot);
        await member2.roles.add(serverdb["rol-bot"]).catch(console.error);
        await member.roles.add(serverdb["rol-geliştirici"]).catch(console.error);
        const embedcik = new Discord.EmbedBuilder()
          .setColor("Green")
          .setAuthor({ name: `${botcuk.username} | Onaylandı`, iconURL: botcuk.avatarURL() })
          .addFields(
            { name: "» Bot İsmi", value: String(botcuk.username), inline: true }, //weasley
            { name: "» Bot ID", value: String(botcuk.id), inline: true },
            { name: "» Onaylayan", value: "Sunucuya eklenerek otomatik onaylanmıştır.", inline: true }
          );
        await client.channels.cache.get(serverdb["botlog"]).send({ content: `<@${bot.owner}>`, embeds: [embedcik] });
    
        const button = new ButtonBuilder()
        .setLabel('Botu Ekle')
        .setURL(`https://discord.com/oauth2/authorize?client_id=${botcuk.id}&permissions=0&scope=bot`)
        .setStyle(ButtonStyle.Link);
  
      const onay = new ButtonBuilder()
        .setCustomId('onay')
        .setLabel('Zaten Onaylandı (Sunucuya Eklendigi için)')
        .setStyle(ButtonStyle.Success)
        .setDisabled(true);
      const row = new ActionRowBuilder()
        .addComponents(button, onay);
  
        await message.edit({components:[row]})
  
        bot.durum = "onaylandı"
        bot.yetkili = client.user.id
        db.save_data()
      }
    }
  
}
