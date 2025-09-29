import { readdirSync, unlinkSync, existsSync, promises as fs} from 'fs'
import path from 'path'
import cp from 'child_process'
import { promisify} from 'util'
import moment from 'moment-timezone'
import fetch from 'node-fetch'

const exec = promisify(cp.exec).bind(cp)
const linkRegex = /https:\/\/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i

const handler = async (m, { conn, text, command, usedPrefix}) => {
  try {
    const nombre = m.pushName || 'Anónimo'
    const tag = '@' + m.sender.split('@')[0]
    const usertag = Array.from(new Set([...text.matchAll(/@(\d{5,})/g)]), m => `${m[1]}@s.whatsapp.net`)
    const chatLabel = m.isGroup? (await conn.getName(m.chat) || 'Grupo'): 'Privado'
    const horario = moment.tz('America/Caracas').format('DD/MM/YYYY hh:mm:ss A')

    switch (command) {
      case 'suggest':
      case 'sug': {
        if (!text) return conn.reply(m.chat, '❀ Por favor, escribe tu sugerencia para el desarrollador del bot.', m)
        if (text.length < 10) return conn.reply(m.chat, 'ꕥ La sugerencia debe tener al menos 10 caracteres.', m)

        await m.react('🕒')
        const sug = `✦ 𝐒𝐔𝐆𝐄𝐑𝐄𝐍𝐂𝐈𝐀 𝐄𝐍𝐕𝐈𝐀𝐃𝐀\n\nꕥ *Usuario* » ${nombre}\n✩ *Tag* » ${tag}\n✿ *Sugerencia* » ${text}\n✦ *Chat* » ${chatLabel}\n✰ *Fecha* » ${horario}\n♤ *InfoBot* » ${botname} / ${vs}`
        await conn.sendMessage(`${suittag}@s.whatsapp.net`, { text: sug, mentions: [m.sender,...usertag]}, { quoted: m})
        await m.react('✔️')
        m.reply('❀ ¡Gracias! Tu sugerencia ha sido enviada al desarrollador.')
        break
}

      case 'report':
      case 'reportar': {
        if (!text) return conn.reply(m.chat, '❀ Describe el error que deseas reportar.', m)
        if (text.length < 10) return conn.reply(m.chat, 'ꕥ El reporte debe tener al menos 10 caracteres.', m)

        await m.react('🕒')
        const rep = `✦ 𝐑𝐄𝐏𝐎𝐑𝐓𝐄 𝐄𝐍𝐕𝐈𝐀𝐃𝐎\n\nꕥ *Usuario* » ${nombre}\n✩ *Tag* » ${tag}\n✿ *Reporte* » ${text}\n✦ *Chat* » ${chatLabel}\n✰ *Fecha* » ${horario}\n♤ *InfoBot* » ${botname} / ${vs}`
        await conn.sendMessage(`${suittag}@s.whatsapp.net`, { text: rep, mentions: [m.sender,...usertag]}, { quoted: m})
        await m.react('✔️')
        m.reply('❀ El reporte ha sido enviado correctamente. Gracias por tu colaboración.')
        break
}

      case 'invite': {
        if (!text) return m.reply('❀ Por favor, envía el enlace de invitación del grupo.')
        const [_, code] = text.match(linkRegex) || []
        if (!code) return m.reply('ꕥ El enlace no es válido.')

        await m.react('🕒')
        const invite = `✦ 𝐈𝐍𝐕𝐈𝐓𝐀𝐂𝐈𝐎́𝐍 𝐆𝐑𝐔𝐏𝐀𝐋\n\nꕥ *Usuario* » ${nombre}\n✩ *Tag* » ${tag}\n✿ *Chat* » ${chatLabel}\n✰ *Fecha* » ${horario}\n♤ *InfoBot* » ${botname} / ${vs}\n✦ *Link* » ${text}`

        const mainBotNumber = global.conn.user.jid.split('@')[0]
        const senderBotNumber = conn.user.jid.split('@')[0]
        const target = mainBotNumber === senderBotNumber? suittag: senderBotNumber

        await conn.sendMessage(`${target}@s.whatsapp.net`, { text: invite, mentions: [m.sender,...usertag]}, { quoted: m})
        await m.react('✔️')
        m.reply('❀ ¡Gracias por tu invitación! El enlace fue enviado correctamente.')
        break
}

      case 'speedtest':
      case 'stest': {
        await m.react('🕒')
        const { stdout, stderr} = await exec('python3./lib/ookla-speedtest.py --secure --share')

        const sendSpeedImage = async (output) => {
          const url = output.match(/http[^"]+\.png/)?.[0]
          if (url) await conn.sendMessage(m.chat, { image: { url}, caption: output.trim()}, { quoted: m})
}

        if (stdout.trim()) await sendSpeedImage(stdout)
        if (stderr.trim()) await sendSpeedImage(stderr)

        await m.react('✔️')
        break
}

      case 'fixmsg':
      case 'ds': {
      if (global.conn.user.jid!== conn.user.jid)
          return conn.reply(m.chat, '❀ Este comando solo puede usarse desde el número principal del bot.', m)

        await m.react('🕒')
        const chatIdList = m.isGroup? [m.chat, m.sender]: [m.sender]
        const sessionPath = './Sessions/'
        const files = await fs.readdir(sessionPath)
        let count = 0

        for (const file of files) {
          for (const id of chatIdList) {
            if (file.includes(id.split('@')[0])) {
              await fs.unlink(path.join(sessionPath, file))
              count++
              break
}
}
}

        await m.react(count === 0? '✖️': '✔️')
        conn.reply(m.chat, count === 0
? 'ꕥ No se encontraron archivos relacionados con tu ID.'
: `ꕥ Se eliminaron ${count} archivos de sesión.`, m)
        break
}

      case 'script':
      case 'sc': {
        await m.react('🕒')
        const res = await fetch('https://api.github.com/repos/Dev-fedexyz17')
        if (!res.ok) throw new Error('No se pudo obtener los datos del repositorio.')

        const json = await res.json()
        const txt = `*乂  S C R I P T  -  M A I N  乂*\n\n✩ *Nombre*: ${json.name}\n✩ *Visitas*: ${json.watchers_count}\n✩ *Peso*: ${(json.size / 1024).toFixed(2)} MB\n✩ *Actualizado*: ${moment(json.updated_at).format('DD/MM/YY - HH:mm:ss')}\n✩ *Url*: ${json.html_url}\n✩ *Forks*: ${json.forks_count}\n✩ *Stars*: ${json.stargazers_count}\n\n> *${dev}*`

        await conn.sendMessage(m.chat, { image: catalogo, caption: txt,...rcanal}, { quoted: m})
        await m.react('✔️')
        break
}
}
} catch (err) {
    await m.react('✖️')
    conn.reply(m.chat, `⚠︎ Se ha producido un problema.\n> Usa *${usedPrefix}report* para informarlo.\n\n${err.message}`, m)
}
}

handler.help = ['suggest', 'reporte', 'invite', 'speedtest', 'fixmsg', 'script']
handler.tags = ['main']
handler.command = ['suggest', 'sug', 'report', 'reportar', 'invite', 'speedtest', 'stest', 'fixmsg', 'ds', 'script', 'sc']

export default handler
