type TimeUnit = 1.0 | 0.25 | 0.5

type WorkHours = [number, number]

type SlotQuery = number | string

// outside working hours error
export type WDConfig = {
    // array [start time as num, end time as num]
    workHours: WorkHours
    // time slot unit (ex: 0.5 is 30min, 0.25 is 15min)
    timeUnit: TimeUnit
    // how many time units are required for a shooting session
    span: number
    shifts: 3
    rules: WDRules
}

export type WDSlot = {
    dayIndex: number
    index: number
    start: number,
    shift: number
    // client id
    cid?: number
    pid?: number
    wd: WorkDay,
    busy: Function
    disabled: boolean
}

export type WDRules = {
    noCrossShift?: boolean
    disabled?: string[]
}