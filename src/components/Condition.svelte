<script>
  import * as state from "@store/program.js";
  import Expression from "./Expression.svelte";
  import RemoveButton from "./ide/RemoveButton.svelte";
  import { slide } from "svelte/transition";
  import { leftover } from "@roxi/routify";
  import NotesTextarea from "./ide/NotesTextarea.svelte";

  export let condition;
  export let summarize;

  async function removeExpression(value) {
    //todo: make sure this is a unique item with a key
    let b = condition.expressions.filter((obj) => obj != value);
    condition.expressions = b;
    await state.update();
  }
</script>

{#if condition}
  {#each condition.expressions as expression}
    {#if summarize}
      <div>
        {expression.left.value}
        {expression.op.op}
        {expression.right.value}
      </div>
    {:else}
      <div
        class="flex items-stretch group"
        transition:slide={{ duration: 100 }}
      >
        <Expression {expression} {condition} isRoot />
        <RemoveButton remove={() => removeExpression(expression)} />
      </div>
    {/if}
  {/each}
{/if}
