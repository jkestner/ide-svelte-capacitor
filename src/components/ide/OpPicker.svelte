<script>
  import PartPicker from "./PartPicker.svelte";

  export let expression;
  export let bool = false;
  export let set = false;

  // need some standardized concept/ui of how precise these are. range slider? fuzziness
  const operations = [
    { label: "equals", labelDev: "==", value: "==" },
    { label: "is greater than", labelDev: ">", value: ">" },
    { label: "is less than", labelDev: "<", value: "<" },
    { label: "doesn't equal", labelDev: "!=", value: "!=" },
    { label: "changes by", labelDev: "↕︎", value: "↕︎" },
    { label: "rises by", labelDev: "ꜛ", value: "ꜛ" },
    { label: "falls by", labelDev: "ꜜ", value: "ꜜ" },
  ];
  const bool_operations = [
    { label: "and", labelDev: "&&", value: "and" },
    { label: "or", labelDev: "||", value: "or" },
  ];
  const set_operations = [
    { label: "set to", value: "==" },
    { label: "increment by", value: "ꜛ" },
    { label: "decrement by", value: "ꜜ" },
  ];

  let vocabulary;
  if (bool) vocabulary = bool_operations;
  else if (set) vocabulary = set_operations;
  else vocabulary = operations;
</script>

<PartPicker
  bind:vocabulary
  bind:value={expression.op.op}
  class="btn btn-primary rounded-r-none px-0"
  labelProperty="labelDev"
/>
