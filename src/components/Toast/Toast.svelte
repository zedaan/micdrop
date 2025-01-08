<script>
    import { Toast } from 'flowbite-svelte';
    import { CheckCircleSolid, ExclamationCircleSolid, FireOutline, CloseCircleSolid } from 'flowbite-svelte-icons';
  
    export let message = ''; 
    export let color = 'green'; 
    export let icon = ''; 
  </script>
  
  <Toast {color}>
    <svelte:fragment slot="icon">
      {#if icon}
        {@html icon}
      {:else if color === 'green'}
        <CheckCircleSolid class="w-5 h-5" />
      {:else if color === 'red'}
        <CloseCircleSolid class="w-5 h-5" />
      {:else if color === 'yellow'}
        <ExclamationCircleSolid class="w-5 h-5" />
      {:else}
        <FireOutline class="w-6 h-6" />
      {/if}
      <span class="sr-only">Icon</span>
    </svelte:fragment>
    {message}
  </Toast>
  