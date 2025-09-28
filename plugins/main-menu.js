import { xpRange} from '../lib/levelling.js'

const textCyberpunk = (text = '') => {
  const charset = {
    a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ꜰ', g: 'ɢ',
    h: 'ʜ', i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ',
    o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ', s: 'ꜱ', t: 'ᴛ', u: 'ᴜ',
    v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ'
}
  return String(text).toLowerCase().split('').map(c => charset[c] || c).join('')
}

let tags = {
  main: textCyberpunk('sistema'),
  group: textCyberpunk('grupos'),
  tools: textCyberpunk('herramientas'),
  fun: textCyberpunk('diversión'),
  premium: textCyberpunk('premium')
}

const defaultMenu = {
  before: `
╭───⌁ 𝑲𝒂𝒐𝒓𝒖𝒌𝒐 - 𝑩𝒐𝒕 ⌁───╮
│ 🌸 𝑯𝒐𝒍𝒂, *%name*
│ 🧾 𝑷𝒓𝒐𝒇𝒊𝒍: *%premium*
│ ⚙️ 𝑴𝒐𝒅𝒐: *%mode*
│ 📋 𝑼𝒔𝒖𝒂𝒓𝒊𝒐𝒔: *%totalreg*
╰─────────────────────╯
%readmore
`.trimStart(),
  header: '\n˚ `ㅤׄ  ꤥ` *%category*',
  body: 'ㅤ𓏸𓈒ㅤׄ  %cmd',
  footer: '',
  after: '\n> © 𝖯𝗈𝗐𝖾𝗋𝖾𝖽 𝖡𝗒 𝖬𝗈𝗈𝖓𝖿𝗋𝖺𝗋𝖾 ☽'
}

let handler = async (m, { conn, usedPrefix: _p}) => {
  const { exp, level} = global.db.data.users[m.sender]
  const { min, xp} = xpRange(level, global.multiplier)
  const name = await conn.getName(m.sender)
  const totalreg = Object.keys(global.db.data.users).length
  const premium = global.db.data.users[m.sender].premium? '✅ Premium': '❌ Normal'
  const mode = global.opts.self? 'Privado': 'Público'

  const help = Object.values(global.plugins).filter(p =>!p.disabled).map(p => ({
    help: Array.isArray(p.help)? p.help: [p.help],
    tags: Array.isArray(p.tags)? p.tags: [p.tags],
    prefix: 'customPrefix' in p,
    limit: p.limit,
    premium: p.premium
}))

  for (const plugin of help) {
    for (const t of plugin.tags) {
      if (!(t in tags)) tags[t] = textCyberpunk(t)
}
}

  const { before, header, body, footer, after} = defaultMenu

  const menuText = [
    before,
...Object.keys(tags).map(tag => {
      const cmds = help
.filter(menu => menu.tags.includes(tag))
.map(menu => menu.help.map(cmd => body.replace(/%cmd/g, menu.prefix? cmd: _p + cmd)).join('\n'))
.join('\n')
      return `${header.replace(/%category/g, tags[tag])}\n${cmds}\n${footer}`
}),
    after
  ].join('\n')

  const replace = {
    '%': '%',
    name,
    level,
    exp: exp - min,
    maxexp: xp,
    totalreg,
    mode,
    premium,
    readmore: String.fromCharCode(8206).repeat(4001)
}

  const finalMenu = menuText.replace(/%(\w+)/g, (_, key) => replace[key] || '')

  await conn.sendMessage(m.chat, {
    image: { url: 'https://files.catbox.moe/gm249p.jpg'},
    caption: finalMenu,
    footer: '🧠 Dev: Moonfrare',
    templateButtons: [
      { index: 1, quickReplyButton: { displayText: '📝 VERIFICAR', id: '.reg fede.13'}},
      { index: 2, quickReplyButton: { displayText: '💻 CODIGO', id: '.code'}}
    ],
    contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
        title: '🌸 Kaoruko Menu',
        body: 'Desarrollado por Moonfrare',
        thumbnailUrl: 'https://files.catbox.moe/gm249p.jpg',
        mediaType: 1,
        renderLargerThumbnail: true,
        showAdAttribution: false
}
}
}, { quoted: m})
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help']

export default handler

function clockString(ms) {
  const h = isNaN(ms)? '--': Math.floor(ms / 3600000)
  const m = isNaN(ms)? '--': Math.floor(ms / 60000) % 60
  const s = isNaN(ms)? '--': Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}
