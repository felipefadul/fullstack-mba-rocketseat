import dayjs from 'dayjs'
import { openingHours } from '../../utils/opening-hours.js'
import { convertHoursTo12hFormat } from '../../utils/convert-hours.js'

const hours = document.getElementById('hours')

export function loadHours({ date = dayjs() }) {
  const openingHoursWithAvailability = openingHours.map((hour) => {
    const currentDate = dayjs()
    const [scheduleHour] = hour.split(':')
    const isHourAvailable = dayjs(date)
      .add(scheduleHour, 'hour')
      .isAfter(currentDate)

    return {
      hour,
      available: isHourAvailable,
    }
  })

  openingHoursWithAvailability.forEach(({ hour, available }) => {
    const li = document.createElement('li')
    li.classList.add('hour')
    li.classList.add(available ? 'hour-available' : 'hour-unavailable')
    li.textContent = convertHoursTo12hFormat(hour)

    if (hour === '9:00') {
      addHourPeriod('Morning')
    } else if (hour === '12:00') {
      addHourPeriod('Afternoon')
    } else if (hour === '18:00') {
      addHourPeriod('Evening')
    }

    hours.append(li)
  })
}

function addHourPeriod(periodTitle) {
  const header = document.createElement('li')
  header.classList.add('hour-period')
  header.textContent = periodTitle

  hours.append(header)
}
