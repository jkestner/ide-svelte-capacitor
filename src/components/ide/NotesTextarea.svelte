<script>
  import { program } from "@store/program.js";

  export let notes;
</script>

<textarea
  class="textarea textarea-ghost rounded-none text-slate-500 hover:bg-slate-50 p-1 placeholder:text-slate-300 placeholder:opacity-0 placeholder:italic placeholder:hover:opacity-100 placeholder:group-hover:opacity-100"
  value={notes || ""}
  placeholder="notes"
  on:change={(me) => {
    notes = me.target.value;
    $program = $program;
  }}
/>
