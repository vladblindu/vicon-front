<script>
    import Week from '$lib/components/booker/Week.svelte'

    const data = [
        {
            week: 34,
            day: 1,
            slot: 13,
            pid: 45
        },
        {
            week: 34,
            day: 1,
            slot: 14,
            pid: 45
        },
        {
            week: 34,
            day: 1,
            slot: 15,
            pid: 45
        },
        {
            week: 34,
            day: 4,
            slot: 5,
            pid: 23
        },
        {
            week: 34,
            day: 4,
            slot: 6,
            pid: 23
        },
        {
            week: 34,
            day: 4,
            slot: 7,
            pid: 23
        }
    ]
    const config = {
        workHours: [8, 20],
        timeUnit: 0.5,
        shifts: 3,
        span: 3,
        rules: {
            disabled: [
                '6*', '52*', '*13'
            ],
            noCrossShift: false
        },
        pid: 23
    }
</script>

<div>
    <Week weekIndex={34} config="{config}" data="{data}"/>
</div>