import fetch from 'node-fetch'
import fs from 'fs'
import moment from 'moment-timezone'
import { commands} from '../lib/commands.js'

let handler = async (m, { conn, args, usedPrefix}) => {
  try {
    const cmdsList = commands
    const now = new Date()
    const colombianTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Bogota'}))
    const fecha = colombianTime.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
}).replace(/,/g, '')
    const hora = moment.tz('America/Bogota').format('hh:mm A')

    const sessionFolder = './plugins'
    const subSessions = fs.existsSync(sessionFolder)? fs.readdirSync(sessionFolder): []
    const plugins = subSessions.length

    const isOficialBot = conn.user.jid === globalThis.conn.user.jid
    const botType = isOficialBot? 'Principal': 'Sub-Bot'

    const jam = moment.tz('America/Bogota').locale('id').format('HH:mm:ss')
    const ucapan = jam < '05:00:00'? 'Buen día'
: jam < '11:00:00'? 'Buen día'
: jam < '15:00:00'? 'Buenas tardes'
: jam < '19:00:00'? 'Buenas tardes'
: 'Buenas noches'

    let menu = `\n\n`
    menu += `>. ﹡ ﹟ 🌹 ׄ ⬭ ${ucapan}  *${m.pushName || 'Sin nombre'}*\n\n`
    menu += `ׅㅤꨶ〆⁾ ㅤׄㅤ⸼ㅤׄ *͜🐼* ㅤ֢ㅤ⸱ㅤᯭִ\n`
    menu += `ׅㅤ𓏸𓈒ㅤׄ *Plugins ›* ${plugins}\n`
    menu += `ׅㅤ𓏸𓈒ㅤׄ *Versión ›* ^0.0.9 ⋆. 𐙚 ˚\n\n`
    menu += `ׅㅤ𓏸𓈒ㅤׄ *Fecha ›* ${fecha}, ${hora}\n`

    const categoryArg = args[0]?.toLowerCase()
    const categories = {}

    for (const command of cmdsList) {
      const category = command.category || 'otros'
      if (!categories[category]) categories[category] = []
      categories[category].push(command)
}

    if (categoryArg &&!categories[categoryArg]) {
      return m.reply(`⭐ La categoría *${categoryArg}* no fue encontrada.`)
}

    for (const [category, cmds] of Object.entries(categories)) {
      if (categoryArg && category.toLowerCase()!== categoryArg) continue
      const catName = category.charAt(0).toUpperCase() + category.slice(1)
      menu += `\nㅤ🍂ᯭ⁾ ㅤׄ  ꤥㅤׄㅤꤪꤨ${catName}ㅤꤪꤨㅤ֢ㅤׄㅤׅ\n`
      cmds.forEach(cmd => {
        const match = usedPrefix.match(/[#\/+.!-]$/)
        const separator = match? match[0]: ''
        const cleanPrefix = separator || usedPrefix
        const aliases = cmd.alias.map(a => {
          const aliasClean = a.split(/[\/#!+.\-]+/).pop().toLowerCase()
          return `${cleanPrefix}${aliasClean}`
}).join(' › ')
        menu += `֯　ׅ🍃ֶ֟፝֯ㅤ *${aliases}* ${cmd.uso? `+ ${cmd.uso}`: ''}\n`
        menu += `> _*${cmd.desc}*_\n`
})
}

    const canales = Object.entries(global.my).reduce((acc, [key, value]) => {
      if (key.startsWith('ch')) {
        const index = key.slice(2)
        const nombre = global.my[`name${index}`]
        if (nombre) acc.push({ id: value, nombre})
}
      return acc
}, [])

    const channelRD = canales[Math.floor(Math.random() * canales.length)]
    const imageUrl = 'https://files.catbox.moe/gm249p.jpg'

    await conn.sendMessage(m.chat, {
      image: { url: imageUrl},
      caption: menu.trim(),
      contextInfo: {
        forwardingScore: 0,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          serverMessageId: '0',
          newsletterName: channelRD.nombre
},
        externalAdReply: {
          title: botname,
          body: dev,
          showAdAttribution: false,
          thumbnailUrl: imageUrl,
          mediaType: 1,
          previewType: 0,
          renderLargerThumbnail: true
}
}
}, { quoted: m})

} catch (e) {
await m.reply(`🕸 Error [${e}]`)
}
}

handler.help = ['menu', 'help']
handler.tags = ['info']
handler.command = ['menu', 'help']
export default handler
