<script>

    export let slot = {}
    export let targetSlots = []
    export let dayIndex

    const slotHover = (slot) => () => {
        for (let i = 0; i < targetSlots.length; i++)
            targetSlots[i] = slot.slotIndex + i
        dayIndex = slot.dayIndex
    }

    let color
    $: color = slot.color(targetSlots, dayIndex)
</script>

<div class="p-0.5"
     role="button"
     on:mouseenter={slotHover(slot)}
     on:keypress="{!slot.disabled && slot.book}"
     on:click={!slot.disabled && slot.bookSlot}>
    <div class="w-4 h-4 rounded-full {color}"></div>
</div>