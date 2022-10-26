import { writable } from 'svelte/store';

export const selectedVersion = writable({});
export const selectedServer = writable({});
export const selectedWallet = writable({});

export let preferences = false;
export let wallets = false;