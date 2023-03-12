import type {BookerData, DisabledChecker} from "./types"
import {createDisableCheck} from "./helpers"
import {Slot} from "./slot.class"
import type {Week} from "./week.class"
import {AVAILABLE, BOOKED, LOCKED} from "./constants"

export class Day {
    public slotsPerShift: number
    public slotsPerDay: number

    public bookerData: BookerData
    private readonly _slots: Slot[]
    private readonly checkDisabled: DisabledChecker
    private readonly _dayIndex: number
    public parent: Week

    constructor(dayIndex: number, parent: Week) {
        this._dayIndex = dayIndex
        this._slots = []
        this.checkDisabled = createDisableCheck(parent.rules, parent.slotsPerShift)
        this.slotsPerDay = parent.slotsPerDay
        this.slotsPerShift = parent.slotsPerShift
        this.bookerData = parent.bookerData
        this.parent = parent
        for (let idx = 0; idx < parent.slotsPerDay; idx++) {
            this._slots.push(
                new Slot({
                    dayIndex: dayIndex,
                    slotIndex: idx,
                    parent: this,
                    disabled: this.checkDisabled(dayIndex, idx),
                    pid: this.busy(idx),
                    bookSlot: parent.bookSlot
                })
            )
        }
    }

    slot(idx: number) {
        return this._slots[idx]
    }

    disabled(idx: number): boolean {
        return this._slots[idx].disabled
    }

    busy(idx: number): number {
        const match = this.bookerData.filter(bd => bd.day === this._dayIndex && bd.slot === idx)
        if (!match.length) return AVAILABLE
        if (match.length && match[0].pid === this.parent.pid) return BOOKED
        return LOCKED
    }
}

