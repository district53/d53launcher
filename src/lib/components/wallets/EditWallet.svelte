<script>        import {close} from '$lib/modal';
</script>
<div class="bg-darkest py-6 border border-darkest px-4 max-w-2xl mx-auto">
    <h2 class="text-xl font-bold py-1">Edit wallet</h2>
<div class="py-3">
    <h6>Name</h6>
    <input type="text" class="px-2 py-1 bg-dark text-sm my-2" name="" placeholder="Name of your wallet" id="">
</div>
<div class="py-1">
    <h6>Address</h6>
    <div class="text-orange text-sm font-mono my-2">SPACELPYtxRSQom48QvsQa7E1HRfSBx33u</div>
</div>
<div class="py-3">
    <h6>New password</h6>
    <input type="text" class="px-2 py-1 bg-dark text-sm my-2" name="" placeholder="New password" id="">
</div> 
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="bg-solar-orange bg-solar-orange-hover px-4 py-1 font-bold text-white flex flex-col items-center w-fit cursor-pointer"
on:click={close}>
    Save
</div>
</div>