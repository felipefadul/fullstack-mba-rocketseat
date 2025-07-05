import { apiConfig } from './api-config.js'

export async function deleteSchedule({ scheduleId }) {
  try {
    const response = await fetch(
      `${apiConfig.baseURL}/schedules/${scheduleId}`,
      {
        method: 'DELETE',
      }
    )

    return response
  } catch (error) {
    console.error(error)
    alert('Failed to delete schedule')
  }
}
