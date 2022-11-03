<script>
  import * as state from "@store/program.js";
  import RemoveButton from "./RemoveButton.svelte";
  import NotesTextarea from "./NotesTextarea.svelte";
  import { dndzone } from "svelte-dnd-action";
  import { flip } from "svelte/animate";

  let className = "";
  export { className as class };

  export let item;
  export let collection;
  export let remove;
  export let draggable = false;
  export let summarize = false;
  export let summary = "-";

  let localSummarize = false;

  function handleSort(e) {
    collection = e.detail.items;
  }
  const flipDurationMs = 300;

  async function removeAThing(item) {
    //todo: make sure this is a unique item with a key
    let b = collection.filter((obj) => obj != item);
    collection = b;
    console.log(collection);
    await state.update();
  }
</script>

<div
  class="md:flex group hover:bg-primary hover:bg-opacity-10 relative {$$props.class}"
>
  {#if draggable}
    <div class="widgets">
      <div class="opacity-0 group-hover:opacity-50">=</div>
    </div>
  {/if}
  <div class="md:w-2/3 w-full" class:opacity-20={item.comment}>
    {#if summarize || localSummarize}
      {summary}
    {:else}
      <slot />
    {/if}
  </div>
  <div class="md:w-1/4 w-full">
    {#if summarize || localSummarize}
      {item.notes || ""}
    {:else}
      <NotesTextarea bind:notes={item.notes} />
    {/if}
  </div>
  <div class="widgets">
    <!-- <button
      class="btn opacity-50 group-hover:opacity-100 btn-xs"
      class:btn-ghost={!localSummarize}
      on:click={() => (localSummarize = !localSummarize)}>–</button
    > -->
    <button
      class="btn opacity-50 group-hover:opacity-100 btn-xs"
      class:btn-ghost={!item.commented}
      on:click={() => (item.comment = !item.comment)}>//</button
    >
    <RemoveButton {remove} />
  </div>
</div>

<style>
  .widgets {
    flex: 0 1 auto;
    width: 2.75rem;
    align-items: center;
  }
  @media (min-width: 768px) {
    .widgets {
      width: 1.25rem;
    }
  }
</style>
