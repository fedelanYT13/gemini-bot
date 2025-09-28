import { execSync} from 'child_process'

const handler = async (m, { conn, text}) => {
  const sender = m.sender.split('@')[0]
  if (!global.owner.includes(sender)) {
    return conn.reply(m.chat, '⛔ Solo el owner puede usar este comando.', m)
}

  await m.react('🕒')

  try {
    const stdout = execSync('git pull' + (text? ' ' + text: ''))
    let messager = stdout.toString().trim()

    if (!messager) messager = '✅ El bot ya está actualizado. No hay cambios nuevos.'
    else if (messager.includes('Already up to date')) messager = '✅ Ya está todo al día.'
    else if (messager.includes('Updating')) messager = '🔄 Actualizando archivos del bot...\n\n' + messager

    await m.react('✔️')
    await conn.reply(m.chat, messager, m)

} catch (err) {
    try {
      const status = execSync('git status --porcelain')
      const conflictedFiles = status.toString().split('\n').filter(line => {
        return line.trim() &&!line.includes('.npm/') &&!line.includes('.cache/') &&
!line.includes('tmp/') &&!line.includes('database.json') &&
!line.includes('sessions/Principal/') &&!line.includes('npm-debug.log')
}).map(line => '*→ ' + line.slice(3))

      if (conflictedFiles.length> 0) {
        const errorMessage = `⚠️ No se pudo actualizar:\n\n> Se encontraron conflictos locales:\n\n${conflictedFiles.join('\n')}`
        await conn.reply(m.chat, errorMessage, m)
        await m.react('✖️')
        return
}
} catch (error) {
      console.error(error)
      let errorMessage2 = '⚠️ Error inesperado.'
      if (error.message) errorMessage2 += '\n🧾 Detalle: ' + error.message
      await conn.reply(m.chat, errorMessage2, m)
}
}
}

handler.help = ['update']
handler.tags = ['owner']
handler.command = ['update', 'fix', 'actualizar']

export default handler
