<script lang="ts">
  import { Router } from "@roxi/routify";
  import { onMount } from "svelte";
  import { routes } from "../.routify/routes";
  import * as state from "@store/program.js";

  onMount(async () => {
    // try {
    //   let db = new PouchDB("Programs");
    //   if (db) console.log("destroy db: ", await db.destroy());
    // } catch {
    //   console.log("didn't destroy db");
    // }

    console.log("boot db");
    await state.boot(new PouchDB("Programs"));
  });
</script>

<Router {routes} />
