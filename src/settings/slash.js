const Discord = require('discord.js');

module.exports = async (client, komutlar, options = {
    debug: false,
    guildId: null
}) => {


const log = (mesaj) => options.debug && console.log(mesaj);

const hazir = client.readyAt ? Promise.resolve() : new Promise(resolve => client.once('ready', resolve));
await hazir;
const mevcutKomutlar = await client.application.commands.fetch(options.guildId && { guildId: options.guildId });

const yeniKomutlar = komutlar.filter((komut) => !mevcutKomutlar.some((k) => k.name === komut.name));
for (let yeniKomut of yeniKomutlar) {
    await client.application.commands.create(yeniKomut, options.guildId);
}


const silinenKomutlar = mevcutKomutlar.filter((komut) => !komutlar.some((k) => k.name === komut.name)).toJSON();
for (let silinenKomut of silinenKomutlar) {
    await silinenKomut.delete();
}


const guncellenenKomutlar = komutlar.filter((komut) => mevcutKomutlar.some((k) => k.name === komut.name));
let guncellenenKomutSayisi = 0;
for (let guncellenenKomut of guncellenenKomutlar) {
    const yeniKomut = guncellenenKomut;
    const oncekiKomut = mevcutKomutlar.find((k) => k.name === guncellenenKomut.name);
    let degistirildi = false;
    if (oncekiKomut.description !== yeniKomut.description) degistirildi = true;
    if (!Discord.ApplicationCommand.optionsEqual(oncekiKomut.options ?? [], yeniKomut.options ?? [])) degistirildi = true;
    if (degistirildi) {
        await oncekiKomut.edit(yeniKomut);
        guncellenenKomutSayisi++;
    }
}


return {
    mevcutKomutSayisi: mevcutKomutlar.size,
    yeniKomutSayisi: yeniKomutlar.length,
    silinenKomutSayisi: silinenKomutlar.length,
    guncellenenKomutSayisi
};

};