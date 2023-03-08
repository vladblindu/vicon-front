import {sectionBorders, sectionColors} from "../config"

export const byIndex = (sel: number, idx: number, _: any) => sel === idx

export const getLines = (data: ListPL, section: number | undefined = undefined) =>
    Object.values(data).filter(
        entry => section ? entry.meta && entry.meta.section === section : entry.meta
    ).sort((a,b) => a.meta.index - b.meta.index)

export const getSection = (sec: SectionsPL, data: ListPL) =>
    Object.values(data).filter(entry => entry.meta?.section === sec)
        .sort((a, b) => a.meta.index - b.meta.index)

export const infoLink = (section: number, index: number) => `info/#S${section}-I${index}`
export const infoId = (section: number, index: number) => `S${section}-I${index}`

export const getDefaults = (data: ListPL) =>
    getLines(data).reduce((acc: any, entry: EntryPL) => {
        acc[entry.meta.name] = entry.meta.default
        return acc
    }, {})

export const getDefaultSection = (sec: SectionsPL, data: ListPL) =>
    getLines(data)
        .filter((entry: EntryPL) => entry.meta.section === sec)
        .reduce((acc: any, entry: EntryPL) => {
            acc[entry.meta.name] = entry.meta.default
            return acc
        }, {})

export const getSectionColor = (section: number) => sectionColors[section]
export const getSectionBorder = (section: number) => sectionBorders[section]
// export const calc = (data: ListPL, formSel: DefaultSelection) => {
//     const episodes = data.packages[formSel.pac].episodes
//     return data.setTime[formSel.st].price * episodes +
//         data.talentsOnSet[formSel.tos].price * episodes +
//         data.videoQuality[formSel.vq].price * episodes +
//         (formSel.cs ? data.customSet : 0) * episodes +
//         (formSel.csg ? data.customOnSetGraphics : 0) * episodes +
//         (formSel.vg ? data.videoGuest : 0) * episodes +
//         (formSel.ag ? data.audioGuest : 0) * episodes
// }