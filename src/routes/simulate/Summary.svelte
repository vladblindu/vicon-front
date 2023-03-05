<script>
    import {VAT} from '$lib/config.ts'
    import {Icon} from '@steeze-ui/svelte-icon'
    import {Info} from '@steeze-ui/feather-icons'

    export let episodes
    export let total = 0
    export let resetForm
    export let submitForm

</script>
<div class="card  m-4 ml-0 p-4">
    <header class="card-header mb-2"><h3>Sumar</h3></header>

    <div class="ml-4">

        <div class="mt-4 mb-4">
            Număr de episoade: <strong>{episodes}</strong>
        </div>
        <div>TVA: {total * VAT} EUR</div>
        <div class="flex gap-2 w-full text-right">
            <span>Neplătitor de TVA</span>
            <a href="info/#vat">
                <Icon src="{Info}" theme="solid" class="w-5"/>
            </a>
        </div>
        <div class="text-xl font-bold mt-10">
            Total: {total} EUR
        </div>
        <div>
            <button on:click={resetForm}
                    class="btn w-full variant-filled-primary rounded-md text-sm mt-4">
                Resetează Formularul
            </button>
            <button on:click={submitForm} class="btn w-full variant-filled-secondary rounded-md text-sm mt-4">
                Creează o comandă
            </button>
        </div>
    </div>
</div>