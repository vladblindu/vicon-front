<script>

    import {toSSlot, WorkDay} from '$lib/helpers/booker.ts'
    import Slot from '$lib/components/app/booker/Slot.svelte'
    import {slotColor} from '$lib/config.ts'

    const DAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

    const wdConfig =
        {
            workHours: [8, 20],
            timeUnit: 0.5,
            shifts: 3,
            span: 3,
            // rules: {
            //     recursive:{
            //
            //     }
            // }
        }

    const hoursPerDay = wdConfig.workHours[1] - wdConfig.workHours[0]
    const slotsPerDay = Math.round(hoursPerDay / wdConfig.timeUnit)
    const slotsPerShift = Math.floor(slotsPerDay / wdConfig.shifts)

    const wds = []
    for (let i = 0; i <= 7; i++)
        wds.push(new WorkDay(i, wdConfig))

    //export let bookSpot

    const CLEAR = -1
    const RESETER = new Array(wdConfig.span).fill(CLEAR)
    let targeted = [...RESETER]
    let dayIndex = CLEAR

    const clear = () => {
        targeted = [...RESETER]
        dayIndex = CLEAR
    }

    const interval = idx => toSSlot(
        wdConfig.workHours[0] + wdConfig.timeUnit * idx
    )
    // is first in slot
    const fis = idx => idx > 0 && idx % slotsPerShift === 0
</script>
<div class="cursor-pointer">
    <table>
        <tr>
            <th></th>
            {#each DAYS as d, di}
                <th>{d}</th>
            {/each}
        </tr>
        {#each Array(slotsPerDay) as _,idx}
            {#if fis(idx)}
                <tr class="leading-3"><td>&nbsp;</td></tr>
            {/if}
            <tr class="leading-4 hover:bg-surface-700">
                <td>
                    <div class="font-mono text-xs {slotColor.OK} rounded-full px-2 mr-2">
                        {interval(idx)}
                    </div>
                </td>
                {#each DAYS as d, di}
                    <td
                            on:mouseleave={clear}>
                        <Slot bind:dayIndex="{dayIndex}"
                              bind:targeted="{targeted}"
                              slot="{wds[di].slot(idx)}"
                              bookSpot="{() =>{alert('HEHE')} }"/>
                    </td>
                {/each}
            </tr>
        {/each}
    </table>
</div>