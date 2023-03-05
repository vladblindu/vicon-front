<script>
    import {beforeNavigate} from '$app/navigation'
    import {Tab, TabGroup} from '@skeletonlabs/skeleton'
    import TabTitle from './TabTitle.svelte'
    import Summary from './Summary.svelte'
    import {getDefaults, getSection} from './helpers.ts'
    import Line from './Line.svelte'
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

    const submitForm = () => {
        alert('submitted')
    }

    //let total
    //$:  total = 0 //calc(data, sel)

    console.log(data)
</script>

<div class="w-full md:w-1/2 lg:w-3/4">
    <div class="card m-4 p-4">
        <header class="card-header text-xl font-bold mb-4">
            <div>Configurează un pachet de emisiuni:</div>
        </header>
        <TabGroup class="ml-4">
            {#each data.sections as section, idx}
                <Tab bind:group={tab} name="{section.name}" value={idx}>
                    <TabTitle section="{section}"/>
                </Tab>
            {/each}
            <!-- Panel -->
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
<div class="hidden md:block absolute right-1 top-16 md:w-1/2 lg:w-1/4 -mt-1">
    <Summary episodes="{12}"
             total="{2300}"
             resetForm="{resetForm}"
             submitForm="{submitForm}"/>
</div>