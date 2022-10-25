<script>
    import WalletSelector from '$lib/components/wallets/WalletSelector.svelte';
    import CreateWallet from '$lib/components/wallets/CreateWallet.svelte'
    import ImportWallet from '$lib/components/wallets/ImportWallet.svelte'

    import {showComponent} from '$lib/modal';

    function showCreate() {
        showComponent(CreateWallet)
    }
    function showImport() {
        showComponent(ImportWallet)
    }
</script>
<div class="pt-8 px-8 max-w-2xl mx-auto">

    <div class="flex flex-col h-full">
        <div class="flex-none">
            <h2 class="text-xl font-bold py-3">All wallets</h2>
        <div class="flex flex-row space-x-2">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="bg-solar-orange bg-solar-orange-hover px-4 py-1 font-bold text-white flex flex-col items-center w-fit cursor-pointer" on:click={showCreate}>
                Create wallet
            </div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="bg-solar-orange bg-solar-orange-hover px-4 py-1 font-bold text-white flex flex-col items-center w-fit cursor-pointer"  on:click={showImport}>
                Import wallet
            </div>
        </div>
        </div>
        <div class="grow my-2 h-full">
            <WalletSelector/>
        </div>
    </div>

</div>