import dayjs from 'dayjs'
import { convertHoursTo24hFormat } from '../../utils/convert-hours.js'

const form = document.querySelector('form')
const selectedDate = document.getElementById('date')
const clientNameInput = document.getElementById('client')

const currentDate = dayjs().format('YYYY-MM-DD')
selectedDate.value = currentDate
selectedDate.min = currentDate

form.onsubmit = (event) => {
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

    const newScheduling = {
      id: schedulingId,
      clientName,
      date: selectedDateWithHour,
    }
  } catch (error) {
    alert('An unexpected error has occurred while scheduling an appointment')
    console.error(error)
  }
}
