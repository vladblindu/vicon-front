<script>
    import {slotColor} from '$lib/config.ts'

    export let slot = {}
    export let targeted = []
    export let dayIndex
    export let bookSpot
    const rules = (tg, di, slot) => {
        if (slot.dayIndex !== di)
            return slotColor.NEUTRAL

        if (!tg.includes(slot.index)) {
            if(slot.cid) return slotColor.BUSY
            if(slot.disabled) return slotColor.DISABLED
            return slotColor.NEUTRAL
        }

        // cross the end of the day span
        if (tg.some(t => t === slot.wd.length))
            return slotColor.NOT_OK

        // busy slots
        const busy = tg.filter(t => slot.wd.busy(t))
        if (busy.length)
            return slot.cid
                ? `${slotColor.NOT_OK} bg-opacity-5`
                : slotColor.NOT_OK

        return slotColor.OK
    }
    const slotHover = (slot) => () => {
        for (let i = 0; i < targeted.length; i++)
            targeted[i] = slot.index + i
        dayIndex = slot.dayIndex
    }

    let color
    $: color = rules(targeted, dayIndex, slot)
</script>

<div role="button"
     on:mouseenter={slotHover(slot)}
     on:keypress="{() => alert('yep')}"
     on:click={bookSpot}
     class="w-4 h-4 rounded-full {color}">
</div>