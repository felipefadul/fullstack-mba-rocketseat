import dayjs from 'dayjs'
import { apiConfig } from './api-config.js'

export async function getScheduleByDay({ date }) {
  try {
    const response = await fetch(`${apiConfig.baseURL}/schedules`)

    const data = await response.json()

    const scheduleByDay = data.filter((schedule) =>
      dayjs(date).isSame(schedule.date, 'day')
    )

    return scheduleByDay
  } catch (error) {
    console.error(error)
    throw new Error('Failed to get schedule by day')
  }
}
