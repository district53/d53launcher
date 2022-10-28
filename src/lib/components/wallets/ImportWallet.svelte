<script>
        import {close} from '$lib/modal';
        import {onMount} from "svelte"
        import { getWallets } from '$lib/wallets.js';

        let wallets;


        let mnemonic = "";
        let address = "";
        let name = "";

    async function refreshMnemonic(value) {
        let Solar = await import("@solar-network/crypto/dist/index")
        mnemonic = value
        Solar.Managers.configManager.setFromPreset("mainnet")
        address = Solar.Identities.Address.fromPassphrase(value)
    }

    async function importWallet() {
        let newWallet = {
            address: address,
            mnemonic: mnemonic,
            name: name
        }
        if (wallets.wallets.length == 0) {
            wallets.wallets = [newWallet]
            wallets.selected = newWallet
        } else {
            let existing = wallets.wallets.filter((wallet) => {if (wallet.address == address) {return wallet}})
            if (!existing.length) {
                wallets.wallets.push(newWallet)
            }
        }
        (await getWallets()).set(wallets)
        close()
    }

    onMount(async() => {
        (await getWallets()).subscribe(val => wallets = val);
        refreshMnemonic("")
    });
</script>
<div class="bg-darkest py-1 border border-darkest px-4 max-w-2xl mx-auto">
    <div class="flex flex-row">
        <h2 class="text-xl font-bold pb-1 pt-6">Import wallet</h2>
        <div class="grow"></div>
        <button class="cursor-pointer hover:text-red-400 pt-2" on:click={close}>✕</button>
    </div>
<div class="py-3">
    <h6>Name</h6>
    <input type="text" class="px-2 py-1 bg-dark text-sm my-2" name="" bind:value={name} placeholder="Name of your wallet" id="">
</div>
<div class="py-1">
    <h6>Address</h6>
    <div class="text-orange text-sm font-mono my-2">{address}</div>
</div>
<div class="py-1">
    <h6>Mnemonic (required)</h6>
    <textarea class="text-xl font-bold bg-dark w-full  my-2 p-3" bind:value={mnemonic} on:keyup={(e) => {refreshMnemonic(e.currentTarget.value)}}></textarea>
</div>
{#if mnemonic.length > 0 && name.length > 0}
<!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="bg-solar-orange bg-solar-orange-hover px-4 py-1 font-bold text-white flex flex-col items-center w-fit cursor-pointer" on:click={importWallet}>
        Import
    </div>
{/if}
</div>