<script>
  import * as state from "@store/program.js";
  import RemoveButton from "./RemoveButton.svelte";
  import NotesTextarea from "./NotesTextarea.svelte";
  import { flip } from "svelte/animate";
  import { spring } from "svelte/motion";
  import { slide } from "svelte/transition";
  import { myslide } from "./swiper.js";
  import FaRegTrashAlt from "svelte-icons/fa/FaRegTrashAlt.svelte";

  let className = "";
  export { className as class };

  let touchable = "ontouchstart" in document.documentElement;

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

  // slide
  // https://svelte.dev/repl/f649d828badf468cacad8bdc8b4088a3?version=3.29.0

  let coords = spring({ x: 0, y: 0 }, { stiffness: 0.05, damping: 0.5 });
  let selected;
  let current;
  let w;

  function handleSlideStart() {
    if (dragDisabled) {
      coords.stiffness = coords.damping = 1;
    }
  }

  function handleSlideMove(event) {
    if (dragDisabled) {
      coords.update(($coords) => ({
        x: $coords.x + event.detail.dx,
        y: $coords.y + event.detail.dy,
      }));
    }
  }

  function handleSlideEnd(event) {
    if (dragDisabled) {
      coords.stiffness = 0.05;
      coords.damping = 0.5;
      coords.set({ x: 0, y: 0 });
    }
  }

  $: side = $coords.x >= (w / 2) * 1 ? "left" : "right";
  $: side === "left" ? remove(current) : "";
</script>

{#if touchable}
  <div class="list-item {$$props.class}" out:slide={{ duration: 500 }}>
    <!-- <RemoveButton {remove} /> -->
    <div class="icon swipe-icon left">
      <FaRegTrashAlt />
    </div>
    <div
      class="flex w-full group hover:bg-gray-100 p-1 z-10 bg-white {$$props.class}"
      {key}
      bind:offsetWidth={w}
      use:myslide
      on:slidestart={() => {
        selected = 1;
        current = 0; //contact.id;
        handleSlideStart();
      }}
      on:slidemove={handleSlideMove}
      on:slideend={handleSlideEnd}
      style="transform: translate3d({selected === 1 ? $coords.x : 0}px, 0, 0)"
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
      <div
        class="widgets flex-none opacity-0 group-hover:opacity-50"
        class:opacity-100={touchable}
      >
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
  </div>
{:else}
  <div class="flex w-full group hover:bg-gray-100 p-1 {$$props.class}">
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
{/if}

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
  .icon {
    color: black;
    width: 64px;
    height: 64px;
  }
  .swipe-icon {
    position: absolute;
    font-size: 2rem;
    padding: 1.2rem;
  }
  .swipe-icon.left {
    left: 40;
  }
  .swipe-icon.right {
    right: 40;
  }
  @media (min-width: 768px) {
    .widgets {
      width: 1.25rem;
    }
  }
</style>
