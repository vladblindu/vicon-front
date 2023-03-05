export const calc = (priceList: any, priceForm: any) => {
    const tmp = {
        set: priceList.set * priceForm.episodes,
        snacksAndRefreshments: priceList.snacksAndRefreshments * priceForm.episodes
    }
    return Object.values(tmp).reduce((acc, v) => acc +v, 0)
}