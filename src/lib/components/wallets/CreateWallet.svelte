<script>

    import {close} from '$lib/modal';
    import {onMount} from "svelte"
    import { getWallets } from '$lib/wallets.js';

    let wallets;

    let mnemonic = "";
    let address = "";
    let name = "";

    let thirdword = "";
    let sixthword = "";
    let ninthword = "";

    let step = 1;

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
        refreshMnemonic()
    });

</script>
<div class="bg-darkest py-1 border border-darkest px-4 max-w-2xl mx-auto">
    <div class="flex flex-row">
        <h2 class="text-xl font-bold pb-1 pt-6">Create wallet</h2>
        <div class="grow"></div>
        <button class="cursor-pointer hover:text-red-400 pt-2" on:click={close}>✕</button>
    </div>
    {#if step == 1}
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
{#if mnemonic.length > 0 && name.length > 0}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="bg-solar-orange bg-solar-orange-hover px-4 py-1 font-bold text-white flex flex-col items-center w-fit cursor-pointer"
on:click={() => step = 2}>
    Next
</div>
{/if}
{:else}
<div class="py-6">
    <div class="pb-6">Confirm the words of your mnemonic.</div>
<div class="flex flex-row space-x-4 w-fit mx-auto pb-6 mb-6">
    <div>
        <div class="py-2">The third word</div>
        <input type="text" bind:value={thirdword} class={`w-28 text-center ${thirdword == mnemonic.split(" ")[2]? 'bg-[#62b7aa]' : 'bg-dark'}`}>
    </div>
    <div>
        <div class="py-2">The sixth word</div>
        <input type="text" bind:value={sixthword} class={`w-28 text-center ${sixthword == mnemonic.split(" ")[5]? 'bg-[#62b7aa]' : 'bg-dark'}`}>
    </div>
    <div>
        <div class="py-2">The ninth word</div>
        <input type="text" bind:value={ninthword} class={`w-28 text-center ${ninthword == mnemonic.split(" ")[8]? 'bg-[#62b7aa]' : 'bg-dark'}`}>
    </div>
</div></div>
{#if mnemonic.length > 0 && thirdword == mnemonic.split(" ")[2] && sixthword == mnemonic.split(" ")[5] && ninthword == mnemonic.split(" ")[8] }
<div class="pb-6">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="bg-solar-orange bg-solar-orange-hover px-4 py-1 font-bold text-white flex flex-col items-center w-fit cursor-pointer"
on:click={createWallet}>
    Create
</div>
</div>
{/if}
{/if}

</div>