<script>
    export let sid = {}
    export let tid = []
    export let setStatus
    export let color

    export let slotHover

    const hover = () => {
        if (slotHover)
            tid = slotHover(sid, tid)
    }

    const book = () => {
        setStatus(sid, tid)
    }
</script>

<div class="p-0.5"
     role="button"
     on:mouseenter={hover}
     on:click={book}
     on:keypress="{book}">
    <div class="w-4 h-4 rounded-full {color}"></div>
</div>

