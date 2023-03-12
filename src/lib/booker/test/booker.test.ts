import {describe, expect, it} from 'vitest'
import {createDisableCheck, toNSlot, toSSlot, } from "../helpers"
import type {BookerRules} from "../types"

describe('toSSlot', () => {
    it('8.5 -> 08:30', () => {
        expect(toSSlot(8.5)).toBe("08:30")
    })
    it('8.2 -> 08:12', () => {
        expect(toSSlot(8.2)).toBe("08:12")
    })
    it('12.4 -> 12:15', () => {
        expect(toSSlot(8.5)).toBe("08:30")
    })
})
describe('toNSlot', () => {
    it('08.30 -> 8,5', () => {
        expect(toNSlot('08:30')).toBe(8.5)
    })
    it('08.00 -> 8,5', () => {
        expect(toNSlot('08:00')).toBe(8)
    })
    it('12:00 -> 12', () => {
        expect(toNSlot('12:00')).toBe(12)
    })
    it('12:15 -> 12.4', () => {
        expect(toNSlot('12:15')).toBe(12.25)
    })
})

describe('booker helpers', () => {

    describe('createDisableChecker', () => {
        const rules: BookerRules = {
            disabled: ['6**', '52*', '3002']
        }
        const slotsPerShift = 8
        const disableCheck = createDisableCheck(rules, slotsPerShift)

        it('should disable full day', () => {
            expect(disableCheck(6,12)).to.be.true
        })

        it('should disable a shift', () => {
            expect(disableCheck(5,23)).to.be.true
        })

        it('should not disable other shift', () => {
            expect(disableCheck(5,3)).to.be.false
        })

        it('should disable a specific slot', () => {
            expect(disableCheck(3,2)).to.be.true
        })

        it('should disable another', () => {
            expect(disableCheck(1,14)).to.be.false
        })

    })
})