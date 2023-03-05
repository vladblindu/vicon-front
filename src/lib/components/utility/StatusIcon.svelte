<script>
    import {getStatusColor} from '$lib/helpers/index.ts'
    export let status
    export let label
</script>
<div class="flex">
    <div class="rounded" style="color:{getStatusColor(status)}"></div>
    {#if label}
        <span class="ml-2">{status}</span>
    {/if}
</div>