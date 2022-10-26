<script>

    import {close} from '$lib/modal';
    import {onMount} from "svelte"
    import { getWallets } from '$lib/wallets.js';

    let wallets;

    let mnemonic = "";
    let address = "";
    let password = "";
    let name = "";

    async function refreshMnemonic() {
        let bip39 = await import("bip39")
        mnemonic = bip39.generateMnemonic()
        let Solar = await import("@solar-network/crypto/dist/index")
        Solar.Managers.configManager.setFromPreset("mainnet")
        address = Solar.Identities.Address.fromPassphrase(mnemonic)
    }

    async function createWallet() {
        let newWallet = {
            address: address,
            mnemonic: mnemonic,
            name: name,
            password: password
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
        refreshMnemonic()
    });

</script>
<div class="bg-darkest py-6 border border-darkest px-4 max-w-2xl mx-auto">
    <h2 class="text-xl font-bold py-1">Create wallet</h2>
<div class="py-3">
    <h6>Name</h6>
    <input type="text" class="px-2 py-1 bg-dark text-sm my-2" name="" bind:value={name} placeholder="Name of your wallet" id="">
</div>
<div class="py-1">
    <h6>Address</h6>
    <div class="flex flex-row items-center">
        <div class="text-orange text-sm font-mono my-2">{address}</div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div><div class="ml-4 bg-solar-orange bg-solar-orange-hover px-2 font-bold text-white flex flex-col items-center w-fit cursor-pointer"
            on:click={refreshMnemonic}
            >
            ⟳
            </div></div>
    </div>
</div>
<div class="py-1">
    <h6>Mnemonic</h6>
    <div class="text-xl font-bold  my-2">{mnemonic}</div>
    <div class="py-2 italic text-sm text-yellow-400">Please copy and backup your mnemonic before creating your wallet.</div>
</div>
<div class="py-3">
    <h6>Password (required)</h6>
    <input type="password" class="px-2 py-1 bg-dark text-sm my-2" bind:value={password} name="" placeholder="Name of your wallet" id="">
</div>
{#if mnemonic.length > 0 && password.length > 0 && name.length > 0}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="bg-solar-orange bg-solar-orange-hover px-4 py-1 font-bold text-white flex flex-col items-center w-fit cursor-pointer"
on:click={createWallet}>
    Create
</div>
{/if}
</div>