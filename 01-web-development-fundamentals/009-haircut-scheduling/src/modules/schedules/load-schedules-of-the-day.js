import { loadHoursForScheduling } from '../form/load-hours-for-scheduling.js'
import { getScheduleByDay } from '../../services/get-schedule-by-day.js'
import { displaySchedulesOfTheDay } from './display-schedules-of-the-day.js'

export async function loadSchedulesOfTheDay({ selectedDate }) {
  const selectedDateValue = selectedDate.value

  const schedulesOfTheDay = await getScheduleByDay({ date: selectedDateValue })
  displaySchedulesOfTheDay({ schedulesOfTheDay, selectedDate })

  loadHoursForScheduling({ date: selectedDateValue, schedulesOfTheDay })
}
