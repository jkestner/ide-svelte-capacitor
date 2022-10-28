<script>
  import PartPicker from "./PartPicker.svelte";
  import LedOutput from "./outputs/LedOutput.svelte";
  import EmailOutput from "./outputs/EmailOutput.svelte";
  import GPOutput from "./outputs/GPOutput.svelte";
  import LogOutput from "./outputs/LogOutput.svelte";
  import TwitterOutput from "./outputs/TwitterOutput.svelte";
  import SMSOutput from "./outputs/SMSOutput.svelte";
  import StateOutput from "./outputs/StateOutput.svelte";
  import HTTPOutput from "./outputs/HTTPOutput.svelte";

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
    {
      name: "Set pin",
      value: "gpout",
      component: GPOutput,
    },
    {
      name: "Tweet",
      value: "twitter",
      component: TwitterOutput,
    },
    {
      name: "Call URL",
      value: "httpout",
      component: HTTPOutput,
    },
    {
      name: "Text",
      value: "sms",
      component: SMSOutput,
    },
    {
      name: "Set state",
      value: "state",
      component: StateOutput,
    },
  ];

  export let command;
  export let summarize;
</script>

{#if command && command.command}
  {#if summarize}
    <!-- <div>    <svelte:component this={selected().component} />    </div> -->
  {:else}
    <div class=" mb-2">
      <PartPicker
        vocabulary={commands}
        bind:value={command.command}
        bind:params={command.params}
      />
    </div>
  {/if}
{/if}
