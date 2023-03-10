import {ANY, CLEAR} from "../constants"
import type {WDConfig, WDRules, WDSlot} from "../types/booker"

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

export const createReseter = (span: number) => new Array(span).fill(CLEAR)

type TimeUnit = 1.0 | 0.25 | 0.5
type WorkHours = [number, number]
type SlotQuery = number | string

// outside working hours error
const OWHError = new Error("Outside working hours slot requested.")

type DisabledChecker = (di: number, hi: number, si: number) => boolean
export const createDisableCheck = (rules: WDRules) =>
    // concat as string the day, shift and slot index
    // the day index can be 0:6, shift 0:4 and day can be 0:48
    // ex: 5223 -> is Saturday, third shift, slot 23
    (di: number, hi: number, si: number): boolean => {
        const st = ''.concat(
            di.toString(),
            hi.toString(),
            si < 10 ? ("0" + si.toString()) : si.toString()
        )
        if (rules.disabled && Array.isArray(rules.disabled) && rules.disabled.length) {
            return rules.disabled.some(rule => {
                if (rule[1] === ANY)
                    return rule[0] === st[0]
                if (rule[2] === ANY)
                    return rule.slice(0, 1) === st.slice(0, 1)
                return rule === st
            })
        }
        return false
    }

export class WorkDay {
    private readonly _slots: WDSlot[]
    public workHours: WorkHours
    public timeUnit: TimeUnit
    public span: number
    public readonly shifts: 3
    private readonly checkDisabled: DisabledChecker

    constructor(dayIndex: number, wdConf: WDConfig) {
        this._slots = []
        this.workHours = wdConf.workHours
        this.timeUnit = wdConf.timeUnit
        this.span = wdConf.span
        this.shifts = wdConf.shifts
        this.checkDisabled = createDisableCheck(wdConf.rules)

        for (let i = 0; i < this.slotsPerDay; i++) {
            const shift = Math.floor(i / this.slotsPerShift)
            const _slot: WDSlot = {
                dayIndex: dayIndex,
                shift,
                index: i,
                start: wdConf.workHours[0] + i * wdConf.timeUnit,
                wd: this,
                disabled: this.checkDisabled(dayIndex, shift, i),
                busy: () => !!this._slots[i].cid
            }
            this._slots.push(_slot)
        }
    }

    get hoursPerDay() {
        return this.workHours[1] - this.workHours[0]
    }

    get slotsPerDay() {
        return Math.round(this.hoursPerDay / this.timeUnit)
    }

    get slotsPerShift() {
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

