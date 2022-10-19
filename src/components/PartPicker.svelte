<script>
  import { blank_object } from "svelte/internal";

  export let vocabulary;
  export let value = undefined;
  export let swiper = false;
  export let palette = false;

  let className = "";
  export { className as class };

  function selected() {
    let f = vocabulary.filter((v) => v.value == value);
    if (f.length) return f[0];
    else return vocabulary[0];
  }
</script>

<div
  class="card bg-accent p-1 {$$props.class}"
  class:w-full={selected().component}
>
  {#if swiper}
    swiper
    <!-- <swiper
      :modules="modules"
        :space-between="20"
        loop 
        :initialSlide = "selectedSlide()"
        nested  color="primary" autoHeight grabCursor :pagination="{ clickable: true }" @swiper="onSwiper"
      @slideChange="onSlideChange"
  
      >
        <swiper-slide v-for="a in vocabulary" :key="a" color="primary">
          <div style=" padding:1em; text-align: center;">{{ a }}</div>
        </swiper-slide>
      </swiper> -->
  {:else if palette}
    <div class="btn-group">
      {#each vocabulary as a, i}
        <input
          class="btn"
          type="radio"
          bind:group={value}
          data-title={a.name}
          value={a.value}
        />
      {/each}
    </div>
  {:else}
    <div class="chooser flex items-baseline">
      <select
        class="select  bg-accent text-accent-content"
        bind:value
        placeholder="command"
        color="accent"
      >
        {#each vocabulary as a}
          <option value={a.value} selected={selected().value == a.value}
            >{a.name}</option
          >
        {/each}
      </select>
      {#if selected().component}
        <!-- <div>{selected().component}</div> -->
        <!-- <div>summary</div> -->
      {/if}
    </div>
  {/if}

  {#if selected().component}
    <svelte:component this={selected().component} />
  {/if}
</div>
