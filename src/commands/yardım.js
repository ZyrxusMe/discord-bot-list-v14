const Discord = require("discord.js")

module.exports = {
    run: async (client,interaction) =>{
        const embed = new Discord.EmbedBuilder()
        .setThumbnail(client.user.avatarURL())
        .setColor("Blurple")
        .setAuthor({name:client.user.username,iconURL:client.user.avatarURL()})
        .setDescription(`

        ${client.user.username} botunu kullandıgınız için teşekkürler!

        **» Bot List**
        » **/bot-modlog** - Başvuruların gideceği kanalı ayarla.
        » **/bot-log** - Onay/red bilgilerinin gideceği kanalı ayarla.
        » **/bot-ekletmekanalı** - Botlar hangi kanalda ekleneceğini ayarla.
        » **/ekle** - Bot başvurusunda bulunma.

        **» Rol Ayarları**
        » **/rol-yetkili** - Sunucu yetkililerinin hangi role sahip oldugunu gerektiğini ayarlar.
        » **/rol-geliştirici** - Bot geliştiricilerinin hangi role sahip olması gerektiğini ayarlar.
        » **/rol-bot** - Botların hangi role sahip olması gerektiğini ayarlar.

        **» Genel**
        » **/istatistik** - Bot istatistigini gösterir.
        » **/sunucu** - Sunucu istatistigini gösterir.
        `)
        if(client.config.banner) embed.setImage(client.config.banner)
        .setTimestamp()
        interaction.reply({embeds:[embed]})
    },
    name: "yardım",
    description: "Bot komutlarının listesini gösterir.",
    type: 1
}