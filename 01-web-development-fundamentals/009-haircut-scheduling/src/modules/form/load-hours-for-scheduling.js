import dayjs from 'dayjs'
import { openingHours } from '../../utils/opening-hours.js'
import { convertHoursTo12hFormat } from '../../utils/convert-hours.js'
import { clickAvailableHours } from './click-available-hours.js'

const hours = document.getElementById('hours')

export function loadHoursForScheduling({ date = dayjs(), schedulesOfTheDay }) {
  hours.innerHTML = ''

  const hoursAlreadyScheduled = schedulesOfTheDay.map((schedule) =>
    dayjs(schedule.date).format('H:mm')
  )

  const openingHoursWithAvailability = openingHours.map((hour) => {
    const currentDate = dayjs()
    const scheduleHour = hour.split(':')[0]
    const isHourAlreadyScheduled = hoursAlreadyScheduled.includes(hour)
    const isHourInTheFuture = dayjs(date)
      .add(scheduleHour, 'hour')
      .isAfter(currentDate)
    const isHourAvailable = !isHourAlreadyScheduled && isHourInTheFuture

    return {
      hour,
      isHourAvailable,
    }
  })

  openingHoursWithAvailability.forEach(({ hour, isHourAvailable }) => {
    const li = document.createElement('li')
    li.classList.add('hour')
    li.classList.add(isHourAvailable ? 'hour-available' : 'hour-unavailable')
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

  clickAvailableHours()
}

function addHourPeriod(periodTitle) {
  const header = document.createElement('li')
  header.classList.add('hour-period')
  header.textContent = periodTitle

  hours.append(header)
}
