<!-- wrapper for all output components -->
<script>
  import Popdown from "@components/transitions/Popdown.svelte";
  import FaCogs from "svelte-icons/fa/FaCogs.svelte";

  export let test = undefined; //test function
  export let parameters = {};
</script>

<Popdown>
  <div class="flex flex-wrap lg:flex-nowrap">
    <slot />
    <!-- {#if test}
      <button class="btn btn-ghost w-14" alt="test" on:click={test}
        ><FaCogs /></button
      >
    {/if} -->
  </div>
</Popdown>
