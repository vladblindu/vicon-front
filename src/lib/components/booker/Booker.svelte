<script lang="ts">
    import {Booker} from '$lib/booker/index.ts'
    import {WEEKS_PER_YEAR} from '$lib/booker/constants.ts'
    import Week from '$lib/components/booker/Week.svelte'
    import {LEFT, RIGHT} from "../../booker/constants"

    export let config = {}
    export let data = {}

    const booker = new Booker(data, config)

    let active = 0

    const setActive = wi => () => {
        active = wi
    }

    const shiftActive = (dir: number) => {
        if (dir === LEFT && active > 0)
            setActive(active - 1)()
        console.log(active, booker.bookerData.meta.weekSpan)
        if (dir === RIGHT && active < (booker.bookerData.meta.weekSpan - 1))
            setActive(active + 1)()
    }

</script>

<div class="cursor-pointer flex items-stretch gap-4 overflow-scroll">
    {#each Array(booker.bookerData.meta.weekSpan) as _, wi}
        <!-- If it's over the end of the year you get a separator-->
        {#if (booker.bookerData.meta.startWeek + wi) === WEEKS_PER_YEAR}
            <div class="w-6 items-stretch variant-glass-secondary pt-6">
                <div class="w-6 rotate-90 text-sm">{booker.bookerData.meta.year + 1}</div>
            </div>
        {/if}
        <div class="relative">
            {#if active !== wi}
                <div on:click={setActive(wi)}
                     on:keypress={setActive(wi)}
                     class="absolute w-full h-full bg-secondary-900 bg-opacity-40"></div>
            {/if}
            <Week active="{active}"
                  wi="{wi}" booker="{booker}"
                  setActive="{shiftActive}"/>
        </div>
    {/each}
</div>