<script>
    import {Avatar} from '@skeletonlabs/skeleton'
    import {getSectionColor} from './helpers.ts'

    export let section
</script>

<div class="flex align-middle">
    <Avatar
            initials="{section.code}"
            width="w-8"
            background="{getSectionColor(section.index)}"/>
    <span class="ml-2 mt-1">
        {section.title}
    </span>
</div>