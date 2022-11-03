<script>
  import * as state from "@store/program.js";
  import RemoveButton from "./RemoveButton.svelte";
  import NotesTextarea from "./NotesTextarea.svelte";
  import { dndzone } from "svelte-dnd-action";
  import { flip } from "svelte/animate";

  export let item;
  export let collection;
  export let remove;
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

<div class="flex group hover:bg-primary hover:bg-opacity-10 relative">
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
  <div class="widgets flex-initial flex flex-col">
    <!-- <button
      class="btn no-animation opacity-50 group-hover:opacity-100 btn-xs col-span-1"
      class:btn-ghost={!localSummarize}
      on:click={() => (localSummarize = !localSummarize)}>–</button
    > -->
    <button
      class="btn no-animation opacity-50 group-hover:opacity-100 btn-xs col-span-1"
      class:btn-ghost={!item.commented}
      on:click={() => (item.comment = !item.comment)}>//</button
    >
    <!-- <button
      class="btn btn-ghost no-animation opacity-50 group-hover:opacity-100 btn-xs col-span-1"
      >=</button
    > -->
    <RemoveButton {remove} />
  </div>
</div>
