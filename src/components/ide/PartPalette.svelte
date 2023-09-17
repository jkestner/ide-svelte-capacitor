<script>
  export let vocabulary;
  export let value = undefined; // should be an object with label, value, maybe node, etc.
  export let labelProperty = "label";
  export let params = undefined;
  export let palette = true;

  let className = "";
  export { className as class };

  // this is how we get the value to change when the dropdown does
  // $: value &&

  function selected() {
    let f = vocabulary.filter((v) => {
      let r = v.inputClass == value.inputClass;
      // if (v.nodeName && a && a.nodeName) r = r && v.nodeName == a.nodeName;
      return r;
    });

    if (f.length) return f[0];
    else return vocabulary[0];
  }
  function isSelected(a) {
    if (value.value == a.value && value.nodeName == a.nodeName)
      console.log(value);
    return value.value == a.value && value.nodeName == a.nodeName;
  }

  function fullLabel(a) {
    let label = "";
    if (a.nodeName) label = "@" + a.nodeName + ".";
    label += a[labelProperty];

    return label;
  }
  function fullLabelFormatted(a) {
    let label = "";
    if (typeof a === "string") return a;

    if (a.nodeName)
      label =
        '<span style="font-weight:300" class="mr-0 pr-0">@' +
        a.nodeName +
        ".</span>";
    label += '<span class="ml-0 pl-0">' + a[labelProperty] + "</span>";

    return label;
  }
</script>

<div class="flex {$$props.class}" class:w-full={selected().component}>
  {#if palette}
    <div class="dropdown">
      <label tabindex="0" class="btn btn-primary normal-case mr-1"
        >{@html fullLabelFormatted(value)}</label
      >
      <div tabindex="0" class="menu dropdown-content -mt-12">
        <input
          class="input input-bordered w-full rounded-b-none"
          type="text"
          value={fullLabel(value)}
        />
        <ul
          class="p-2 shadow bg-base-100 rounded-box rounded-t-none w-72 z-50 overflow-auto h-64"
        >
          {#each vocabulary as a, i}
            <li style="font-weight: 600">
              <div
                on:click={() => {
                  value = a;
                  document.activeElement.blur();
                }}
                style="gap: 0"
                class:active={isSelected(a)}
              >
                <!-- {#if a.icon}
                  {a.icon}
                {:else}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    ><path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    /></svg
                  >
                {/if} -->
                {@html fullLabelFormatted(a)}
              </div>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  {:else}
    <div class="chooser flex items-baseline">
      <select
        class="select bg-primary overflow-visible normal-case mr-1 w-44"
        bind
        placeholder="command"
        color="accent"
      >
        {#each vocabulary as a}
          <option value={a.value} selected={selected().value == a.value}>
            {#if a.nodeName}{a.nodeName}.{/if}
            {a[labelProperty]}
          </option>
        {/each}
      </select>
      {#if selected().component}
        <!-- <div>{selected().component}</div> -->
        <!-- <div>summary</div> -->
      {/if}
    </div>
  {/if}

  {#if selected().component}
    <svelte:component this={selected().component} {value} {params} />
  {/if}
</div>
