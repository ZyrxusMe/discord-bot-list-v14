const Discord = require("discord.js")
const db = require("../settings/db")
module.exports = {
    run: async (client,interaction) =>{
        let rol = interaction.options.getRole("rol");

        if(!interaction.member.permissions.has("MANAGE_GUILD")) {
            return interaction.reply({embeds:[client.embeds.errorEmbed(client, "Bu komutu kullanabilmek için `SUNUCUYU YÖNET` yetkisine sahip olmalısın.")], ephemeral:true})
        }

        let sunucudb = await db.fetch("ayarlar."+interaction.guild.id)
        sunucudb["rol-geliştirici"] = rol.id

        db.save_data();
        interaction.reply({embeds:[client.embeds.successEmbed(client, "Geliştirici rolü "+ `(<@&${rol.id}>)` +" başarılı bir şekilde ayarlandı.")], ephemeral:true})
    },
    name: "rol-geliştirici",
    description: "Bot geliştiricilerinin hangi role sahip olması gerektiğini ayarlar.",
    type: 1,
    options: [
        {
            name: "rol",
            type: 8,
            description: "Geliştirici rolü.",
            required: true
        }
    ]
}