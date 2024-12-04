<script>
  import { Card } from "flowbite-svelte";

  export let transferData;
</script>

<div class="w-full">
  <Card
    class="bg-white-100 border border-gray-300 rounded-lg w-full "
    size="auto"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {#each transferData as transfer}
        <div>
          <p class="text-sm font-normal text-Text-Tartiary">
            {transfer.label}:
          </p>
          <p class="text-xl font-normal text-Text-Primary">{transfer.title}</p>
          <p class="text-sm font-normal text-Text-Tartiary">{transfer.date}</p>
        </div>
      {/each}
    </div>
  </Card>
</div>
