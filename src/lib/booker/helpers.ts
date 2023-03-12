import type {BookerRules} from "./types"
import {ANY, CLEAR} from "./constants"

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

export const createDisableCheck = (rules: BookerRules, slotsPerShift: number) =>
    // concat as string the day, shift and slot index
    // the day index can be 0:6, shift 0:4 and day can be 0:48
    // ex: 5223 -> is Saturday, third shift, slot 23
    (di: number, si: number): boolean => {
        const shift = Math.floor(si / slotsPerShift)
        const st = ''.concat(
            di.toString(),
            shift.toString(),
            si < 10 ? ("0" + si.toString()) : si.toString()
        )
        if (rules.disabled && Array.isArray(rules.disabled) && rules.disabled.length) {
            return rules.disabled.some(rule => {
                if (rule[0] == ANY) {
                    if (rule[2] === ANY)
                        return rule[1] === shift.toString()
                    else
                        return rule.slice(2) === si.toString()
                }

                if (rule[1] === ANY)
                    return rule[0] === st[0]

                if (rule[2] === ANY)
                    return rule.slice(0, 2) === st.slice(0, 2)
                return rule === st
            })
        }
        return false
    }

export const createReseter = (span: number) => new Array(span).fill(CLEAR)