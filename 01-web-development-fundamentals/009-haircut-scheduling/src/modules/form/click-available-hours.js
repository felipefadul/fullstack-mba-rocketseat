export function clickAvailableHours() {
  const availableHours = document.querySelectorAll('.hour-available')

  availableHours.forEach((availableHour) => {
    availableHour.addEventListener('click', (selectedHour) => {
      availableHours.forEach((hour) => {
        hour.classList.remove('hour-selected')
      })

      selectedHour.target.classList.add('hour-selected')
    })
  })
}
