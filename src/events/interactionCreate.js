const db = require("../settings/db")

module.exports = async(client, interaction) => {

    if (!interaction.isChatInputCommand()) return;
    
    const command = client.commands.get(interaction.commandName);
    if (!command) return interaction.reply(`${interaction.commandName} komutunu bulamadım.`, { ephemeral: true });
    
  if(!db.fetch("ayarlar."+interaction.guild.id)) {
    db.set("ayarlar."+interaction.guild.id, {
      "modlog": null,
      "botlog": null,
      "addbot": null,
      "rol-yetkili": null,
      "rol-geliştirici": null,
      "rol-bot": null,
      "bots": 0
    })
    db.set("botlar."+interaction.guild.id, [])
    db.save_data();
  }
  

    command.run(client, interaction);
  };
  