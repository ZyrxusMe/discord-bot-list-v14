const Discord = require("discord.js");
const config = require("./config.json");
const fs = require("fs");
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildMembers,
  ],
});
client.uptimetime = Math.floor(Date.now() / 1000);
const slash = require("./src/settings/slash");
client.embeds = require("./src/settings/embeds");
client.config = config;

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./src/commands/").filter(file => file.endsWith('.js'));
commandFiles.forEach(file => {
  const command = require(`./src/commands/${file}`);
  client.commands.set(command.name, { name: command.name, ...command });
  console.log(`[KOMUT] ${file.split(".")[0]} yüklendi.`);
});

const eventFiles = fs.readdirSync("./src/events/").filter(file => file.endsWith('.js'));
eventFiles.forEach(file => {
  const event = require(`./src/events/${file}`);
  client.on(file.split(".")[0], event.bind(null, client));
  delete require.cache[require.resolve(`./src/events/${file}`)];
  console.log(`[EVENT] ${file.split(".")[0]} yüklendi.`);
});

const slashCommands = client.commands.map(command => ({
  name: command.name,
  description: command.description || command.desc || "Açıklamasız",
  options: command.options || [],
  type: command.type,
}));

slash(client, slashCommands, { debug: true });

client.on("interactionCreate", async interaction => {
  if (interaction.isModalSubmit() && interaction.customId === "botBasvuru") {
    require("./src/events/modalSubmit")(client, interaction);
  }
});

client.on("interactionCreate", async interaction => {
  if (interaction.isButton()) {
    require("./src/events/clickButton")(client, interaction);
  }
});

client.login(client.config.token);
