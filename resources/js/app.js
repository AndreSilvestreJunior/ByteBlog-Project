import '../css/app.css'
import '../js/toast'
import Alpine from 'alpinejs'

window.Alpine = Alpine

Alpine.data('modal', () => ({
  open: false,
  toggle() {
    this.open = !this.open
  },
}))

Alpine.data('theme', () => ({
  theme: localStorage.getItem('theme') === 'dark',

  activeDark() {
    this.theme = true
    localStorage.setItem('theme', 'dark')
  },
  disableDark() {
    this.theme = false
    localStorage.setItem('theme', 'light')
  },
}))

Alpine.data('dropdown', () => ({
  open: false,

  toggle() {
    this.open = !this.open
  },
  disable() {
    this.open = false
  },
}))

Alpine.start()

function calculateDaysDifference(date) {
  const dataFinal = new Date()

  const milissegundosEmUmMinuto = 1000 * 60
  const milissegundosEmUmaHora = milissegundosEmUmMinuto * 60
  const milissegundosEmUmDia = milissegundosEmUmaHora * 24
  const milissegundosEmUmMes = milissegundosEmUmDia * 30
  const milissegundosEmUmAno = milissegundosEmUmDia * 365

  const diferencaEmMilissegundos = dataFinal - date

  if (diferencaEmMilissegundos < milissegundosEmUmMinuto) {
    const minutos = Math.floor(diferencaEmMilissegundos / milissegundosEmUmMinuto)
    return `${minutos}min`
  } else if (diferencaEmMilissegundos < milissegundosEmUmaHora) {
    const horas = Math.floor(diferencaEmMilissegundos / milissegundosEmUmaHora)
    return `${horas}hr`
  } else if (diferencaEmMilissegundos < milissegundosEmUmDia) {
    const dias = Math.floor(diferencaEmMilissegundos / milissegundosEmUmDia)
    return `${dias}d`
  } else if (diferencaEmMilissegundos < milissegundosEmUmMes) {
    const meses = Math.floor(diferencaEmMilissegundos / milissegundosEmUmMes)
    return `${meses}m`
  } else {
    const anos = Math.floor(diferencaEmMilissegundos / milissegundosEmUmAno)
    return `${anos}a`
  }
}
