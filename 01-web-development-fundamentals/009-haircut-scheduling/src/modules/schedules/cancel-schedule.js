import { deleteSchedule } from '../../services/delete-schedule.js'
import { loadSchedulesOfTheDay } from './load-schedules-of-the-day.js'

export async function cancelSchedule({ scheduleItem, selectedDate }) {
  const isConfirmed = confirm('Are you sure you want to cancel this schedule?')

  if (!isConfirmed) return

  const scheduleId = scheduleItem.getAttribute('data-id')

  const response = await deleteSchedule({ scheduleId })

  if (!response?.ok) return alert('Failed to delete schedule')

  scheduleItem.remove()

  await loadSchedulesOfTheDay({ selectedDate })

  alert('Schedule deleted successfully!')
}
