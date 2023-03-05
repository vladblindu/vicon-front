<script>

    import Label from './Label.svelte'
    import {defaultValueKey} from '$lib/config.ts'

    export let line = {}
    export let lineSel = false

    let value
    const {title, section, index, mu} = line.meta
    const valueKey = line.meta.valueKey || defaultValueKey
    const {label, info} = line.data
    $: value = lineSel ? line.data[valueKey] : 0

</script>
<div class="mb-6 label rounded-md p-4 ring-outline-token">
    <Label
            title="{title}"
            value="{`${value} ${mu}`}"
            index="{index}"
            section="{section}"/>
    <div class="flex mb-4">
        <input class="checkbox" type="checkbox" bind:checked="{lineSel}"/>
        <p class="ml-2">{label}</p>
    </div>
    <span class="text-sm">{info}</span>
</div>