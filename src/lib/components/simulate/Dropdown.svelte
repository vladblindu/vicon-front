<!--suppress HtmlWrongAttributeValue -->
<script>
    import Label from './Label.svelte'
    import {defaultValueKey} from '$lib/config.ts'
    import {byIndex} from '$lib/helpers/simulate.ts'

    let info
    export let lineSel = 0
    export let line = {}
    export let isSelected = byIndex

    if(!Array.isArray(line.data)){
        throw new Error("SelectLine line has to be of type array.")
    }

    let value
    const {title, section, index, mu} = line.meta
    const options = line.data
    const valueKey = line.meta.valueKey || defaultValueKey
    $: value = line.data[lineSel][valueKey]
    $: info = line.data[lineSel].info
</script>

<div class="label mb-3 rounded-md p-4  ring-outline-token">
    <Label
            title="{title}"
            value="{`${value} ${mu}`}"
            index="{index}"
            section="{section}"/>

    <select class="select" bind:value={lineSel}>
        {#each options as opt, idx}
            <option
                    value="{idx}"
                    selected="{isSelected(lineSel, idx, opt)}">
                {opt.label}
            </option>
        {/each}
    </select>
    <div class="text-sm">{info}</div>
</div>