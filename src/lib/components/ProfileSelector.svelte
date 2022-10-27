<script>
    import { onMount } from 'svelte';
    import { getWallets } from '$lib/wallets.js';
    
    let wallets;

    onMount(async() => {
        (await getWallets()).subscribe(val => wallets = val);
    })

</script>
<div>
    {#if wallets}
        {#if wallets.selected}
        <div class="h-full flex items-center">
            <div class="grow"></div>
            <div class="py-3 px-3  border border-dark hover:bg-darkest cursor-pointer hover:border hover:border-gray-700 flex flex-row items-center w-fit ">
                <div class="grow">
                    <div class="text-sm">{wallets.selected.name}</div>
                    <div class="font-mono text-xs text-orange ">{wallets.selected.address}</div>
                </div>
            </div>  </div>
            {/if}
    {/if}
</div>
	<!-- <div class="flex flex-row hidden">
		<div class="pr-1">
			<TextBox placeholder="Username" bind:value={$username} />
		</div>
		<div class="pl-2">
			<div class="flex flex-row justify-between">
				<TextBox isPassword placeholder="Password" bind:value={$password} />
				{#if !hasProfile}
					<button on:click={() => generatePassword()} class="hover:text-emerald-500 hover:cursor-pointer pl-2" title="Generate Password">
						<Key />
					</button>
				{/if}
			</div>
		</div>
	</div> -->