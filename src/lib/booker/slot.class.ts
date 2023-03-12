import type {Day} from "./day.class"
import type {SlotData} from "./types"
import {slotColor} from "../config"
import {AVAILABLE, LOCKED} from "./constants"

export class Slot {
    public dayIndex: number
    public slotIndex: number
    public parent: Day
    public disabled: boolean

    private readonly _pid: number | undefined
    public bookSlot: Function

    constructor(slotData: SlotData) {
        this.dayIndex = slotData.dayIndex
        this.slotIndex = slotData.slotIndex
        this.disabled = slotData.disabled
        this.parent = slotData.parent
        this._pid = slotData.pid
        this.bookSlot = slotData.bookSlot
    }

    get busy() {
        return this._pid !== AVAILABLE
    }

    color(ts: number[], di: number) {
        if (this.disabled) return slotColor.DISABLED

        if (this.dayIndex !== di)
            return this.busy
                ? this._pid === LOCKED
                    ? slotColor.LOCKED
                    : slotColor.BUSY
                : slotColor.NEUTRAL


        if (!ts.includes(this.slotIndex)) {
            if (this.busy)
                return this._pid === LOCKED
                    ? slotColor.LOCKED
                    : slotColor.BUSY
            return slotColor.NEUTRAL
        }

        // cross the end of the day span
        if (ts.some(t => t === this.parent.slotsPerDay))
            return slotColor.NOT_OK

        // busy slots
        const busy = ts.filter(t => this.parent.busy(t) || this.parent.disabled(t))
        if (busy.length)
            return this.busy
                ? slotColor.OVER
                : slotColor.NOT_OK

        return slotColor.OK
    }

    book(){
        this.bookSlot({
            day: this.dayIndex,
            slot: this.slotIndex
        })
    }
}