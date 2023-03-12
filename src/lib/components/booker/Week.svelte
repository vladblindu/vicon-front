<script>

    import {createReseter} from '$lib/booker/helpers'
    import Slot from '$lib/components/booker/Slot.svelte'
    import {slotColor} from '$lib/config.ts'
    import {CLEAR, DAYS} from '$lib/booker/constants'
    import {Week} from '$lib/booker/week.class'

    export let weekIndex = 0
    export let config = {}
    export let data = {}

    const bw = new Week(weekIndex, data, config)

    const RESETER = createReseter(bw.span)
    let targetSlots = [...RESETER]
    let dayIndex = CLEAR

    const clear = () => {
        targetSlots = [...RESETER]
        dayIndex = CLEAR
    }
</script>
<div class="cursor-pointer">
    <table>
        <tr>
            <th></th>
            {#each DAYS as DayInitial, dIdx}
                <th>{DayInitial}</th>
            {/each}
        </tr>
        {#each Array(bw.slotsPerDay) as _,sIdx}
            {#if bw.firstInShift(sIdx)}
                <tr class="leading-3">
                    <td>&nbsp;</td>
                </tr>
            {/if}
            <tr class="leading-4 hover:bg-surface-700">
                <td>
                    <div class="font-mono text-xs {slotColor.OK} rounded-full px-2 mr-2">
                        {bw.interval(sIdx)}
                    </div>
                </td>
                {#each DAYS as _, dIdx}
                    <td on:mouseleave={clear}>
                        <Slot bind:dayIndex="{dayIndex}"
                              bind:targetSlots="{targetSlots}"
                              slot="{bw.slot(dIdx, sIdx)}"/>
                    </td>
                {/each}
            </tr>
        {/each}
    </table>
</div>

<style>
    td{
        padding: 0!important;
    }
</style>