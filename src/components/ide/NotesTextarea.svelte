<script>
  import { program } from "@store/program.js";

  export let notes;
</script>

<textarea
  class="textarea textarea-ghost rounded-none text-slate-500 hover:bg-gray-50 p-1 placeholder:text-white placeholder:italic placeholder:hover:text-slate-300"
  value={notes || ""}
  placeholder="notes"
  on:change={(me) => {
    notes = me.target.value;
    $program = $program;
  }}
/>
