type ValueKey = "price" | "episodes"

enum ControlPL {
    SELECT = 1,
    CHECKBOX = 2
}

enum SectionsPL {
    SET = 1,
    POST = 2,
    STORE = 3,
    EXTRA = 4
}

type MetaPL = {
    name: string,
    title: string,
    index: number,
    section: SectionsPL,
    control: ControlPL,
    mu: string,
    default: number | boolean
    valueKey?: ValueKey
}

type ItemPL = {
    label: string,
    [key in ValueKey]: number
    ppc?: number,
    info?: string
}

type EntryPL = {
    meta: MetaPL,
    data: EntryPL | EntryPL[]
}

type KeysPL =
    "packages" |
    "talentsOnSet" |
    "videoQuality" |
    "setTime" |
    "eConference" |
    "customSet" |
    "customOnSetGraphics" |
    "editing" |
    "postGraphics" |
    "music"


type ListPL = {
    [key in KeysPL]: EntryPL
}
