<script>
	import { getUserdata } from '$lib/userdata';
    import { selectedServer } from '$lib/stores';
    import { onMount, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
    import { getWallets } from '$lib/wallets.js';

    
    import TextBox from '$lib/components/element/form/TextBox.svelte';
    import Checkbox from '$lib/components/element/form/Checkbox.svelte';
    import Key from '$lib/icon/Key.svelte';
    
    let wallets;
    let profiles;
    let hasProfile = false;
    let unsubscribeServer, unsubscribeUserdata;

    export let username = writable('');
    export let password = writable('');
    export let saveIdentity = writable(true);

    onMount(async() => {
        (await getWallets()).subscribe(val => wallets = val);
        profiles = await getUserdata();



        unsubscribeServer = selectedServer.subscribe(val => {
            let prof = $profiles;
            if (Object.keys(prof.server_identities).includes(val.fullAddress)) {
                let identity = prof.server_identities[val.fullAddress];
                $username = identity.username;
                $password = identity.password;
                hasProfile = true;

                $saveIdentity = false;
			}
            else {
                //TODO do we want to do this?
                $username = '';
                $password = '';
                hasProfile = false;

                $saveIdentity = true;
			}
		});

        unsubscribeUserdata = profiles.subscribe(val => {
            let server = $selectedServer;
            if (Object.keys(val.server_identities).includes(server.fullAddress)) {
                hasProfile = true;
			}
		});
	});

    onDestroy(() => {
        unsubscribeServer();
        unsubscribeUserdata();
	})

    function generatePassword() {
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?,.-_()[];:';
        const len = 32;
        let res = '';
        for (let i = 0; i < len; i++) {
            let randIndex = Math.random() * charset.length;
            res += charset.charAt(randIndex);
		}

        $password = res;
	}
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