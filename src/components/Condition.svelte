<script>
  import RuleLine from "./ide/RuleLine.svelte";

  import * as state from "@store/program.js";
  import Expression from "./Expression.svelte";
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

<section
  use:dndzone={{ items: condition.expressions, flipDurationMs: 300 }}
  on:consider={handleSort}
  on:finalize={handleSort}
>
  {#each condition.expressions as expression (expression.id)}
    <div class="relative" animate:flip={{ duration: flipDurationMs }}>
      <!-- workaround so that elements that have a svelte component (with bindings?) don't disappear when drag/dropping-->
      {#if expression.isDndShadowItem}
        <div>
          {expression.left.value.label || expression.left.value}
          {expression.op.op}
          {expression.right.value.label || expression.right.value}
        </div>
      {:else if summarize}
        <div>
          {expression.left.value.label || expression.left.value}
          {expression.op.op}
          {expression.right.value.label || expression.right.value}
        </div>
      {:else}
        <RuleLine
          item={expression}
          collection={condition.expressions}
          remove={() => removeExpression(expression)}
        >
          <Expression {expression} {condition} isRoot />
        </RuleLine>
      {/if}
    </div>
  {/each}
</section>
