import View from '@ioc:Adonis/Core/View'

View.global('prettyTime', function (date) {
  const dataFinal = new Date()

  const milissegundosEmUmMinuto = 1000 * 60
  const milissegundosEmUmaHora = milissegundosEmUmMinuto * 60
  const milissegundosEmUmDia = milissegundosEmUmaHora * 24
  const milissegundosEmUmMes = milissegundosEmUmDia * 30
  const milissegundosEmUmAno = milissegundosEmUmDia * 365

  const diferencaEmMilissegundos = dataFinal - new Date(date)

  if (diferencaEmMilissegundos < milissegundosEmUmMinuto) {
    const minutos = Math.floor(diferencaEmMilissegundos / 1000)
    return `${minutos}s`
  } else if (diferencaEmMilissegundos < milissegundosEmUmaHora) {
    const minutos = Math.floor(diferencaEmMilissegundos / milissegundosEmUmMinuto)
    return `${minutos}min`
  } else if (diferencaEmMilissegundos < milissegundosEmUmDia) {
    const horas = Math.floor(diferencaEmMilissegundos / milissegundosEmUmaHora)
    return `${horas}hr`
  } else if (diferencaEmMilissegundos < milissegundosEmUmMes) {
    const dias = Math.floor(diferencaEmMilissegundos / milissegundosEmUmDia)
    return `${dias}d`
  } else if (diferencaEmMilissegundos < milissegundosEmUmAno) {
    const meses = Math.floor(diferencaEmMilissegundos / milissegundosEmUmMes)
    return `${meses}m`
  } else {
    const anos = Math.floor(diferencaEmMilissegundos / milissegundosEmUmAno)
    return `${anos}a`
  }
})
