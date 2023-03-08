<script>
    import {slotColor as slotColors} from '$lib/config.ts'

    export let slot = {}
    export let targeted
    const rules = (targeted, slot) => {
        if (!targeted.includes(slot.index))
            return !slot.cid
                ? slotColors.NEUTRAL
                : slotColors.BUSY
        if (targeted.some(t => t === slot.wd.length))
            return slotColors.NOT_OK
        const busy = targeted.filter(t => slot.wd.busy(t))
        if (busy.length)
            return slot.cid
                ? slotColors.OVER
                : slotColors.NOT_OK
        return slotColors.OK
    }

    const slotHover = id => () => {
        for (let i = 0; i < targeted.length; i++)
            targeted[i] = id + i
    }

    let color
    $: color = rules(targeted, slot)

</script>

<div on:mouseenter={slotHover(slot.index)}
     class="w-3 h-3 rounded-full {color}">
    &nbsp;
</div>