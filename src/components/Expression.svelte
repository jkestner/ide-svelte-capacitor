<script>
  import Literal from "./Literal.svelte";
  import PartPicker from "./PartPicker.svelte";

  // need some standardized concept/ui of how precise these are. range slider? fuzziness
  const operations = [
    { name: "equals", value: "==" },
    { name: "is greater than", value: ">" },
    { name: "is less than", value: "<" },
    { name: "doesn't equal", value: "!=" },
    { name: "changes by", value: "∆" },
    { name: "rises by", value: "∆" },
    { name: "falls by", value: "∆" },
  ];
  const bool_operations = [
    { name: "and", value: "and" },
    { name: "or", value: "or" },
  ];
  export let expression;
  export let condition;
  export let isRoot = false;
</script>

{#if expression}
  <div
    class="flex items-stretch bg-accent p-1 mb-2 rounded-xl {isRoot
      ? 'w-full'
      : 'grid-cols-1 ml-3'}"
  >
    {#if expression.left.expr}
      <svelte:self expression={expression.left.expr} /><br />
      <PartPicker
        class="h-10"
        vocabulary={bool_operations}
        bind:value={expression.op.op}
      />
    {:else}
      <Literal bind:value={expression.left.value} />
      <PartPicker
        class="h-10"
        vocabulary={operations}
        bind:value={expression.op.op}
      />
    {/if}
    {#if expression.right.expr}
      <svelte:self expression={expression.right.expr} />
    {:else}
      <Literal bind:value={expression.right.value} />
    {/if}
  </div>
{:else}
  no expression
{/if}
