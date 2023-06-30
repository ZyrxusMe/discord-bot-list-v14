const Discord = require("discord.js")
const db = require("../settings/db")
module.exports = {
    run: async (client,interaction) =>{
    const embed = new Discord.EmbedBuilder()
    .setThumbnail(client.user.avatarURL())
    .setAuthor({name: client.user.username, iconURL: client.user.avatarURL()})
    .setColor("Blue")
    .addFields(
        {name: "Sunucu Sayısı", value: String(client.guilds.cache.size), inline: true},
        {name: "Kullanıcı Sayısı", value: String(client.guilds.cache.reduce((a,b) => a + b.memberCount,0).toLocaleString()), inline: true},
        {name: "Kanal Sayısı", value: String(client.channels.cache.size), inline: true},
        {name: "Uptime", value: `<t:${client.uptimetime}:R>`, inline: true},
        {name: "DiscordJS Sürüm", value: String(Discord.version), inline: true},
        {name: "Ping", value: String(Date.now() - interaction.createdTimestamp), inline: true},
    )
    if(client.config.banner) embed.setImage(client.config.banner)
    interaction.reply({embeds:[embed]})
    },
    name: "istatistik",
    description: "Bot istatistigini gösterir.",
    type: 1,
}