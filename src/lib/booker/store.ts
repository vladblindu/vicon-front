import {writable} from 'svelte/store'

export const bookerData = writable([
    {
        week: 34,
        day: 1,
        slot: 13,
        slotStatus: 45
    },
    {
        week: 34,
        day: 1,
        slot: 14,
        slotStatus: 45
    },
    {
        week: 34,
        day: 1,
        slot: 15,
        slotStatus: 45
    },
    {
        week: 34,
        day: 4,
        slot: 5,
        slotStatus: 23
    },
    {
        week: 34,
        day: 4,
        slot: 6,
        slotStatus: 23
    },
    {
        week: 34,
        day: 4,
        slot: 7,
        slotStatus: 23
    }
])