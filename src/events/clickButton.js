const db = require("../settings/db")
const Discord = require("discord.js")
const { ButtonBuilder, ButtonStyle, SlashCommandBuilder, ActionRowBuilder } = require('discord.js');

module.exports = async(client, interaction) => {
    let config = client.config

    if (interaction.customId === "kabul") {
        let serverdb = db.fetch(`ayarlar.${interaction.guild.id}`);
    
        if(!interaction.member.permissions.has("MANAGE_GUILD") && !interaction.member.roles.cache.has(serverdb["rol-yetkili"])){
          return interaction.reply({content: `${config.emojis.red} **|** Bu işlemi yapabilmek için SUNUCUYU YÖNET yetkisine veya <@&${serverdb["rol-yetkili"]}> rolüne sahip olmanız gerekir.`, ephemeral: true})
        }
      
        const { fields } = interaction.message.embeds[0];
        const id = fields.find(x => x.name === "» Bot ID").value;
        const botdb = await db.fetch(`botlar.${interaction.guild.id}`).find(x => x.bot == id);
    
        if (!botdb) {
          const red = new ButtonBuilder()
            .setCustomId('red')
            .setLabel('Zaten Reddedildi')
            .setStyle(ButtonStyle.Danger)
            .setDisabled(true);
          const row = new ActionRowBuilder()
            .addComponents(red);
    
          const embed2 = new Discord.EmbedBuilder(interaction.message.embeds[0]);
          embed2.setColor("Red");
          embed2.addFields(
            { name: "» Reddeden", value: String(client.user) },
            { name: "» Sebep", value: "Botun sahibi sunucudan ayrıldığı için bot onaylanmadı." }
          );
    
          let embed = interaction.message;
          return embed.edit({ components: [row], embeds: [embed2] });
        }
    
        const onayla = new ButtonBuilder()
          .setCustomId('onay')
          .setLabel('Zaten Onaylandı')
          .setStyle(ButtonStyle.Success)
          .setDisabled(true);
        const button = new ButtonBuilder()
          .setLabel('Botu Ekle')
          .setURL(`https://discord.com/oauth2/authorize?client_id=${id}&permissions=0&scope=bot`)
          .setStyle(ButtonStyle.Link);
    
        const row = new ActionRowBuilder()
          .addComponents(button, onayla);
        const embed2 = new Discord.EmbedBuilder(interaction.message.embeds[0]);
        embed2.addFields(
          { name: "» Onaylayan", value: String(interaction.user) }
        );
        let embed = interaction.message;
        embed.edit({ components: [row], embeds: [embed2] });
    
        botdb.durum = "onaylandı";
        botdb.yetkili = interaction.user.id;
    
        await db.save_data();
        let botcuk = await client.users.fetch(id);
        let member = await client.guilds.cache.get(interaction.guild.id).members.fetch(botdb.owner);
    
        await member.roles.add(serverdb["rol-geliştirici"]).catch(console.error);
        const embedcik = new Discord.EmbedBuilder()
          .setColor("Green")
          .setAuthor({ name: `${botcuk.username} | Onaylandı`, iconURL: botcuk.avatarURL() })
          .addFields(
            { name: "» Bot İsmi", value: String(botcuk.username), inline: true },
            { name: "» Bot ID", value: String(botcuk.id), inline: true },
            { name: "» Onaylayan", value: String(interaction.user), inline: true }
          );
        await client.channels.cache.get(serverdb["botlog"]).send({ content: `<@${botdb.owner}>`, embeds: [embedcik] });
        interaction.reply({content:config.emojis.onay+" **|** Bot başarıyla onaylandı.", ephemeral:true})
    
      } //weasley
    
      if (interaction.customId === "red") {
        let serverdb = db.fetch(`ayarlar.${interaction.guild.id}`);
    
        if(!interaction.member.permissions.has("MANAGE_GUILD") && !interaction.member.roles.cache.has(serverdb["rol-yetkili"])){
            return interaction.reply({content: `${config.emojis.red} **|** Bu işlemi yapabilmek için SUNUCUYU YÖNET yetkisine veya <@&${serverdb["rol-yetkili"]}> rolüne sahip olmanız gerekir.`, ephemeral: true})
        }
      
        const { fields } = interaction.message.embeds[0];
        const id = fields.find(x => x.name === "» Bot ID").value;
        let dbbotcuk = await db.fetch(`botlar.${interaction.guild.id}`);
    
        if (!dbbotcuk.find(x => x.bot == id)) {
          const red = new ButtonBuilder()
            .setCustomId('red')
            .setLabel('Zaten Reddedildi')
            .setStyle(ButtonStyle.Danger)
            .setDisabled(true);
          const row = new ActionRowBuilder()
            .addComponents(red);
    
          const embed2 = new Discord.EmbedBuilder(interaction.message.embeds[0]);
          embed2.setColor("Red");
          embed2.addFields(
            { name: "» Reddeden", value: String(client.user) },
            { name: "» Sebep", value: "Botun sahibi sunucudan ayrıldığı için bot onaylanmadı." }
          );
    
          let embed = interaction.message;
          return embed.edit({ components: [row], embeds: [embed2] });
        }
    
        let a1 = await dbbotcuk.filter(x => x.bot != id);
        db.set(`botlar.${interaction.guild.id}`, a1);
    
        await db.save_data();
        let botcuk = await client.users.fetch(id);
        const embedcik = new Discord.EmbedBuilder()
          .setColor("Red")
          .setAuthor({ name: `${botcuk.username} | Reddedildi`, iconURL: botcuk.avatarURL() })
          .addFields(
            { name: "» Bot İsmi", value: String(botcuk.username), inline: true },
            { name: "» Bot ID", value: String(botcuk.id), inline: true },
            { name: "» Reddeden", value: String(interaction.user), inline: true }
          );
    
        const button = new ButtonBuilder()
          .setLabel('Botu Ekle')
          .setURL(`https://discord.com/oauth2/authorize?client_id=${id}&permissions=0&scope=bot`)
          .setStyle(ButtonStyle.Link);
    
        const red = new ButtonBuilder()
          .setCustomId('red')
          .setLabel('Zaten Reddedildi')
          .setStyle(ButtonStyle.Danger)
          .setDisabled(true);
        const row = new ActionRowBuilder()
          .addComponents(button, red);
    
        const embed2 = new Discord.EmbedBuilder(interaction.message.embeds[0]);
        embed2.setColor("Red");
        embed2.addFields(
          { name: "» Reddeden", value: String(interaction.user) }
        );
    
        let embed = interaction.message;
        embed.edit({ components: [row], embeds: [embed2] });
        interaction.reply({content:config.emojis.red+" **|** Bot başarıyla reddedildi.", ephemeral:true})
        await client.channels.cache.get(serverdb["botlog"]).send({ content: `<@${dbbotcuk.find(x => x.bot == botcuk.id)["owner"]}>`, embeds: [embedcik] });
      }
    
}