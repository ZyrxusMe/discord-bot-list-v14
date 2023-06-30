const {EmbedBuilder} = require("discord.js")

function successEmbed(client, desc) {
    let embed = new EmbedBuilder()
    .setAuthor({name: client.user.username, iconURL: client.user.avatarURL()})
    .setColor("Green")
    .setDescription(desc + " " + client.config.emojis.onay)
    .setThumbnail(client.user.avatarURL())
    if(client.config.banner) embed.setImage(client.config.banner)

    return embed
}

function errorEmbed(client, desc) {
    let embed = new EmbedBuilder()
    .setAuthor({name: client.user.username, iconURL: client.user.avatarURL()})
    .setColor("Red")
    .setDescription(desc + " " + client.config.emojis.red)
    .setThumbnail(client.user.avatarURL())
    if(client.config.banner) embed.setImage(client.config.banner)

    return embed

}//W
module.exports = {successEmbed, errorEmbed};