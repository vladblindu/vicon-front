import {Day} from "./day.class"
import type {Booker} from "./index"
import {DAYS} from "./constants"

export class Week {
    public days: Day[]

    constructor(wi: number,booker: Booker) {
        this.days = []

        for (let di = 0; di <= DAYS.length; di++) {
            this.days.push(
                new Day(wi, di, booker)
            )
        }
    }
}