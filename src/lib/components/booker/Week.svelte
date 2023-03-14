<script>
    import Slot from '$lib/components/booker/Slot.svelte'
    import {DAYS} from '$lib/booker/constants.ts'
    import {slotColor} from '$lib/config.ts'

    export let wi
    export let booker

    export let active

    let tid = null

    const clear = () => {
        tid = null
    }
</script>


<table>
    <tr>
        {#if active}
            <th></th>
        {/if}
        {#each DAYS as d, idx}
            <th class="text-center">{d}</th>
        {/each}
    </tr>
    {#each Array(booker.slotsPerDay) as _,si}
        {#if booker.firstInShift(si)}
            <tr class="leading-3">
                <td>&nbsp;</td>
            </tr>
        {/if}
        <tr class="leading-4 hover:bg-surface-700">
            {#if active}
                <td>
                    <div class="font-mono text-xs {slotColor.OK} rounded-full px-2 mr-2">
                        {booker.interval(si)}
                    </div>
                </td>
            {/if}
            {#each DAYS as _, di}
                <td on:mouseleave={clear}>
                    <Slot bind:tid="{tid}"
                          sid="{booker.slot([wi, di, si]).id}"
                          slotHover="{booker.slotHover}"
                          color="{active
                                ? booker.dynamicColor([wi, di, si], tid)
                                : booker.staticColor([wi, di, si])}"
                          setStatus="{active && booker.setStatus}"/>
                </td>
            {/each}
        </tr>
    {/each}
</table>

<style>
    td {
        padding: 0 !important;
    }
</style>