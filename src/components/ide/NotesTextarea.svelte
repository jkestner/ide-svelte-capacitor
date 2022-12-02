<script>
  import { program } from "@store/program.js";
  import { onMount } from "svelte";

  export let notes = "";
  let textarea;
  let height = 5;
  $: heightProp = "height: " + height + "px";
  onMount(() => {
    height = textarea.scrollHeight;
  });
</script>

<textarea
  class="flex w-full textarea textarea-ghost min-h-6 leading-snug rounded-none text-slate-500 hover:bg-slate-50 m-1 p-1 placeholder:text-slate-300 placeholder:opacity-0 placeholder:italic placeholder:hover:opacity-100 placeholder:group-hover:opacity-100"
  style={heightProp}
  value={notes || ""}
  placeholder="notes"
  bind:this={textarea}
  on:change={(me) => {
    // save notes
    notes = me.target.value;
    $program = $program;
  }}
  on:input={(me) => {
    // adjust height as needed when typing
    height = me.target.scrollHeight;
  }}
/>
