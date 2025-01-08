<script>
  import { toastStore } from "$lib/stores/toastStore";
  import { Frame } from "flowbite-svelte";
  import Toast from "./Toast.svelte";

  let state;
  toastStore.subscribe((value) => {
    state = value;
  });
</script>

<Frame position={state?.settings?.position || "top-right"}>
  {#each state?.toasts || [] as toast (toast.id)}
    <Toast
      message={toast.message}
      type={toast.type}
      onClose={() => toastStore.removeToast(toast.id)}
    />
  {/each}
</Frame>
