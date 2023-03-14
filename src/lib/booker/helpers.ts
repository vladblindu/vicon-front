import {ANY} from "./constants"

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

export const pad = (d: number) => d < 10 ? ("0" + d.toString()) : d.toString()

export const ruleSplit = (rule: string) => {
    const tmp = []
    for (let i = 0; i < rule.length; i += 2)
        tmp.push(rule.slice(i, i + 2))
    return tmp
}

export const checkRule = (slotData: string[], ruleParts: string[]) =>
    slotData.every((sd, idx) =>
        ruleParts[idx] === ANY || ruleParts[idx] === sd
    )