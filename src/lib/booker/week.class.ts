import type {BookerConfig, BookerData, BookerRules, TimeUnit, WorkHours} from "./types"
import {Day} from "./day.class"
import {toSSlot} from "./helpers"

export class Week {
    private readonly _workHours: WorkHours
    private readonly _timeUnit: TimeUnit
    private readonly _span: number
    private readonly _rules: BookerRules
    private readonly _days: Day[]
    private readonly _shifts: number
    public bookerData: BookerData
    public weekIndex: number
    public pid: number

    constructor(weekIndex: number, bookerData: BookerData, conf: BookerConfig) {
        this.weekIndex = weekIndex
        this._days = []
        this._workHours = conf.workHours
        this._timeUnit = conf.timeUnit
        this._shifts = conf.shifts
        this._span = conf.span
        this._rules = conf.rules
        this.pid = conf.pid
        this.bookSlot = this.bookSlot.bind(this)

        this.bookerData = bookerData
            .filter((bd) => bd.week === this.weekIndex)

        for (let i = 0; i <= 7; i++)
            this._days.push(
                new Day(i, this)
            )
    }

    get rules() {
        return this._rules
    }

    get hoursPerDay() {
        return this._workHours[1] - this._workHours[0]
    }

    get slotsPerDay() {
        return Math.round(this.hoursPerDay / this._timeUnit)
    }

    get slotsPerShift() {
        return Math.floor(this.slotsPerDay / this._shifts)
    }

    get span() {
        return this._span
    }

    interval(idx: number) {
        return toSSlot(
            this._workHours[0] + this._timeUnit * idx
        )
    }

    slot(dIdx: number, sIdx: number) {
        return this._days[dIdx].slot(sIdx)
    }

    firstInShift(sIdx: number): boolean {
        return sIdx > 0 && sIdx % this.slotsPerShift === 0
    }

    bookSlot(slotData: { day: number, slot: number }) {
        this.bookerData.push({
            ...slotData,
            year: 2023,
            week: this.weekIndex,
            pid: this.pid
        })
    }
}