<script>
  import * as state from "@store/program.js";
  import RemoveButton from "./RemoveButton.svelte";
  import NotesTextarea from "./NotesTextarea.svelte";
  import { flip } from "svelte/animate";

  let className = "";
  export { className as class };

  export let item;
  export let remove;
  export let draggable = false;
  export let dragDisabled = true;
  export let summarize = false;
  export let summary = "-";
  export let key = item.id;

  let localSummarize = false;


  // drag and drop

  function startDrag(e) {
    // preventing default to prevent lag on touch devices (because of the browser checking for screen scrolling)
    e.preventDefault();
    dragDisabled = false;
  }
  function handleKeyDown(e) {
    if ((e.key === "Enter" || e.key === " ") && dragDisabled)
      dragDisabled = false;
  }

  }

  }
</script>

<div
  class="flex w-full group hover:bg-primary hover:bg-opacity-10 p-1 {$$props.class}"
>
  {#if draggable}
    <div class="widgets flex-none">
      <div
        class="opacity-0 group-hover:opacity-50"
        style={"cursor: move"}
        on:mousedown={startDrag}
        on:touchstart={startDrag}
        on:keydown={handleKeyDown}
      >
        =
      </div>
    </div>
  {/if}
  <div class="flex flex-auto flex-wrap" class:opacity-20={item.comment}>
    <div class="basis-2/3">
      {#if summarize || localSummarize}
        {summary}
      {:else}
        <slot />
      {/if}
    </div>
    <div class="basis-full lg:basis-1/3 shrink">
      {#if summarize || localSummarize}
        {item.notes || ""}
      {:else}
        <NotesTextarea bind:notes={item.notes} />
      {/if}
    </div>
  </div>
  <div class="widgets flex-none opacity-0 group-hover:opacity-50">
    <!-- <button
      class="btn opacity-50 group-hover:opacity-100 btn-xs"
    class:btn-ghost={!localSummarize}
    on:click={() => (localSummarize = !localSummarize)}>–</button
  > -->
    <button
      class="btn opacity-50 group-hover:opacity-100 btn-xs"
      class:btn-ghost={!item.comment}
      on:click={() => (item.comment = !item.comment)}>//</button
    >
    {#if remove}
      <RemoveButton {remove} />
    {/if}
  </div>
</div>

<style>
  .autocomplete {
    max-width: 80% !important;
  }
  .input-container {
    width: 100px !important;
  }
  .widgets {
    /* flex: 0 1 auto; */
    width: 2.75rem;
    align-items: center;
  }
  @media (min-width: 768px) {
    .widgets {
      width: 1.25rem;
    }
  }
</style>
