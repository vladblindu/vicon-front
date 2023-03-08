import {nanoid} from "nanoid"

// const WEEKDAYS = ["luni", "marți", "miercuri", "joi", "vineri", "sâmbătă", "duminică"]
// const freeze = 7
// const toDay = new Date().getDay()
export const toSSlot = (n: number): string => {
    let tmp
    const hour = Math.floor(n)
    tmp = hour < 10 ? "0" + hour.toString() : hour.toString()
    const min = Math.round((n - hour) * 100) / 100 * 60
    tmp += ":" + (min < 0 ? "0" + min.toString() : min.toString())
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
    id: string
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
    public readonly shiftsPerDay: 3
    public hoursPerDay: number
    public slotsPerDay: number
    public slotsPerShift: number

    constructor(wdConf: WDConfig) {
        this._slots = []
        this.workHours = wdConf.workHours
        this.timeUnit = wdConf.timeUnit
        this.span = wdConf.span
        this.shiftsPerDay = wdConf.shifts
        this.hoursPerDay = wdConf.workHours[1] - wdConf.workHours[0]
        this.slotsPerDay = Math.round(this.hoursPerDay / wdConf.timeUnit)
        this.slotsPerShift = Math.floor(this.slotsPerDay / wdConf.shifts)

        for (let i = 0; i < this.slotsPerDay; i++) {
            const _slot: WDSlot = {
                id: nanoid(),
                shift: Math.floor(i / this.slotsPerShift),
                index: i,
                start: wdConf.workHours[0] + i * wdConf.timeUnit,
                wd: this,
                busy: () => !!this._slots[i].cid
            }
            this._slots.push(_slot)
        }
    }

    get length(): number {
        return this._slots.length
    }

    busy(idx:number){
        return !!this._slots[idx].cid
    }

    toBusy(idx: number, cid: number, pid: number){
        this._slots[idx].cid = cid
        this._slots[idx].pid = pid
    }
    newShift(idx: number): boolean {
        return idx > 1 && this._slots[idx - 1].shift !== this._slots[idx].shift
    }

    byShift(shift: number): WDSlot[] {
        return this._slots.filter(slt => slt.shift === shift)
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

// class WorkWeek{
//
// }