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
        sunucudb.addbot = kanal.id

        db.save_data();

        const embed = new Discord.EmbedBuilder()
        .setAuthor({name:interaction.guild.name, iconURL: interaction.guild.iconURL()})
        .setDescription("» Sunucuya bot başvurusu yapmak için /ekle komutunu kullanarak önünüzdeki formu doldurun.")
        .setFooter({text: client.user.username, iconURL: client.user.avatarURL()})
        .setTimestamp()
        .setColor("DarkButNotBlack")
        await client.channels.cache.get(kanal.id).send({embeds:[embed]})

        interaction.reply({embeds:[client.embeds.successEmbed(client, "Bot Log Kanalı "+ `(<#${kanal.id}>)` +" başarılı bir şekilde ayarlandı.")], ephemeral:true})
    },
    name: "bot-ekletmekanalı",
    description: "Başvuruların yapılacağı kanalı ayarla.",
    type: 1,
    options: [
        {
            name: "kanal",
            type: 7,
            description: "Başvuruların yapılacağı kanal.",
            required: true
        }
    ]
}