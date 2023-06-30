const Discord = require("discord.js")
const db = require("../settings/db")
module.exports = {
    run: async (client,interaction) =>{
        let kanal = interaction.options.getChannel("kanal");

        if(!interaction.member.permissions.has("MANAGE_GUILD")) {
            return interaction.reply({embeds:[client.embeds.errorEmbed(client, "Bu komutu kullanabilmek için `SUNUCUYU YÖNET` yetkisine sahip olmalısın.")], ephemeral:true})
        }

        if(kanal.type != 0) {
            return interaction.reply({embeds:[client.embeds.errorEmbed(client, "Lütfen bir yazı kanalı belirtin.")], ephemeral:true})
        }

        let sunucudb = await db.fetch("ayarlar."+interaction.guild.id)
        sunucudb.botlog = kanal.id

        db.save_data();

        interaction.reply({embeds:[client.embeds.successEmbed(client, "Bot Log Kanalı "+ `(<#${kanal.id}>)` +" başarılı bir şekilde ayarlandı.")], ephemeral:true})
    },
    name: "bot-log",
    description: "Onay/red bilgilerinin gideceği kanalı ayarla",
    type: 1,
    options: [
        {
            name: "kanal",
            type: 7,
            description: "Onay/red bilgilerinin gideceği kanalı",
            required: true
        }
    ]
}