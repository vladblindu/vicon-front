import {checkRule, pad, ruleSplit, toSSlot} from "./helpers"
import {slotColor} from "../config"
import {AVAILABLE, BUSY, WEEKS_PER_YEAR} from "./constants"
import {Week} from "./week.class"
import type {Slot} from "./slot.class"

export class Booker {
    public bookerData: BookerData
    private _config: BookerConfig
    public weeks: Week[]

    constructor(bookerData: BookerData, conf: BookerConfig) {
        this.weeks = []
        this.bookerData = bookerData
        this._config = conf
        for (let wi = 0; wi < bookerData.meta.weekSpan; wi++) {
            this.weeks.push(
                new Week(wi, this)
            )
        }
        this.setStatus = this.setStatus.bind(this)
        this.slotHover = this.slotHover.bind(this)
    }

    get hoursPerDay(): number {
        return this._config.workHours[1] - this._config.workHours[0]
    }

    get slotsPerDay(): number {
        return Math.round(this.hoursPerDay / this._config.timeUnit)
    }

    get slotsPerShift(): number {
        return Math.floor(this.slotsPerDay / this._config.shifts)
    }

    get timeUnit(): number {
        return this._config.timeUnit
    }

    interval(idx: number): string {
        return toSSlot(
            this._config.workHours[0] + this.timeUnit * idx
        )
    }

    slot(sid: SlotId): Slot {
        return this.weeks[sid[0]].days[sid[1]].slots[sid[2]]
    }

    firstInShift(sIdx: number): boolean {
        return sIdx > 0 && sIdx % this.slotsPerShift === 0
    }

    disabled(sid: SlotId): boolean {
        const rules = this._config.rules
        const shift = pad(Math.floor(sid[2] / this.slotsPerShift))
        const slotData = sid.map(d => pad(d))
        // insert the "shift" data at position 2 in the slotData
        slotData.splice(2, 0, shift)

        if (rules.disabled && Array.isArray(rules.disabled) && rules.disabled.length) {
            return rules.disabled.some(rule => checkRule(slotData, ruleSplit(rule)))
        }

        return true
    }

    slotHover(sid: SlotId) {
        return [...sid]
    }

    _slotSpan(tid: SlotId) {
        return Array.from(Array(this._config.span).fill(tid[2]), (e, i) => e + i)
    }

    staticColor(sid: SlotId) {
        if (this.disabled(sid))
            return slotColor.DISABLED
        if (this.status(sid) === AVAILABLE)
            return slotColor.AVAILABLE
        if (this.status(sid) === BUSY)
            return slotColor.BUSY
        return slotColor.LOCKED
    }

    dynamicColor(sid: SlotId, tid: SlotId): string {
        if (!tid || (sid[0] !== tid[0]) || (sid[1] !== tid[1]) || !this._slotSpan(tid).includes(sid[2]))
            return this.staticColor(sid)
        // cross the end of the day span
        if (tid && this._slotSpan(tid).some(t => t === this.slotsPerDay))
            return slotColor.NOT_OK

        // busy or locked slots
        const busy = this._slotSpan(tid).filter(t =>
            this.status([sid[0], sid[1], t]) !== AVAILABLE ||
            this.disabled([sid[0], sid[1], t])
        )
        if (busy.length)
            return this.status(sid) !== AVAILABLE
                ? slotColor.OVER
                : slotColor.NOT_OK
        // available for booking
        return slotColor.OK
    }

    getYear(sid: SlotId) {
        return this.bookerData.meta.startWeek + sid[0] > WEEKS_PER_YEAR
            ? this.bookerData.meta.year + 1
            : this.bookerData.meta.year
    }

    // check if there are events in bookerData.data
    status(sid: SlotId): SlotStatus {
        const matches = this.bookerData.data
            .filter(event => {
                    return sid[0] === event.week - this.bookerData.meta.startWeek &&
                        sid[1] === event.day &&
                        sid[2] === event.slot
                }
            )
        return matches.length && matches[0].status
    }

    // set events in bookerData.data
    setStatus(sid: SlotId) {
        if (this._slotSpan(sid).every(
            s => !this.disabled([sid[0], sid[1], s]) &&
                this.status([sid[0], sid[1], s]) === AVAILABLE &&
                s !== this.slotsPerDay
        )) this._slotSpan(sid).forEach(
            s => this.bookerData.data.push(
                {
                    // take care if it's past 1 January
                    year: this.getYear(s),
                    week: sid[0] + this.bookerData.meta.startWeek,
                    day: sid[1],
                    slot: s,
                    status: BUSY
                }
            ))
    }
}