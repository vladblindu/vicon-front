<script>

    import Slot from '$lib/components/booker/Slot.svelte'
    import {slotColor} from '$lib/config.ts'
    import {DAYS} from '$lib/booker/constants'
    import {Booker} from '$lib/booker/index.ts'

    export let config = {}
    export let data = {}


    const booker = new Booker(data, config)

    let tid = null

    const clear = () => {
        tid = null
    }

</script>
<div class="cursor-pointer flex gap-4">
    {#each Array(booker.bookerData.meta.weekSpan) as _, wi}
        <table>
            {#each Array(booker.slotsPerDay) as _,si}
                {#if booker.firstInShift(si)}
                    <tr class="leading-3">
                        <td>&nbsp;</td>
                    </tr>
                {/if}
                <tr class="leading-4 hover:bg-surface-700">
                    <td>
                        <div class="font-mono text-xs {slotColor.OK} rounded-full px-2 mr-2">
                            {booker.interval(si)}
                        </div>
                    </td>
                    {#each DAYS as _, di}
                        <td on:mouseleave={clear}>
                            <Slot bind:tid="{tid}"
                                  sid="{booker.slot([wi, di, si]).id}"
                                  color="{booker.color([wi, di, si], tid)}"
                                  setStatus="{booker.setStatus}"/>
                        </td>
                    {/each}
                </tr>
            {/each}
        </table>
    {/each}
</div>

<style>
    td {
        padding: 0 !important;
    }
</style>