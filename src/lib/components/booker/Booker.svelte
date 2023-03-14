<script>
    import {Booker} from '$lib/booker/index.ts'
    import {WEEKS_PER_YEAR} from '$lib/booker/constants.ts'
    import Week from '$lib/components/booker/Week.svelte'

    export let config = {}
    export let data = {}

    const booker = new Booker(data, config)

    let active = 0

    const setActive = wi => () => {
        active = wi
        booker.setActive(wi)
    }

</script>

<div class="cursor-pointer flex items-center gap-4 overflow-scroll">
    {#each Array(booker.bookerData.meta.weekSpan) as _, wi}
        {#if (booker.bookerData.meta.startWeek + wi) === WEEKS_PER_YEAR}
            <div class="h-4 rotate-90">{booker.bookerData.meta.year + 1}</div>
        {/if}
        <div class="cont">
            {#if active !== wi}
                <div on:click={setActive(wi)}
                     on:keypress={setActive(wi)}
                     class="overlay"></div>
            {/if}
            <Week active="{active === wi}" wi="{wi}" booker="{booker}"/>
        </div>
    {/each}
</div>

<style>

    .cont {
        position: relative;
    }

    .overlay {
        background-color: green;
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 100;
        opacity: 40%;
        box-sizing: border-box;
    }
</style>