<script>
    import Cog from '$lib/icon/Cog.svelte';
    import Minus from '$lib/icon/Minus.svelte';
    import Check from '$lib/icon/Check.svelte';
    import { getWallets } from '$lib/wallets.js';
    import { onMount, onDestroy } from 'svelte';
    import EditWallet from '$lib/components/wallets/EditWallet.svelte'
    import {showComponent} from '$lib/modal';

    let wallets;
    onMount(async() => {
        (await getWallets()).subscribe(val => wallets = val);
    });

    function removeWallet(address) {
        wallets.wallets = wallets.wallets.filter((wallet) => wallet.address != address)
        if (wallets.wallets.length == 0) {
            wallets.selected = {}
        } else {
            wallets.selected = wallets.wallets[wallets.wallets.length-1]
        }
        getWallets().then((ww) => {ww.set(wallets)})
    }
    
</script>
<div>
{#if wallets}
    {#each wallets.wallets as wallet}
    <div class="py-3 px-3 my-2 border border-gray-700 hover:bg-darkest cursor-pointer hover:border hover:border-darkest flex flex-row items-center">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="text-red-400 px-1 py-1 mx-2 bg-solar-orange-hover hover:text-white font-bold text-white flex flex-col items-center w-fit cursor-pointer" on:click={() => {removeWallet(wallet.address)}}>
            <Minus />
        </div>
        {#if wallets.selected}
            {#if wallets.selected.address == wallet.address}
                <div class=" px-3 py-1 font-bold text-white flex flex-col items-center w-fit cursor-pointer">
                    <Check />
                </div>
            {/if}
        {/if}
        <div class="grow">
            <div>{wallet.name}</div>
            <div class="font-mono text-sm text-orange ">{wallet.address}</div>
        </div>
        {#if wallets.selected}
            {#if wallets.selected.address != wallet.address}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class=" px-1 py-1 mx-2 bg-solar-orange-hover font-bold text-white flex flex-col items-center w-fit cursor-pointer" on:click={() => {getWallets().then((ww) => {ww.set({selected: wallet, wallets: wallets.wallets})})}}>
                <Check />
            </div>
                {/if}
            {/if}

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="bg-solar-orange-hover px-1 py-1 font-bold text-white flex flex-col items-center w-fit cursor-pointer" on:click={() => {showComponent(EditWallet,{address: wallet.address})}}>
            <Cog />
        </div>
    </div>
    {/each}
{/if}
</div>