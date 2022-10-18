<script>
  import * as state from "@store/program.js";
  import Expression from "./Expression.svelte";
  import RemoveButton from "./RemoveButton.svelte";
  import { slide } from "svelte/transition";

  export let condition;

  async function removeExpression(value) {
    //todo: make sure this is a unique item with a key
    let b = condition.expressions.filter((obj) => obj != value);
    condition.expressions = b;
    await state.update();
  }
</script>

{#if condition}
  {#each condition.expressions as expression}
    <div class="flex items-stretch group" transition:slide={{ duration: 100 }}>
      <Expression {expression} {condition} isRoot />
      <RemoveButton remove={() => removeExpression(expression)} />
    </div>
  {/each}
{/if}
