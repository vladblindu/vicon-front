export const toSSlot = (n: number): string => {
    let tmp
    const hour = Math.floor(n)
    tmp = hour < 10 ? "0" + hour.toString() : hour.toString()
    const min = Math.round((n - hour) * 100) / 100 * 60
    tmp += ":" + (min <= 0 ? "0" + min.toString() : min.toString())
    return tmp
}

export const toNSlot = (s: string): number => {
    const [sh, sm] = s.split(":")
    const m = Math.round(100 * parseInt(sm) / 60) / 100
    return parseInt(sh) + m
}


type TimeUnit = 1.0 | 0.25 | 0.5
export type WorkHours = [number, number]
type SlotQuery = number | string

// outside working hours error
const OWHError = new Error("Outside working hours slot requested.")

export type WDConfig = {
    // array [start time as num, end time as num]
    workHours: WorkHours
    // time slot unit (ex: 0.5 is 30min, 0.25 is 15min)
    timeUnit: TimeUnit
    // how many time units are required for a shooting session
    span: number
    shifts: 3
}

type WDSlot = {
    dayIndex: number
    index: number
    start: number,
    shift: number
    // client id
    cid?: number
    pid?: number
    wd: WorkDay,
    busy: Function
}

export class WorkDay {
    private readonly _slots: WDSlot[]
    public workHours: WorkHours
    public timeUnit: TimeUnit
    public span: number
    public readonly shifts: 3

    constructor(dayIndex: number, wdConf: WDConfig) {
        this._slots = []
        this.workHours = wdConf.workHours
        this.timeUnit = wdConf.timeUnit
        this.span = wdConf.span
        this.shifts = wdConf.shifts

        for (let i = 0; i < this.slotsPerDay; i++) {
            const _slot: WDSlot = {
                dayIndex: dayIndex,
                shift: Math.floor(i / this.slotsPerShift),
                index: i,
                start: wdConf.workHours[0] + i * wdConf.timeUnit,
                wd: this,
                busy: () => !!this._slots[i].cid
            }
            this._slots.push(_slot)
        }
    }

    get hoursPerDay() {
        return this.workHours[1] - this.workHours[0]
    }

    get slotsPerDay(){
        return Math.round(this.hoursPerDay / this.timeUnit)
    }

    get slotsPerShift(){
        return Math.floor(this.slotsPerDay / this.shifts)
    }
    get length(): number {
        return this._slots.length
    }

    busy(idx: number) {
        return !!this._slots[idx].cid
    }

    slot(idx: number) {
        return this._slots[idx]
    }

    getSlot(sq: SlotQuery): WDSlot {
        if (typeof sq === "string")
            sq = toNSlot(sq)
        if (sq < this.workHours[0] || sq > this.workHours[1])
            throw OWHError
        const sIdx = Math.round((sq - this.workHours[0]) / this.timeUnit * 100) / 100
        return this._slots[sIdx]
    }
}

