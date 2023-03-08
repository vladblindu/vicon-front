<script>
    import {getLines, getSectionColor, getSectionBorder, infoId} from '$lib/helpers/simulate.ts'
    import {Avatar, ProgressRadial} from '@skeletonlabs/skeleton'
    import {CHECKBOX, DROPDOWN} from '$lib/constants.ts'

    export let data = {}
</script>
<div class="mt-4">
    {#if Object.keys(data).length}
        {#each data.sections as section}
            <div class="card m-4 mt-0 p-4">
                <div class="card-header flex gap-2 mb-4">
                    <Avatar initials="{section.code}"
                            width="w-8"
                            background="{getSectionColor(section.index)}"/>
                    <div class="mt-1 text-xl font-bold">{section.title}</div>
                </div>
                <div class="ml-4">
                    {section.description}
                </div>
                <div class="mt-4">
                    {#each getLines(data, section.index) as category}
                        <div id="{infoId(section.index, category.meta.index)}" class=" mb-3 rounded-md p-4 {getSectionBorder(section.index)}">
                            <div class="flex gap-2 mb-4">
                                <Avatar initials="{category.meta.index + 1}"
                                        width="w-8"
                                        background="{getSectionColor(section.index)}"/>
                                <div class="mt-1">{category.meta.title}</div>
                            </div>
                            <div class="mt-4 mb-4">
                                {category.meta.description}
                            </div>
                            <div>
                                {#if category.meta.control === DROPDOWN}
                                    <p class="mb-4"><i><strong>Opțiuni:</strong></i></p>
                                    {#each category.data as line, idx}
                                        <div><strong>{idx + 1}. &nbsp; {line.label}</strong></div>
                                        <div class="mb-4">{line.info}</div>
                                    {/each}
                                {:else if category.meta.control === CHECKBOX}
                                    <div>{category.data.info}</div>
                                {/if}
                            </div>
                        </div>
                    {/each}
                </div>
            </div>

        {/each}
    {:else}
        <div class="flex items-center justify-center h-screen">
            <ProgressRadial class="w-24" stroke="60"/>
        </div>
    {/if}
</div>