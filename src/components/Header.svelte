<script>
  import { url, layout, route, page } from "@roxi/routify";
  import * as state from "@store/program.js";
  import { init } from "svelte/internal";

  async function resetDB() {
    await state.init(new PouchDB("Programs"));
    await state.boot(new PouchDB("Programs"));
  }
</script>

<div class="navbar bg-base -mt-4">
  <div class="flex-1">
    <div class="text-sm">
      <a href={$url("/index")} class="font-bold">Jumprope</a>
      <span class="sm:text-secondary">sm</span>
      <span class="md:text-secondary">md</span>
      <span class="lg:text-secondary">lg</span>
      <span class="xl:text-secondary">xl</span>
      <span class="2xl:text-secondary">2xl</span>
    </div>
  </div>
  <div class="flex-none">
    <button class="btn btn-square btn-ghost" on:click={resetDB}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="inline-block w-5 h-5 stroke-current"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
        /></svg
      >
    </button>
  </div>
</div>
