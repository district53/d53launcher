<script>
    import {close} from '$lib/modal';
    import {onMount} from "svelte"
    import { getWallets } from '$lib/wallets.js';
    import EyeButton from '$lib/components/wallets/EyeButton.svelte';

    let wallets;
    let wallet;

    let name;
    let password;

	export let address;

    function editWallet() {
        wallet.name = name
        wallet.password = password
        getWallets().then((ww) => {ww.set({selected:wallets.selected, wallets: wallets.wallets.filter((wallet) => {if (wallet.address == address) {return wallet } else {return wallet}})})})
        close()
    }

    onMount(async() => {
        (await getWallets()).subscribe(val => wallets = val);
        wallet = wallets.wallets.filter((wallet) => {if (wallet.address == address) {return wallet}})[0]
        name = wallet.name
        password = wallet.password
    });


</script>
<div class="bg-darkest pb-6 border border-darkest px-4 max-w-2xl mx-auto">
    <div class="flex flex-row">
        <h2 class="text-xl font-bold pb-1 pt-6">Edit wallet</h2>
        <div class="grow"></div>
        <button class="cursor-pointer hover:text-red-400 pt-2" on:click={close}>✕</button>
    </div>
    
<div class="py-3">
    <h6>Name</h6>
    <input type="text" class="px-2 py-1 bg-dark text-sm my-2" bind:value={name}  name="" placeholder="Name of your wallet" id="">
</div>
<div class="py-1">
    <h6>Address</h6>
    <div class="text-orange text-sm font-mono my-2">{address}</div>
</div>
<div class="py-3">
    <h6>Password</h6>
    <div class="flex flex-row items-center"><input type="password" class="px-2 py-1 bg-dark text-sm my-2" bind:value={password} name="" placeholder="New password" id="">  </div>
</div> 
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="bg-solar-orange bg-solar-orange-hover px-4 py-1 font-bold text-white flex flex-col items-center w-fit cursor-pointer"
on:click={editWallet}>
    Save
</div>
</div>