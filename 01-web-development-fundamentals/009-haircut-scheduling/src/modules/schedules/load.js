import { loadHours } from '../form/load-hours.js'

const selectedDate = document.getElementById('date')

export function schedulingDays() {
  loadHours({ date: selectedDate.value })
}
