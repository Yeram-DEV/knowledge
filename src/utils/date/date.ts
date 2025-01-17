import { format, format as _format, formatDistanceToNow, isAfter, isBefore, isEqual, isValid } from 'date-fns'
import { ko } from 'date-fns/locale/ko'

export type DateFnsDateType = number | Date

export const kstFormat = (date: DateFnsDateType, format: string) => _format(date, format, { locale: ko })

export const roundUpHoursInDays = (hours: number) => {
  const remainder = hours % 24
  return remainder === 0 ? hours : hours + 24 - (hours % 24)
}

export function parseYYYYMMDD(yyyyMMdd: string) {
  const date = new Date(yyyyMMdd)
  if (isValid(date)) {
    return date
  }
  throw new Error('Invalid date format')
}

export function getDateDistance(startDate: Date, endDate: Date) {
  const SECOND_TO_MS = 1000
  const MINUTE_TO_MS = 1000 * 60
  const HOUR_TO_MS = 1000 * 60 * 60
  const DAY_TO_MS = 1000 * 60 * 60 * 24

  const endTime = endDate.getTime()
  const startTime = startDate.getTime()
  const distance = endTime - startTime

  if (distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return {
    days: Math.floor(distance / DAY_TO_MS),
    hours: Math.floor((distance % DAY_TO_MS) / HOUR_TO_MS),
    minutes: Math.floor((distance % HOUR_TO_MS) / MINUTE_TO_MS),
    seconds: Math.floor((distance % MINUTE_TO_MS) / SECOND_TO_MS)
  }
}

export function isEqualOrBefore(lhs: Date, rhs: Date) {
  return isEqual(lhs, rhs) || isBefore(lhs, rhs)
}

export function isEqualOrAfter(lhs: Date, rhs: Date) {
  return isEqual(lhs, rhs) || isAfter(lhs, rhs)
}

export type TimeUnits = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface Options {
  separator?: string
  days?: (timeUnits: TimeUnits) => boolean
  hours?: (timeUnits: TimeUnits) => boolean
  minutes?: (timeUnits: TimeUnits) => boolean
  seconds?: (timeUnits: TimeUnits) => boolean
}

export function getDateDistanceText(timeUnits: TimeUnits, options: Options = {}) {
  const texts = []
  const {
    separator = ' ',
    days: daysConditionFn = (t) => t.days > 0,
    hours: hoursConditionFn = (t) => t.hours > 0,
    minutes: minutesConditionFn = (t) => t.minutes > 0,
    seconds: secondsConditionFn = (t) => t.seconds > 0
  } = options

  if (daysConditionFn(timeUnits)) {
    texts.push(`${timeUnits.days}일`)
  }

  if (hoursConditionFn(timeUnits)) {
    texts.push(`${timeUnits.hours}시간`)
  }

  if (minutesConditionFn(timeUnits)) {
    texts.push(`${timeUnits.minutes}분`)
  }

  if (secondsConditionFn(timeUnits)) {
    texts.push(`${timeUnits.seconds}초`)
  }

  return texts.join(separator).trim()
}

export function getDateDistanceTextToNow(date: string) {
  const d = new Date(date)
  const now = Date.now()
  const diff = (now - d.getTime()) / 1000 // 현재 시간과의 차이(초)
  if (diff < 60) {
    return '방금 전'
  }
  if (diff < 60 * 60 * 24 * 3) {
    // 3일 미만일땐 시간차이 출력(몇시간 전, 몇일 전)
    return formatDistanceToNow(d, { addSuffix: true, locale: ko })
  }

  return format(d, 'PPP EEE', { locale: ko }) // 날짜 포맷
}
