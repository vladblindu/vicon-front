<script lang="ts">
    import {DAYS} from '$lib/booker/constants.ts'
</script>

{#each DAYS as d, idx}
    <th class="text-center">
        <div class="variant-filled-primary rounded-full font-bold">{d}</div>
    </th>
{/each}