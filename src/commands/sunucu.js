const Discord = require("discord.js")
const db = require("../settings/db")
module.exports = {
    run: async (client,interaction) =>{

    const serverdb = await db.fetch("ayarlar."+interaction.guild.id)
    let ekletmekanalı = serverdb["addbot"] ? `<#${serverdb["addbot"]}> ${client.config.emojis.onay}` : "Ayarlı Değil " + client.config.emojis.red;
    let botlog = serverdb["botlog"] ? `<#${serverdb["botlog"]}> ${client.config.emojis.onay}` : "Ayarlı Değil " + client.config.emojis.red;
    let modlog = serverdb["modlog"] ? `<#${serverdb["modlog"]}> ${client.config.emojis.onay}` : "Ayarlı Değil " + client.config.emojis.red;
    let rolyetkili = serverdb["rol-yetkili"] ? `<@&${serverdb["rol-yetkili"]}> ${client.config.emojis.onay}` : "Ayarlı Değil " + client.config.emojis.red;
    let roldev = serverdb["rol-geliştirici"] ? `<@&${serverdb["rol-geliştirici"]}> ${client.config.emojis.onay}` : "Ayarlı Değil " + client.config.emojis.red;
    let rolbot = serverdb["rol-bot"] ? `<@&${serverdb["rol-bot"]}> ${client.config.emojis.onay}` : "Ayarlı Değil " + client.config.emojis.red;

    const embed = new Discord.EmbedBuilder()
    .setTitle(`${interaction.guild.name} Durum`)
    .setThumbnail(client.user.avatarURL())
    .setAuthor({name: client.user.username, iconURL: client.user.avatarURL()})
    .setColor("Blue")
    .addFields(
        {name: "Bot Ekleme Kanalı", value: String(ekletmekanalı), inline: true},
        {name: "Bot Log", value: String(botlog), inline: true},
        {name: "Mod Log", value: String(modlog), inline: true},
        {name: "Rol Yetkili", value: String(rolyetkili), inline: true},
        {name: "Rol Geliştirici", value: String(roldev), inline: true},
        {name: "Rol Bot", value: String(rolbot), inline: true},
        {name: "Sunucudaki Bot Sayısı", value: String(db.fetch("botlar."+interaction.guild.id).filter(x=>x.durum == "onaylandı").length), inline: true},
    )
    if(client.config.banner) embed.setImage(client.config.banner)
    interaction.reply({embeds:[embed]})
    },
    name: "sunucu",
    description: "Sunucu istatistigini gösterir.",
    type: 1,
}