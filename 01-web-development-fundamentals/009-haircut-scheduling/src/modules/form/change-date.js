import { schedulingDays } from '../schedules/load.js'

const selectedDate = document.getElementById('date')

selectedDate.onchange = () => schedulingDays()
