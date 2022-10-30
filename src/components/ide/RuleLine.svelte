<script>
  import * as state from "@store/program.js";
  import RemoveButton from "./RemoveButton.svelte";
  import NotesTextarea from "./NotesTextarea.svelte";
  import { dndzone } from "svelte-dnd-action";
  import { flip } from "svelte/animate";

  export let item;
  export let collection;
  export let remove;
  export let summarize;

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

<div class="flex items-stretch group columns-3 hover:bg-primary relative">
  <div class="w-2/3">
    <slot />
  </div>
  <NotesTextarea bind:notes={item.notes} />
  <div class="widgets w-2">
    <button
      class="btn btn-ghost no-animation opacity-50 group-hover:opacity-100 btn-xs col-span-1 z-20 -ml-6 mt-0 right-1 top-1"
      on:click={() => (summarize = !summarize)}>—</button
    >
    <button
      class="btn btn-ghost no-animation opacity-50 group-hover:opacity-100 btn-xs col-span-1 z-20 -ml-6 mt-0 right-1 top-1"
      >=</button
    >
    <RemoveButton {remove} />
  </div>
</div>
