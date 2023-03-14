import type {Booker} from "./index"

export class Slot {
    public weekIndex: number
    public dayIndex: number
    public slotIndex: number
    public booker: Booker

    constructor(wi: number, di: number, si: number, booker: Booker) {
        this.weekIndex = wi
        this.dayIndex = di
        this.slotIndex = si
        this.booker = booker
        this.bookSlot = this.bookSlot.bind(this)
    }

    get id() {
        return [
            this.weekIndex,
            this.dayIndex,
            this.slotIndex
        ]
    }

    bookSlot() {
        this.booker.setStatus([
            this.weekIndex,
            this.dayIndex,
            this.slotIndex
        ])
    }
}