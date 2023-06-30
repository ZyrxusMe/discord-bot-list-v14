const db = require("../settings/db")
const Discord = require("discord.js")
const { ButtonBuilder, ButtonStyle, SlashCommandBuilder, ActionRowBuilder } = require('discord.js');

module.exports = async(client, interaction) => {
    let config = client.config
    const kontrolet = require("../settings/botStats")
    const botID = interaction.fields.getTextInputValue('botID');
    const prefix = interaction.fields.getTextInputValue('prefix');

    try {
      const res = await fetch(`https://discord.com/api/v10/oauth2/applications/${botID}/rpc`);
      const json = await res.json();

      if (res.status == 404 || !json["bot_public"]) {
        return interaction.reply({ content: "Geçersiz bot.", ephemeral: true });
      }

      const guildBots = db.fetch(`botlar.${interaction.guild.id}`);
      if (guildBots.find(x => x.bot === botID)) {
        return interaction.reply({ content: "Bu bot zaten başvuruldu veya onaylandı.", ephemeral: true });
      }

      interaction.reply({ content: "Başvurun alındı", ephemeral: true });

      const serverdb = db.fetch(`ayarlar.${interaction.guild.id}`);

      const embed = new Discord.EmbedBuilder()
        .setDescription("» Botu onaylamak için **Botu Onayla** butonuna tıklayın. (Reddetme işlemleri sebepsiz yapılır.)")
        .setAuthor({ name: json.name, iconURL: `https://cdn.discordapp.com/avatars/${botID}/${json.icon}.webp` })
        .addFields(
          { name: "» Bot İsmi", value: String(json.name), inline: true },
          { name: "» Bot ID", value: String(json.id), inline: true }
        );

      await client.channels.cache.get(serverdb["botlog"]).send(`${config.emojis.onay} **|** ${interaction.user} - **${json.name}** isimli botunuzun başvurusu alındı.`);
      if(!client.config.user_token) config.unofficialapi = true
      const botStats = await kontrolet.get(botID, client.config.user_token, config.unofficialapi);
      if (botStats) {
        embed.addFields(
          { name: "» Sunucu Sayısı", value: String(botStats.bot.approximate_guild_count), inline: true }
        );
      }

      if (client.config.dbltoken) {
        const dbl = await dblkontrolet.get(botID, client.config.dbltoken);
        embed.addFields(
          { name: "» DBL (top.gg) Onayı", value: dbl ? "Onaylı" : "Onaysız", inline: true }
        );
      }

      if (botStats) {
        embed.addFields(
          { name: "» Hizmet Şartları", value: botStats.application.terms_of_service_url ? `[Tıkla](${botStats.application.terms_of_service_url})` : `Yok`, inline: true },
          { name: "» Gizlilik Politikası", value: botStats.application.privacy_policy_url ? `[Tıkla](${botStats.application.privacy_policy_url})` : `Yok`, inline: true }
        );
      }

      embed.addFields(
        { name: "» Bot Prefixi", value: "```" + prefix + "```" }
      );

      if (botStats) {
        embed.addFields(
          { name: "» Bot Etiketleri", value: "```" + botStats.application.tags + "```" }
        );
      }

      embed.addFields(
        { name: "» Başvuran", value: "```" + interaction.user.tag + "```" }
      );

      const confirm = new ButtonBuilder()
        .setCustomId('kabul')
        .setLabel('Botu Onayla')
        .setStyle(ButtonStyle.Success);

      const cancel = new ButtonBuilder()
        .setCustomId('red')
        .setLabel('Botu Reddet')
        .setStyle(ButtonStyle.Danger);

      const button = new ButtonBuilder()
        .setLabel('Botu Ekle')
        .setURL(`https://discord.com/oauth2/authorize?client_id=${botID}&permissions=0&scope=bot`)
        .setStyle(ButtonStyle.Link);

      const row = new ActionRowBuilder()
        .addComponents(button, confirm, cancel);

      let message = await client.channels.cache.get(serverdb["modlog"]).send({ embeds: [embed], components: [row] });

      db.push(`botlar.${interaction.guild.id}`, {
        durum: "bekliyor",
        owner: interaction.user.id,
        bot: botID,
        message: message.id
      });

      await db.save_data();
    } catch (err) {
      console.log(err);
      interaction.reply({ content: "Bir hata oluştu.", ephemeral: true });
    }
  }
