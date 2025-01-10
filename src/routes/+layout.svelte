<script>
  import { Toaster, toast } from "svelte-sonner";
  import "../app.css";
</script>

<div class="app">
  <main>
    <slot />
    <Toaster
      expand="true"
      closeButton={true}
      offset="10px"
      toastOptions={{
        class: "w-[410px] right-0",
        classes: {
          error: "text-red-400",
          success: "text-green-400",
          warning: "text-yellow-400",
          info: "text-blue-400",
        },
      }}
    />
  </main>
</div>
