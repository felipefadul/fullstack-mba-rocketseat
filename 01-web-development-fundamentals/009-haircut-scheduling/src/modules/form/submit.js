import dayjs from 'dayjs'

const form = document.querySelector('form')
const selectedDate = document.getElementById('date')

const currentDate = dayjs().format('YYYY-MM-DD')
selectedDate.value = currentDate
selectedDate.min = currentDate

form.onsubmit = (event) => {
  event.preventDefault()
}
