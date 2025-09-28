import moment from 'moment-timezone'

const handler = async (m, { conn, command, usedPrefix, text}) => {
  try {
    const user = global.db.data.users[m.sender]

    if (command === 'setprofile') {
      return m.reply(
        `✦ Ingresa la categoría que quieras modificar.\n\n🜸 *_Categorías disponibles:_*\n\n` +
        `*• ${usedPrefix}setbirth <01/01/2000>*\n> Establece tu fecha de cumpleaños.\n` +
        `*• ${usedPrefix}delbirth*\n> Borra tu fecha de cumpleaños.\n` +
        `*• ${usedPrefix}setgenre <Hombre|Mujer>*\n> Establece tu género.\n` +
        `*• ${usedPrefix}delgenre*\n> Borra tu género.\n` +
        `*• ${usedPrefix}setdesc <texto>*\n> Establece una descripción para tu perfil.\n` +
        `*• ${usedPrefix}deldesc*\n> Borra tu descripción.`
)
}

    if (command === 'setbirth') {
      if (!text) return conn.reply(m.chat, `❀ Debes ingresar una fecha válida.\n> Ejemplo: *${usedPrefix + command} 01/01/2000*`, m)

      const regex = /^\d{1,2}\/\d{1,2}\/\d{4}$/
      if (!regex.test(text)) return conn.reply(m.chat, `ꕥ Formato incorrecto.\n> Usa: *${usedPrefix + command} 01/12/2000*`, m)

      const [d, mth, y] = text.split('/').map(Number)
      const fecha = moment.tz({ day: d, month: mth - 1, year: y}, 'America/Caracas')
      const edad = moment.tz('America/Caracas').diff(fecha, 'years')

      if (!fecha.isValid() || edad < 5 || edad> 120) {
        return conn.reply(m.chat, `ꕥ La fecha ingresada no es válida o no tiene lógica.`, m)
}

      const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
      user.birth = `${d} de ${meses[mth - 1]} de ${y}`
      return conn.reply(m.chat, `❀ Fecha de nacimiento establecida como: *${user.birth}*`, m)
}

    if (command === 'delbirth') {
      if (!user.birth) return conn.reply(m.chat, `ꕥ No tienes una fecha de nacimiento establecida.`, m)
      user.birth = ''
      return conn.reply(m.chat, `❀ Tu fecha de nacimiento ha sido eliminada.`, m)
}

    if (command === 'setgenre' || command === 'setgenero') {
      if (!text) return conn.reply(m.chat, `❀ Debes ingresar un género válido.\n> Ejemplo: *${usedPrefix + command} hombre*`, m)

      const genre = text.toLowerCase() === 'hombre'? 'Hombre'
: text.toLowerCase() === 'mujer'? 'Mujer'
: null

      if (!genre) return conn.reply(m.chat, `ꕥ Género no reconocido.\n> Usa: *${usedPrefix + command} hombre*`, m)
      if (user.genre === genre) return conn.reply(m.chat, `ꕥ Ya tienes establecido el género como *${user.genre}*.`, m)

      user.genre = genre
      return conn.reply(m.chat, `❀ Género actualizado a: *${user.genre}*`, m)
}

    if (command === 'delgenre') {
      if (!user.genre) return conn.reply(m.chat, `ꕥ No tienes un género asignado.`, m)
      user.genre = ''
      return conn.reply(m.chat, `❀ Tu género ha sido eliminado.`, m)
}

    if (command === 'setdescription' || command === 'setdesc') {
      if (!text) return conn.reply(m.chat, `❀ Debes escribir una descripción válida.\n> Ejemplo: *${usedPrefix + command} Hola, uso WhatsApp!*`, m)
      user.description = text
      return conn.reply(m.chat, `❀ Descripción establecida. Puedes verla con *#profile* ฅ^•ﻌ•^ฅ`, m)
}

    if (command === 'deldescription' || command === 'deldesc') {
      if (!user.description) return conn.reply(m.chat, `ꕥ No tienes una descripción establecida.`, m)
      user.description = ''
      return conn.reply(m.chat, `❀ Tu descripción ha sido eliminada.`, m)
}

} catch (error) {
m.reply(`⚠︎ Se ha producido un problema.\n> Usa *${usedPrefix}report* para informarlo.\n\n${error.message}`)
}
}

handler.help = ['setprofile', 'setbirth', 'delbirth', 'setgenre', 'setgenero', 'delgenre', 'setdescription', 'setdesc', 'deldescription', 'deldesc']
handler.tags = ['rg']
handler.command = ['setprofile', 'setbirth', 'delbirth', 'setgenre', 'setgenero', 'delgenre', 'setdescription', 'setdesc', 'deldescription', 'deldesc']
handler.group = true

export default handler
