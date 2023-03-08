type MediaFieldDef = {
    key: string,
    multi: boolean
}
const singleMediaUrl = (img: StrapiSingleMedia) => img.data.attributes.url

const multiMediaUrl = (img: StrapiMultiMedia) => img.data.map((el: StrapiMediaElement) => el.attributes.url)

export const singleData = (sData: StrapiSingleData) => ({
    ...sData.data.attributes, id: sData.data.id
})

export const multiData = (mData: StrapiMultiData) =>
    mData.data.map((sde: StrapiDataElement) => ({
        ...sde.attributes, id: sde.id
    }))

export const mediaToUrl = (payload: any, mediaFields: MediaFieldDef[]) =>
    mediaFields.reduce((acc: any, mf: MediaFieldDef) => {
        if(mf.multi)
            acc[mf.key] =  multiMediaUrl(acc[mf.key])
        else
            acc[mf.key] = singleMediaUrl(acc[mf.key])
    }, payload)
