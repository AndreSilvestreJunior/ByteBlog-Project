document.addEventListener('DOMContentLoaded', function () {
  const notifications = document.querySelectorAll('#alert[data-timeout]')
  const button = document.getElementById('close-button')

  if (button) button.onclick = close

  notifications.forEach(function (notification) {
    const timeout = parseInt(notification.getAttribute('data-timeout'))
    setTimeout(function () {
      notification.classList.add('animate-slideOut')
      setTimeout(function () {
        notification.remove()
      }, 1400)
    }, timeout)
  })
})

function close() {
  const notification = document.querySelector('#alert')
  notification.classList.add('animate-slideOut')
  setTimeout(function () {
    notification.remove()
  }, 1400)
}
