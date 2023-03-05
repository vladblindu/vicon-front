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

type StrapiDataElement = {
    id: number,
    attributes: any
}

type StrapiSingleData = {
    data: StrapiDataElement
}

type StrapiMultiData = {
    data: StrapiDataElement[]
}