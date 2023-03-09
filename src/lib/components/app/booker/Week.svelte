<script>
    import {WorkDay} from '$lib/helpers/booker.ts'
    import Day from '$lib/components/app/booker/Day.svelte'
    import Ruler from '$lib/components/app/booker/Ruler.svelte'
    import {WEEK_DAYS} from '$lib/constants.ts'

    const wdConfig = {
        workHours: [8, 20],
        timeUnit: 0.5,
        shifts: 3,
        span: 3
    }

    const days = new Array(7).fill(new WorkDay(wdConfig))

    const bookSpot = () => {
        alert('Spot')
    }

</script>

<div class="flex">
    <Ruler wdConfig="{wdConfig}"/>
    {#each days as wd, idx}
        <div>
            <div>{WEEK_DAYS[idx]}</div>
            <Day wd="{wd}"
                 bookSpot="{bookSpot}"/>
        </div>
    {/each}
</div>