let handler = async (m, { text, usedPrefix, command}) => {
  const userId = m.sender
  const userData = global.db.data.users[userId] ||= {}

  if (command === 'setmeta') {
    const packParts = text.split(/[\u2022|•]/).map(part => part.trim()).filter(Boolean)

    if (packParts.length < 2) {
      return m.reply(
        `❀ Por favor, escribe el *pack* y el *autor* que deseas usar por defecto para tus stickers.\n\n` +
        `> Ejemplo: *${usedPrefix + command} Moonfrare • Kaoruko*`
)
}

    const [packName, authorName] = packParts
    userData.text1 = packName
    userData.text2 = authorName
    await global.db.write()

    return m.reply(
      `❀ Se ha actualizado tu metadata de stickers:\n\n` +
      `• Pack: *${packName}*\n` +
      `• Autor: *${authorName}*`
)
}

  if (command === 'delmeta') {
    if (!userData.text1 &&!userData.text2) {
      return m.reply(`ꕥ No tienes un pack de stickers establecido que se pueda eliminar.`)
}

    delete userData.text1
    delete userData.text2
    await global.db.write()

    return m.reply(`❀ Se ha restablecido el pack y autor por defecto para tus stickers.`)
}
}

handler.help = ['setmeta', 'delmeta']
handler.tags = ['tools']
handler.command = ['setmeta', 'delmeta']
handler.group = true

export default handler
