export const STATUS_COLORS = {
    REQUEST: "#ff4719",
    CONFIRMED: "#008f44",
    WIP: "#00c9c4",
    CLOSED: "#888888"
}
export const BASE_HEADERS = {
    'Content-type': 'application/json'
}
export const AUTH_HEADERS = {
    ...BASE_HEADERS,
    'Authorization': "Bearer ${token}"
}

export const Routes = {
    simulate: {
        path: "simulate"
    },
    info: {
        path: "info"
    }
}

export const DROPDOWN = 1
export const CHECKBOX = 2