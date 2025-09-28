import { xpRange} from '../lib/levelling.js'
import moment from 'moment-timezone'
import fetch from 'node-fetch'

let handler = async (m, { conn, args}) => {
  try {
    const mentioned = await m.mentionedJid
    const userId = mentioned.length> 0
? mentioned[0]
: m.quoted
? await m.quoted.sender
: m.sender

    if (!global.db.data.users) global.db.data.users = {}
    if (!global.db.data.characters) global.db.data.characters = {}
    if (!global.db.data.users[userId]) global.db.data.users[userId] = {}

    const user = global.db.data.users[userId]
    const name = user.name || await conn.getName(userId).catch(() => userId.split('@')[0])
    const description = user.description || 'Sin descripción:v'
    const birth = user.birth || 'Sin especificar:< (#setbirth)'
    const genre = user.genre || 'Sin especificar'
    const exp = user.exp || 0
    const level = user.level || 0
    const coin = user.coin || 0
    const bank = user.bank || 0
    const totalCoins = coin + bank
    const commandsUsed = user.commands || 0

    const sorted = Object.entries(global.db.data.users)
.map(([jid, data]) => ({...data, jid}))
.sort((a, b) => (b.level || 0) - (a.level || 0))

    const rank = sorted.findIndex(u => u.jid === userId) + 1
    const { min, xp} = xpRange(level, global.multiplier)
    const progress = `${exp - min} => ${xp} _(${Math.floor(((exp - min) / xp) * 100)}%)_`

    const isPremium = user.premium || global.prems.includes(userId.split('@')[0])
    const premiumTime = isPremium
? global.prems.includes(userId.split('@')[0])
? 'Permanente'
: user.premiumTime
? await formatTime(user.premiumTime - Date.now())
: '—'
: '—'

    const marriedTo = user.marry
    const marriedName = marriedTo
? global.db.data.users[marriedTo]?.name?.trim()
        || await conn.getName(marriedTo).catch(() => marriedTo.split('@')[0])
: 'Nadie'

    const favId = user.favorite
    const favLine = favId && global.db.data.characters?.[favId]
? `\n๑ Claim favorito » *${global.db.data.characters[favId].name || '???'}*`
: ''

    const ownedIDs = Object.entries(global.db.data.characters)
.filter(([, c]) => c.user === userId)
.map(([id]) => id)

    const haremCount = ownedIDs.length
    const haremValue = ownedIDs.reduce((acc, id) => {
      const char = global.db.data.characters[id] || {}
      return acc + (typeof char.value === 'number'? char.value: 0)
}, 0)

    const pp = await conn.profilePictureUrl(userId, 'image')
.catch(() => 'https://raw.githubusercontent.com/The-King-Destroy/Adiciones/main/Contenido/1745522645448.jpeg')

    const currency = '💰'
    const profileText = `*「✦」 Perfil ◢ ${name} ◤*
${description}

❀ Cumpleaños » *${birth}*
⚥ Género » *${genre}*
♡ Casado con » *${marriedName}*

☆ Experiencia » *${exp.toLocaleString()}*
❖ Nivel » *${level}*
# Puesto » *#${rank}*
➨ Progreso » *${progress}*
⸙ Premium » ${isPremium? `✔️ (*${premiumTime}*)`: '✖️'}

ꕥ Harem » *${haremCount}*
♤ Valor total » *${haremValue.toLocaleString()}*${favLine}
⛁ Coins totales » *${totalCoins.toLocaleString()} ${currency}*
❒ Comandos totales » *${commandsUsed}*`

    await conn.sendMessage(m.chat, {
      image: { url: pp},
      caption: profileText,
      mentions: [userId]
}, { quoted: fkontak})

} catch (error) {
    await m.reply(`⚠︎ Se ha producido un problema.\n> Usa *${usedPrefix}report* para informarlo.\n\n${error.message}`, m)
}
}

handler.help = ['profile']
handler.tags = ['rg']
handler.command = ['profile', 'perfil', 'perfíl']
handler.group = true

export default handler

async function formatTime(ms) {
  let s = Math.floor(ms / 1000),
      m = Math.floor(s / 60),
      h = Math.floor(m / 60),
      d = Math.floor(h / 24),
      months = Math.floor(d / 30),
      weeks = Math.floor((d % 30) / 7)

  s %= 60; m %= 60; h %= 24; d %= 7

  let parts = months? [`${months} mes${months> 1? 'es': ''}`]
: weeks? [`${weeks} semana${weeks> 1? 's': ''}`]
: d? [`${d} día${d> 1? 's': ''}`]: []

  if (h) parts.push(`${h} hora${h> 1? 's': ''}`)
  if (m) parts.push(`${m} minuto${m> 1? 's': ''}`)
  if (s) parts.push(`${s} segundo${s> 1? 's': ''}`)

  return parts.length> 1
? parts.slice(0, -1).join(' ') + ' y ' + parts.slice(-1)
: parts[0]
}
