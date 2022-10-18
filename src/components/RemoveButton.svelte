<script>
  import FaRegTimesCircle from "svelte-icons/fa/FaRegTimesCircle.svelte";

  export let remove;
</script>

<button
  class="btn no-animation btn-circle opacity-0 group-hover:opacity-100 btn-accent btn-xs col-span-1 z-20 -ml-6 mt-0"
  on:click={remove}
>
  <FaRegTimesCircle /></button
>
