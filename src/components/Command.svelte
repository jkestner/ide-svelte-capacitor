<script>
  import PartPicker from "./PartPicker.svelte";
  import LedOutput from "./outputs/LedOutput.svelte";
  import EmailOutput from "./outputs/EmailOutput.svelte";
  import LogOutput from "./outputs/LogOutput.svelte";

  const commands = [
    {
      name: "LED",
      value: "led",
      component: LedOutput,
    },
    {
      name: "Email",
      value: "email",
      component: EmailOutput,
    },
    {
      name: "Log",
      value: "log",
      component: LogOutput,
    },
  ];

  export let command;
</script>

{#if command && command.command}
  <div class="bg-accent mb-2 rounded-xl w-full">
    <PartPicker vocabulary={commands} bind:value={command.command} />
  </div>
{/if}
