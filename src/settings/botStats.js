const fetch = require("node-fetch")
async function get(id, token, unofficial) {
    if(unofficial) {
        const response = await fetch("https://weasleyapi.glitch.me/api/oauth2/authorize?client_id="+id, {
            method: 'GET',
        })
        return await response.json()    

    } else {
        if(!token) {
            console.log("[UYARI] Bot başvurusunda tagları, gizlilik politikasını, hizmet şartlarını, sunucu sayısını çekebilmek için Bir kullanıcı tokeni gerekiyor (Alternatif bir veri çekme yolu yoktur!)")
            return false
        }
    
        const response = await fetch("https://discord.com/api/oauth2/authorize?client_id="+id+"&scope=bot", {
            method: 'GET',
            headers: {
              Authorization: token,
            },
        })
        return await response.json()    
    }
}

module.exports = {get};