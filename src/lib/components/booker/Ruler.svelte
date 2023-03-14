<script lang="ts">
    import {slotColor} from '$lib/config.ts'
    import type {Booker} from "../../booker"

    export let slot: number
    export let active: boolean
    export let booker: Booker
</script>

{#if active}
    <td>
        <div class="font-mono text-xs {slotColor.OK} rounded-full px-2 mr-2">
            {booker.interval(slot)}
        </div>
    </td>
{/if}