<script>
    import {beforeNavigate} from '$app/navigation'
    import {Tab, TabGroup} from '@skeletonlabs/skeleton'
    import TabTitle from '$lib/components/simulate/TabTitle.svelte'
    import Summary from '$lib/components/simulate/Summary.svelte'
    import Line from '$lib/components/simulate/Line.svelte'
    import {getDefaults, getDefaultSection, getSection} from '$lib/helpers/simulate.ts'

    export let data = {}

    const defaults = getDefaults(data)
    const cache = localStorage.getItem('sel')
    let sel = cache
        ? JSON.parse(cache)
        : {...defaults}


    // selected tab
    let tab = 0

    // persist in localStorage
    beforeNavigate(() => {
        localStorage.setItem('sel', JSON.stringify(sel))
    })

    const resetForm = () => {
        sel = {...defaults}
    }

    const resetSection = () => {
        const sectionDefaults = getDefaultSection(tab, data)
        sel = {...sel, ...sectionDefaults}
    }
    const submitForm = () => {
        alert('submitted')
    }

    //let total
    //$:  total = 0 //calc(data, sel)

</script>

<div class="w-full">
    <div class="card w-full md:w-[calc(100%-360px)] m-4 p-4">
        <header class="card-header text-xl font-bold mb-4">
            <div>Configurează un pachet de emisiuni:</div>
        </header>
        <TabGroup class="ml-4">
            {#each data.sections as section, idx}
                <Tab bind:group={tab} name="{section.name}" value={idx}>
                    <TabTitle section="{section}"/>
                </Tab>
            {/each}
            <svelte:fragment slot="panel">
                {#if tab === 0}
                    {#each getSection(tab, data) as line}
                        <Line bind:lineSel="{sel[line.meta.name]}" line="{line}"/>
                    {/each}
                {:else if tab === 1}
                    {#each getSection(tab, data) as line}
                        <Line bind:lineSel="{sel[line.meta.name]}" line="{line}"/>
                    {/each}
                {:else if tab === 2}
                    <p>STORAGE</p>
                {:else if tab === 3}
                    <p>EXTRAS</p>
                {/if}
            </svelte:fragment>
        </TabGroup>
    </div>
</div>
<div class="hidden md:block absolute top-16 w-[340px] right-1 -mt-1">
    <Summary total="{2300}"
             data="{data}"
             tab="{tab}"
             resetForm="{resetForm}"
             resetSection="{resetSection}"
             submitForm="{submitForm}"/>
</div>