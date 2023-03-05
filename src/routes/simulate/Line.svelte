<script>
    import {DROPDOWN, CHECKBOX} from '$lib/constants.ts'
    import Dropdown from './Dropdown.svelte'
    import Checkbox from './Checkbox.svelte'

    export let line
    export let lineSel
</script>

{#if line.meta.control === DROPDOWN}
    <Dropdown
            line="{line}"
            bind:lineSel="{lineSel}"/>
{:else if line.meta.control === CHECKBOX}
    <Checkbox
            line="{line}"
            bind:lineSel="{lineSel}"/>
{/if}