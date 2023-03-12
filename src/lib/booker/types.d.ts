import {Day} from "./day.class"


type TimeUnit = 1.0 | 0.25 | 0.5

type WorkHours = [number, number]

type BookerConfig = {
    // project id
    pid: number
    // array [start time as num, end time as num]
    workHours: WorkHours
    // time slot unit (ex: 0.5 is 30min, 0.25 is 15min)
    timeUnit: TimeUnit
    // how many time units are required for a shooting session
    span: number
    shifts: 3
    rules: BookerRules
}

type DisabledChecker = (di: number, si: number) => boolean

type BookerRules = {
    noCrossShift?: boolean
    disabled?: string[]
}

type SlotData = {
    dayIndex: number
    slotIndex: number
    disabled: boolean
    parent: Day
    pid?: number,

    bookSlot: Function
}

type Booked = {
    pid: number,
    year: number,
    week: number,
    day: number,
    slot: number
}

type BookerData = Booked[]
