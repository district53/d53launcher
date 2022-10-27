<script>
  import Eye from "$lib/icon/Eye.svelte";
  import EyeOff from "$lib/icon/EyeOff.svelte";
  import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();
const toggle = () => dispatch('toggle');
  let eye = true;
</script>

<div class="px-2">
  {#if eye}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span
      on:click={() => {
        eye = false;
        toggle()
      }}><Eye /></span
    >
  {:else}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span
      on:click={() => {
        eye = true;
        toggle()
      }}><EyeOff /></span
    >
  {/if}
</div>
