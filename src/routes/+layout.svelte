<script>
  import ToastContainer from "@components/Toast/ToastContainer.svelte";
  import "../app.css";
</script>

<div class="app">
  <main>
    <slot />
    <ToastContainer />
  </main>
</div>
