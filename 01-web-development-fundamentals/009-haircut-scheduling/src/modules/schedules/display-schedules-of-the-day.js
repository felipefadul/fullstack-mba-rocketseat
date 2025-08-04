import dayjs from 'dayjs'
import { cancelSchedule } from './cancel-schedule.js'

const morningPeriod = document.getElementById('period-morning')
const afternoonPeriod = document.getElementById('period-afternoon')
const eveningPeriod = document.getElementById('period-evening')

export function displaySchedulesOfTheDay({ schedulesOfTheDay, selectedDate }) {
  try {
    morningPeriod.innerHTML = ''
    afternoonPeriod.innerHTML = ''
    eveningPeriod.innerHTML = ''

    schedulesOfTheDay.forEach((schedule) => {
      const scheduleItem = document.createElement('li')
      const time = document.createElement('strong')
      const clientName = document.createElement('span')
      const cancelIcon = document.createElement('img')

      scheduleItem.setAttribute('data-id', schedule.id)
      time.textContent = dayjs(schedule.date).format('h:mm a')
      clientName.textContent = schedule.clientName

      cancelIcon.classList.add('cancel-icon')
      cancelIcon.setAttribute('src', './src/assets/icons/cancel.svg')
      cancelIcon.setAttribute('alt', 'Cancel')
      cancelIcon.onclick = async () => {
        await cancelSchedule({ scheduleItem, selectedDate })
      }

      scheduleItem.append(time, clientName, cancelIcon)
      const hour = dayjs(schedule.date).hour()

      if (hour < 12) {
        morningPeriod.appendChild(scheduleItem)
      } else if (hour >= 12 && hour < 18) {
        afternoonPeriod.appendChild(scheduleItem)
      } else {
        eveningPeriod.appendChild(scheduleItem)
      }
    })
  } catch (error) {
    console.error(error)
    alert('Failed to display schedule of the day')
  }
}
