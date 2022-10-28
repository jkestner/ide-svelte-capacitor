<script>
  import * as state from "@store/program.js";
  import Expression from "./Expression.svelte";
  import RemoveButton from "./ide/RemoveButton.svelte";
  import { slide } from "svelte/transition";
  import { leftover } from "@roxi/routify";
  import NotesTextarea from "./ide/NotesTextarea.svelte";
  import { dndzone } from "svelte-dnd-action";
  import { flip } from "svelte/animate";

  export let condition;
  export let summarize;

  function handleSort(e) {
    condition.expressions = e.detail.items;
  }

  async function removeExpression(value) {
    //todo: make sure this is a unique item with a key
    let b = condition.expressions.filter((obj) => obj != value);
    condition.expressions = b;
    await state.update();
  }
  const flipDurationMs = 300;
</script>

{#if condition}
  <!-- {#each condition.expressions as item (item.id)}
    {item.id} -
  {/each} -->

  <!-- abstract this so Condition, Action, etc are inside a draggable row with close/drag widgets, responsive -->
  <section
    use:dndzone={{ items: condition.expressions, flipDurationMs: 300 }}
    on:consider={handleSort}
    on:finalize={handleSort}
  >
    {#each condition.expressions as expression (expression.id)}
      <div animate:flip={{ duration: flipDurationMs }}>
        <!-- workaround so that elements that have a svelte component (with bindings?) don't disappear when drag/dropping-->
        {#if expression.isDndShadowItem}
          <div>
            {expression.left.value}
            {expression.op.op}
            {expression.right.value}
          </div>
        {:else if summarize}
          <div>
            {expression.left.value}
            {expression.op.op}
            {expression.right.value}
          </div>
        {:else}
          <div class="flex items-stretch group columns-2  hover:bg-slate-100">
            <div class="w-1/2 relative">
              <Expression {expression} {condition} isRoot />
              <RemoveButton remove={() => removeExpression(expression)} />
            </div>
            <NotesTextarea bind:notes={expression.notes} />
          </div>
        {/if}
      </div>
    {/each}
  </section>
{/if}
