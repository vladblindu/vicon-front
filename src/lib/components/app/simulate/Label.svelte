<script>
    import {Avatar} from '@skeletonlabs/skeleton'
    import {Icon} from '@steeze-ui/svelte-icon'
    import {Info} from '@steeze-ui/feather-icons'
    import {getSectionColor, infoLink} from '$lib/helpers/simulate.ts'

    export let title
    export let value
    export let section
    export let index
</script>
<div class="md:flex justify-between mb-4">
    <div class="flex gap-2">
        <Avatar initials="{index}"
                width="w-8"
                background="{getSectionColor(section)}"/>
        <span class="font-bold mt-1">
            {title}
        </span>
        <a href="{infoLink(section, index)}">
            <Icon src="{Info}"
                  theme="solid"
                  class="w-5"/>
        </a>
    </div>
    <span>{value}</span>
</div>