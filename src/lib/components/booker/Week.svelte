<script lang="ts">
    import Slot from '$lib/components/booker/Slot.svelte'
    import {DAYS} from '$lib/booker/constants.ts'
    import type {ModalComponent, ModalSettings} from "@skeletonlabs/skeleton"
    import {modalStore} from "@skeletonlabs/skeleton"
    import ModalConfirm from "./ModalConfirm.svelte"
    import Shift from "$lib/components/booker/Shift.svelte"
    import DayList from "$lib/components/booker/DayList.svelte"
    import Ruler from "$lib/components/booker/Ruler.svelte"

    export let wi
    export let booker

    export let active

    let tid = null

    const clear = () => {
        tid = null
    }

    const open = (modalComponent) => {
        if (active === wi) {
            // noinspection JSUnusedGlobalSymbols
            const d: ModalSettings = {
                type: 'component',
                // Pass the component directly:
                component: modalComponent,
                title: "Confirmation form",
                body: "What's up doc",
                response: (r: boolean) => {
                    console.log(r)
                }
            }
            modalStore.trigger(d)
        }
    }
    const setStatus = ([wi, di, si]: SlotId) => () => {

        const modalComponent: ModalComponent = {
            // Pass a reference to your custom component
            ref: ModalConfirm,
            // Add the component properties as key/value pairs
            props: {booker, sid: [wi, di, si]},
            // Provide a template literal for the default component slot
            slot: '<p>Skeleton</p>'
        }
        open(modalComponent)
    }

    export let setActive
</script>


<table>
    <tr>
        {#if active === wi}
            <Shift active="{active}"
                   setActive="{setActive}"
                   booker="{booker}"/>
        {/if}
        <DayList/>
    </tr>
    {#each Array(booker.slotsPerDay) as _,si}
        {#if booker.firstInShift(si)}
            <tr class="leading-3">
                <td>&nbsp;</td>
            </tr>
        {/if}
        <tr class="leading-4 hover:bg-surface-700">
            <Ruler active="{active === wi}"
                    slot="{si}"
                    booker="{booker}"/>
            {#each DAYS as _, di}
                <td on:mouseleave={clear}>
                    <Slot bind:tid="{tid}"
                          sid="{booker.slot([wi, di, si]).id}"
                          slotHover="{booker.slotHover}"
                          color="{active
                                ? booker.dynamicColor([wi, di, si], tid)
                                : booker.staticColor([wi, di, si])}"
                          setStatus="{setStatus([wi, di, si])}"/>
                </td>
            {/each}
        </tr>
    {/each}
</table>

<style>
    td {
        padding: 0 !important;
    }
</style>