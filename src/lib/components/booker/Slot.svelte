<script>
    export let sid = {}
    export let tid = []
    export let setStatus
    export let color

    const slotHover = () => {
        tid = [...sid]
    }

    const bookSlot = () => {
        setStatus(sid, tid)
        // just to trigger a re-render
        tid[0] = -1

    }
</script>

<div class="p-0.5"
     role="button"
     on:mouseenter={slotHover}
     on:click={bookSlot}
     on:keypress="{bookSlot}">
    <div class="w-4 h-4 rounded-full {color}"></div>
</div>

