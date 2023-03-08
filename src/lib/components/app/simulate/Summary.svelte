<script>
    import {VAT} from '$lib/config.ts'
    import {Icon} from '@steeze-ui/svelte-icon'
    import {Info} from '@steeze-ui/feather-icons'
    import {Avatar} from '@skeletonlabs/skeleton'
    import {getSectionColor} from '$lib/helpers/simulate.ts'

    export let data = {}

    export let tab = 0
    export let total = 0
    export let resetForm
    export let resetSection
    export let submitForm
    let section
    $: section = data.sections[tab]
    $: color = getSectionColor(tab)
</script>
<div class="card m-4 ml-0 p-4">
    <header class="card-header mb-2"><h3>Sumar</h3></header>

    <div class="ml-4">

        <div class="mt-4 mb-4">
            Număr de episoade: <strong>34</strong>
        </div>
        <div>TVA: {total * VAT} EUR</div>
        <div class="flex gap-2 w-full text-right">
            <span>Neplătitor de TVA</span>
            <a href="../info/#vat">
                <Icon src="{Info}" theme="solid" class="w-5"/>
            </a>
        </div>
        <div class="text-xl font-bold mt-10 mb-10">
            Total: {total} EUR
        </div>
        <div>
            <div class="text-lg mb-4">Resetează:</div>
            <div class="btn-group w-full rounded-md variant-ringed-secondary">
                <button on:click={resetSection}>
                    <Avatar initials="{section.code}"
                            class="w-6"
                            background="{color}"/>&nbsp;Secțiunea
                </button>
                <button on:click={resetForm}>
                    Formularul
                </button>
            </div>

            <button on:click={submitForm} class="btn w-full variant-filled-secondary rounded-md text-sm mt-4">
                Creează o comandă
            </button>
        </div>
    </div>
</div>