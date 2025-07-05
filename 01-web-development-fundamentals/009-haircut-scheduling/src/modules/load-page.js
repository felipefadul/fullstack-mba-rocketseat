import { loadSchedulesOfTheDay } from './schedules/load-schedules-of-the-day.js'

const selectedDate = document.getElementById('date')

document.addEventListener('DOMContentLoaded', async () => {
  await loadSchedulesOfTheDay({ selectedDate })
})
