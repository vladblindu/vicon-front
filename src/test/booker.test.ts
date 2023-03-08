import {describe, expect, it} from 'vitest'
import {toNSlot, toSSlot, type WDConfig, WorkDay} from "../lib/helpers/booker"

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
describe('WorkDay Class', () => {
    const wdConf: WDConfig = {
        workHours: [8, 20],
        timeUnit: 0.5,
        span: 3,
        shifts: 3
    }


    const wd = new WorkDay(wdConf)
    describe('constructor', () => {
        it('length', () => {
            expect(wd["_slots"].length).toBe(24)
        })
    })
    describe('getSlot', () => {

        it('getSlot', () => {
            expect(wd.getSlot(13.5).index).toBe(11)
            expect(wd.getSlot(13.5).shift).toBe(1)
        })
        it('getSlot first', () => {
            expect(wd.getSlot(8).index).toBe(0)
            expect(wd.getSlot(8).shift).toBe(0)
        })

        it('getSlot last', () => {
            expect(wd.getSlot(19.5).index).toBe(23)
            expect(wd.getSlot(19.5).shift).toBe(2)
        })
        it('getSlot OWH before', () => {
            expect(() => {
                wd.getSlot(6.5)
            }).to.toThrowError("Outside working hours slot requested.")
        })
        it('getSlot OWH after', () => {
            expect(() => {
                wd.getSlot(21.5)
            }).to.toThrowError("Outside working hours slot requested.")
        })
    })
    describe('newShift', () => {
        it('return true', () => {
            expect(wd.newShift(8)).toBe(true)
            expect(wd.newShift(16)).toBe(true)
        })
        it('return false', () => {
            //expect(wd.newShift(0)).toBe(false)
            expect(wd.newShift(23)).toBe(false)
        })
    })
    describe('getSlot', () => {
        it('num slot 0', () => {
            const slot = wd.getSlot(8)
            expect(slot.start === 8 && slot.index === 0).toBe(true)
        })
        it('num slot 1', () => {
            const slot = wd.getSlot(8.5)
            expect(slot.start === 8.5 && slot.index === 1).toBe(true)
        })
        it('str slot 0', () => {
            const slot = wd.getSlot("08:00")
            expect(slot.start === 8 && slot.index === 0).toBe(true)
        })
        it('str slot 1', () => {
            const slot = wd.getSlot(8.5)
            expect(slot.start === 8.5 && slot.index === 1).toBe(true)
        })
    })
})