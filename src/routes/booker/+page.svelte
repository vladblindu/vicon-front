<script>
    //import {bookerData} from '$lib/booker/store.ts'
    import Booker from '$lib/components/booker/Booker.svelte'
    import {BUSY, LOCKED} from '$lib/booker/constants.ts'

    const config = {
        workHours: [8, 20],
        timeUnit: 0.5,
        shifts: 3,
        span: 3,
        rules: {
            disabled: [
                '**06****', '**0502**'
            ],
            noCrossShift: false
        },
        status: 23
    }

    const bookerData = {
        data: [
            {
                year: 2023,
                week: 34,
                day: 1,
                slot: 13,
                status: LOCKED
            },
            {
                year: 2023,
                week: 34,
                day: 1,
                slot: 14,
                status: LOCKED
            },
            {
                year: 2023,
                week: 34,
                day: 1,
                slot: 15,
                status: LOCKED
            },
            {
                year: 2023,
                week: 34,
                day: 4,
                slot: 5,
                status: BUSY
            },
            {
                year: 2023,
                week: 34,
                day: 4,
                slot: 6,
                status: BUSY
            },
            {
                year: 2023,
                week: 34,
                day: 4,
                slot: 7,
                status: BUSY
            }
        ],
        meta: {
            year: 2023,
            weekSpan: 6,
            startWeek: 49
        }
    }
</script>

<div>
    <Booker config="{config}" data="{bookerData}"/>
</div>