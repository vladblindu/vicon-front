<script>
    import {WorkDay} from '$lib/helpers/booker.ts'
    import Slot from '$lib/components/app/booker/Slot.svelte'

    const wd = new WorkDay({
        workHours: [8, 20],
        timeUnit: 0.5,
        span: 3,
        shifts: 3
    })

    wd.toBusy(5, 3, 3)
    const CLEAR = -1
    const RESETER = new Array(wd.span).fill(CLEAR)
    let targeted = [...RESETER]

    const clear = () => {
        targeted = [...RESETER]
    }


</script>
<div class="p-12">
    {#each Array(wd.shiftsPerDay) as _,idx}
        <div class="m-4 inline-block cursor-pointer" on:mouseleave={clear}>
            {#each wd.byShift(idx) as slot, jdx}
                <Slot slot="{slot}"
                      bind:targeted="{targeted}"/>
            {/each}
        </div>
        <br/>
    {/each}
</div>

<style>

</style>