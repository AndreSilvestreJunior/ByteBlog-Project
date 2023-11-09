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

Alpine.start()
