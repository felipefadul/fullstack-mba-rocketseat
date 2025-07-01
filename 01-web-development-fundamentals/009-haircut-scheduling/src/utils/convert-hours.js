export function convertHoursTo12hFormat(hourIn24hFormat) {
  const [hours, minutes] = hourIn24hFormat.split(':')
  const period = hours >= 12 && hours !== '24' ? 'pm' : 'am'
  const hoursIn12HourFormat = hours % 12 || 12
  return `${hoursIn12HourFormat}:${minutes} ${period}`
}

export function convertHoursTo24hFormat(hourIn12hFormat) {
  const [hours, minutesAndPeriod] = hourIn12hFormat.split(':')
  const [minutes, period] = minutesAndPeriod.split(' ')
  const hoursIn24HourFormat =
    (period === 'pm' && hours !== '12') || (period === 'am' && hours === '12')
      ? parseInt(hours) + 12
      : hours

  return `${hoursIn24HourFormat}:${minutes}`
}
