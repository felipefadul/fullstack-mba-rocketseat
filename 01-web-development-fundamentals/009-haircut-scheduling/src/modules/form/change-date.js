import { loadSchedulesOfTheDay } from '../schedules/load-schedules-of-the-day.js'

const selectedDate = document.getElementById('date')

selectedDate.onchange = async () =>
  await loadSchedulesOfTheDay({ selectedDate })
