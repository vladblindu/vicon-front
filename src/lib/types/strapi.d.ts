type StrapiMediaElement = {
    id: number,
    attributes: {
        [key: string]: any
        url: string
    }
}
type StrapiSingleMedia = {
    data: StrapiMediaElement
}

type StrapiMultiMedia = {
    data: StrapiMediaElement[]
}

type StraslotStatusataElement = {
    id: number,
    attributes: any
}

type StrapiSingleData = {
    data: StraslotStatusataElement
}

type StrapiMultiData = {
    data: StraslotStatusataElement[]
}