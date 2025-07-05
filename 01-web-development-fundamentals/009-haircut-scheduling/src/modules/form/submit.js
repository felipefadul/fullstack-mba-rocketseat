import dayjs from 'dayjs'
import { convertHoursTo24hFormat } from '../../utils/convert-hours.js'
import { scheduleNewAppointment } from '../../services/schedule-new-appointment.js'
import { loadSchedulesOfTheDay } from '../schedules/load-schedules-of-the-day.js'

const form = document.querySelector('form')
const selectedDate = document.getElementById('date')
const clientNameInput = document.getElementById('client')

const currentDate = dayjs().format('YYYY-MM-DD')
selectedDate.value = currentDate
selectedDate.min = currentDate

form.onsubmit = async (event) => {
  event.preventDefault()

  try {
    const clientName = clientNameInput.value.trim()

    if (!clientName) {
      return alert('Please enter a client name')
    }

    const selectedHour = document.querySelector('.hour-selected')

    if (!selectedHour) {
      return alert('Please select a time')
    }

    const hourIn12hFormat = selectedHour.innerText
    const hourIn24hFormat = convertHoursTo24hFormat(hourIn12hFormat)
    const hourWithoutMinutes = hourIn24hFormat.split(':')[0]

    const selectedDateWithHour = dayjs(selectedDate.value).add(
      hourWithoutMinutes,
      'hour'
    )

    const schedulingId = new Date().getTime()

    const newAppointment = {
      id: schedulingId,
      clientName,
      date: selectedDateWithHour,
    }

    await scheduleNewAppointment(newAppointment)

    await loadSchedulesOfTheDay({ selectedDate })

    clientNameInput.value = ''
  } catch (error) {
    console.error(error)
    alert('An unexpected error has occurred while scheduling an appointment')
  }
}
