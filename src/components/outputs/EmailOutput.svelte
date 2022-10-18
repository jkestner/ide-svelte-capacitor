<script>
  import VariableInserter from "@components/VariableInserter.svelte";
  import Popdown from "@components/transitions/Popdown.svelte";

  export let params = [];

  export function summary() {
    return "email@address";
  }
</script>

<Popdown>
  <div class="card bg-neutral">
    <div class="form-control">
      <label class="input-group">
        <span>To</span>
        <input
          type="text"
          placeholder="info@site.com"
          class="input input-bordered"
        />
      </label>
    </div>

    <div class="form-control indicator">
      <label class="input-group">
        <span>Body</span>
        <textarea
          type="text"
          placeholder="info@site.com"
          class="textarea textarea-bordered"
        />
      </label>
      <div class="indicator-item pt-6">
        <VariableInserter />
      </div>
    </div>

    <div class="card-actions">
      <button class="btn btn-outline">test</button>
    </div>
  </div>
</Popdown>
