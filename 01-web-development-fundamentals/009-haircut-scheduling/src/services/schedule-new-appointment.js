import { apiConfig } from './api-config'

export async function scheduleNewAppointment({ id, clientName, date }) {
  try {
    await fetch(`${apiConfig.baseURL}/schedules`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        clientName,
        date,
      }),
    })

    alert('Appointment created successfully!')
  } catch (error) {
    console.error(error)
    alert('An unexpected error has occurred while creating a new appointment')
  }
}
