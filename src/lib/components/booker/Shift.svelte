<script lang="ts">
    import {Icon} from '@steeze-ui/svelte-icon'
    import {Play} from '@steeze-ui/feather-icons'
    import {LEFT, RIGHT} from '$lib/booker/constants.ts'
    import type {Booker} from "../../booker"

    export let setActive
    export let active = 0
    export let booker: Booker

    const shift = (dir: number) => () => {
        setActive(dir)
    }

    // noinspection JSUnusedAssignment
    const shiftRight = active < booker.bookerData.meta.weekSpan - 1
        ? 'hover:stroke-primary-500'
        : 'stroke-surface-600'

    // noinspection JSUnusedAssignment
    const shiftLeft = active > 0
        ? 'hover:stroke-primary-500'
        : 'stroke-surface-600'

</script>
<th class="pr-3">
    <button on:click={shift(LEFT)}>
        <Icon theme="solid"
              class="w-4 rotate-180
                    {shiftLeft}"
              src="{Play}"/>
    </button>
    <button on:click={shift(RIGHT)}>
        <Icon theme="solid"
              class="w-4 {shiftRight}"
              src="{Play}"/>
    </button>
</th>