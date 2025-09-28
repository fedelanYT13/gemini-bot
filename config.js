import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

global.owner = [
"5491137612743",
]

global.suittag = ["5491137612743"] 
global.prems = []

global.libreria = 'Baileys'
global.baileys = 'V 7.0.0-rc.3' 
global.vs = '2.2.0'
global.nameqr = 'Kaoruko bot'
global.namebot = '☽ 𝑲𝒂𝒐𝒓𝒖𝒌𝒐 - 𝑩𝒐𝒕 𝑾𝒂𝑩𝒐𝒕 ⚡︎'
global.sessions = 'sessions/Principal'
global.jadi = 'jadibots' 
global.yukiJadibts = true // Activado

//*──────────────────────────────*

global.packname = '☕ 𝑲𝒂𝒐𝒓𝒖𝒌𝒐 𝒃𝒐𝒕 𝑾𝑨 ⚡︎'
global.botname = '𝑲𝒂𝒐𝒓𝒖𝒌𝒐 𝒃𝒐𝒕'
global.wm = '☕ 𝑴𝒐𝒐𝒏𝒇𝒓𝒂𝒓𝒆 𝑻𝒆𝒂𝒎'
global.author = '𝐌𝐚𝐝𝐞 𝐖𝐢𝐭𝐡 𝐁𝐲 𝑴𝒐𝒐𝒏𝒇𝒓𝒂𝒓𝒆 𝑻𝒆𝒂𝒎'
global.dev = '𝑷𝒐𝒘𝒆𝒓𝒆𝒅 𝒃𝒚 𝑴𝒐𝒐𝒏𝒇𝒓𝒂𝒓𝒆 𝑻𝒆𝒂𝒎'
global.espera = '✰ 𝐄𝐬𝐩𝐞𝐫𝐚 𝐔𝐧 𝐌𝐨𝐦𝐞𝐧𝐭𝐨, 𝐄𝐬𝐭𝐚𝐦𝐨𝐬 𝐄𝐧𝐯𝐢𝐚𝐧𝐝𝐨 𝐒𝐮 𝐏𝐞𝐝𝐢𝐝𝐨 ✦'
global.namebot = '𝑲𝒂𝒐𝒓𝒖𝒌𝒐 𝒃𝒐𝒕 𝑾𝑨 ☽'
global.textbot = `𝑲𝒂𝒐𝒓𝒖𝒌𝒐 𝒃𝒐𝒕 𝐌𝐚𝐝𝐞 𝐁𝐲 𝑴𝒐𝒐𝒏𝒇𝒓𝒂𝒓𝒆 𝑻𝒆𝒂𝒎`
global.vs = '2.2.0'
global.publi = '🌙 𝐒𝐢𝐠𝐮𝐞 𝐄𝐥 𝐂𝐚𝐧𝐚𝐥 ♥︎'
global.currency = "KaruCoins"
global.banner = "https://files.catbox.moe/gm249p.jpg"
global.icono = "https://files.catbox.moe/gm249p.jpg"
global.catalogo = fs.readFileSync('./storage/catalogo.jpg')

//*──────────────────────────────*

global.catalogo = fs.readFileSync('./storage/catalogo.jpg')

//*──────────────────────────────*

global.repobot = 'https://github.com/Angelithoxz/Nino-Nakano'
global.grupo = 'https://chat.whatsapp.com/LYLiORNWzHkIsiecvCCdgK?mode=ems_copy_t'
global.gsupport = 'https://chat.whatsapp.com/Hk7LRLL4uJP5pHYAaxusLn?mode=ems_copy_t'
global.channel2 = 'https://whatsapp.com/channel/0029VbBC3hX3mFY5MseNZS2a'
global.channel = 'https://whatsapp.com/channel/0029Vaz6RTR0LKZIKwudX32x'
global.insta = 'https://www.instagram.com/dev_fedexyz13'

global.ch = {
  ch1: "120363423335018677@newsletter"
} // ← CERRADO CORRECTAMENTE ✅

//*──────────────────────────────*

global.estilo = { 
  key: {  
    fromMe: false, 
    participant: `0@s.whatsapp.net`, 
    ...(false ? { remoteJid: "543876577197-120363317332020195@g.us" } : {}) 
  }, 
  message: { 
    orderMessage: { 
      itemCount : -999999, 
      status: 1, 
      surface : 1, 
      message: '🌘 𝑴𝒐𝒐𝒏𝒇𝒓𝒂𝒓𝒆 𝒕𝒆𝒂𝒎 ☽ ', 
      orderTitle: 'Bang', 
      thumbnail: global.catalogo, 
      sellerJid: '0@s.whatsapp.net'
    }
  }
}

//*──────────────────────────────*

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment        

//*──────────────────────────────*

global.multiplier = 69 

//*──────────────────────────────*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
