<script>
    import {toSSlot} from '$lib/helpers/booker.ts'

    export let wdConfig ={}

    const hoursPerDay = wdConfig.workHours[1] - wdConfig.workHours[0]
    const slotsPerDay = Math.round(hoursPerDay / wdConfig.timeUnit)
    const slotsPerShift = Math.floor(slotsPerDay / wdConfig.shifts)
    const timeSlot = (i, j) =>
       toSSlot(wdConfig.workHours[0] + (i * slotsPerShift + j) * wdConfig.timeUnit)
</script>
<div class="ruler-block">
    {#each Array(wdConfig.shifts) as _,idx}
        <div class="ruler-gap">
            {#each Array(slotsPerShift) as slot, jdx}
                <div class="ruler-slot variant-filled-primary">{timeSlot(idx, jdx)}</div>
            {/each}
        </div>
    {/each}
</div>

<style>
    .ruler-block{
        margin-top: 15px;
    }
    .ruler-gap{
        margin-bottom: 40px;
    }
    .ruler-slot{
        margin: 2px;
        padding: 1px 5px 1px 5px;
        border-radius: 4px;
        line-height: 12px;
        font-size: xx-small;
    }
</style>