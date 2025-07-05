import { loadHoursForScheduling } from '../form/load-hours-for-scheduling.js'
import { getScheduleByDay } from '../../services/get-schedule-by-day.js'
import { displaySchedulesOfTheDay } from './display-schedules-of-the-day.js'

const selectedDate = document.getElementById('date')

export async function loadSchedulesOfTheDay() {
  const selectedDateValue = selectedDate.value

  const schedulesOfTheDay = await getScheduleByDay({ date: selectedDateValue })
  displaySchedulesOfTheDay({ schedulesOfTheDay })

  loadHoursForScheduling({ date: selectedDateValue, schedulesOfTheDay })
}
