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
