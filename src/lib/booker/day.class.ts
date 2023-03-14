import {Slot} from "./slot.class"
import type {Booker} from "./index"

export class Day {

    public slots: Slot[]

    constructor(wi: number, di: number, booker: Booker) {
        this.slots = []
        for (let si = 0; si < booker.slotsPerDay; si++)
            this.slots.push(
                new Slot(wi, di, si, booker)
            )
    }
}
