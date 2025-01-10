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
