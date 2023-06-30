const Discord = require("discord.js")
const db = require("../settings/db")
const { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    run: async (client,interaction) =>{

    let serverdb = await db.fetch("ayarlar."+interaction.guild.id)

    if(!serverdb["modlog"]||!serverdb["botlog"]||!serverdb["addbot"]||!serverdb["rol-yetkili"]||!serverdb["rol-geliştirici"]||!serverdb["rol-bot"]) {
        return interaction.reply({embeds:[client.embeds.errorEmbed(client, "Bir ayar yapılmamış. /sunucu komutundan hangilerinin ayarlanmadıgına bakabilirsiniz.")], ephemeral:true})
    }

    if(serverdb["addbot"]) {
        if(interaction.channel.id !== serverdb["addbot"]) {
            return interaction.reply({embeds:[client.embeds.errorEmbed(client, `Bot başvurusu işlemlerini bu kanaldan yapamazsınız. Lütfen <#${serverdb["addbot"]}> kanalında bu komutu kullanın.`)], ephemeral:true})
        }
    }

    const modal = new ModalBuilder()
    .setCustomId('botBasvuru')
    .setTitle(interaction.guild.name+ " | Bot Başvurusu");
    const id = new TextInputBuilder()
    .setCustomId('botID')
    .setLabel("Botunuzun IDsi")
    .setStyle(TextInputStyle.Short);
    const prefix = new TextInputBuilder()
    .setCustomId('prefix')
    .setLabel("Botunuzun prefixi (Slash ise /)")
    .setStyle(TextInputStyle.Short);

    const ilk = new ActionRowBuilder().addComponents(id);
    const iki = new ActionRowBuilder().addComponents(prefix);

    modal.addComponents(ilk,iki)

    await interaction.showModal(modal)

    },
    name: "ekle",
    description: "Bot başvurusunda bulunma.",
    type: 1
}