import {BASE_API_URL} from "../config"
import {BASE_HEADERS, Routes} from "../constants"
import {singleData} from "../helpers/normalizers"
import type {HttpOpts} from "../types/http"

const errResp = (message: string) => ({
    error: true,
    message
})

export const find = async (opts: HttpOpts) => {
    const url = `${BASE_API_URL}/${Routes.simulate.path}`
    const res = await opts.fetch(url, {
        headers: BASE_HEADERS,
        method: "GET"
    })
    if (!res.ok) return errResp(res.statusText)
    const json = await res.json()
    return singleData(json)
}