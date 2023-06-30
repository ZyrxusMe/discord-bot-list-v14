const fetch = require("node-fetch")

async function get(id, token) {
    const response = await fetch("https://dblstatistics.com/api/bots/"+id, {
        headers: {
            'Content-Type': "application/json",
            Authorization: token
        }
    })
    const json = await response.json()
    console.log(json)
    if(!json.error) return true
    else false
}
//weasley
module.exports = {get};