<script>
  import { program } from "@store/program.js";
  import RemoveButton from "./ide/RemoveButton.svelte";
  import NotesTextarea from "./ide/NotesTextarea.svelte";

  function removeState(state) {
    $program.state_vars.splice($program.state_vars.indexOf(state), 1);
    $program = $program;
  }
</script>

<div class="card p-2">
  <div class="card-title">State</div>
  <div class="card-body">
    {#if $program.state_vars}
      {#each $program.state_vars as v}
        <div class="group hover:bg-slate-100 md:columns-2 relative">
          <div class="w-1/2">
            <input
              value={v.label}
              on:change={(me) => {
                v.label = me.target.value;
                $program = $program;
              }}
              class="input input-ghost text-lg placeholder-gray-100 placeholder-opacity-0 hover:placeholder-opacity-50"
            />: {@html v.value || "<em>no value</em>"}
            <RemoveButton remove={() => removeState(v)} />
          </div>
          <NotesTextarea bind:notes={v.notes} />
        </div>
      {/each}
    {/if}
  </div>
</div>
