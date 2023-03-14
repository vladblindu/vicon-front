type SlotStatus = 0 | 1 | 2

type TimeUnit = 1.0 | 0.25 | 0.5

type WorkHours = [number, number]

type BookerConfig = {
    // project id
    slotStatus: number
    // array [start time as num, end time as num]
    workHours: WorkHours
    // time slot unit (ex: 0.5 is 30min, 0.25 is 15min)
    timeUnit: TimeUnit
    // how many time units are required for a shooting session
    span: number
    shifts: 3
    rules: BookerRules
}
type SlotId = [weekIndex: number, dayIndex: number, slotIndex: number]

type BookerRules = {
    noCrossShift?: boolean
    disabled?: string[]
}


type BookerEvent = {
    year: number,
    status: SlotStatus,
    week: number,
    day: number,
    slot: number
}

type BookerMeta = {
    weekSpan: number,
    startWeek: number,
    // current project id
    pid: number
}

type BookerData = {
    data: BookerEvent[],
    meta: BookerMeta
}

