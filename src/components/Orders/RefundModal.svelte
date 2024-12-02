<script>
  import { createEventDispatcher } from "svelte";
  import Button from "../Button/Button.svelte";

  export let show = false;
  export let title = "Are you sure?";
  export let description = "";
  export let Actions = [];
  export let Items = [];
  export let PriceBreakdown = [];
  export let total = "";
  export let totalValue = "";
  export let modalClasses = "";

  const dispatch = createEventDispatcher();

  const handleAction = (action) => {
    action?.onClick?.();
    dispatch(action.label.toLowerCase());
  };

  const stopPropagation = (event) => event.stopPropagation();

  const closeModal = () => {
    show = false;
    dispatch("close");
  };
</script>

{#if show}
  <button
    type="button"
    class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 w-full border-0"
    on:click={closeModal}
  >
    <button
      type="button"
      class={`bg-white rounded-lg shadow-lg w-96 max-w-md ${modalClasses}`}
      on:click={stopPropagation}
    >
      <div class="flex justify-between items-center px-6 py-4">
        <h3 class="text-xl font-normal text-gray-800">{title}</h3>
      </div>
      <div class="px-6 py-0">
        {#if description}
          <p class="text-sm font-medium text-gray-500 mb-4">{description}</p>
        {/if}
        {#if Items.length > 0}
          <div class="space-y-2 text-sm">
            {#each Items as { label, price, detail }}
              <div class="flex justify-between">
                <span class="font-semibold text-gray-900 text-lg">{label}</span>
                <span class="text-gray-500 text-base font-normal">{price}</span>
              </div>
              {#if detail}
                <div class="flex justify-between text-gray-500">
                  <span class="pl-4">{detail}</span>
                </div>
              {/if}
            {/each}
          </div>
          <hr class="my-4" />
        {/if}
        {#if PriceBreakdown.length > 0}
          <div class="space-y-6">
            {#each PriceBreakdown as { label, value }}
              <div class="flex justify-between sp">
                <span class="text-gray-500 text-base font-normal">{label}</span>
                <span class="text-gray-500 font-normal text-base">{value}</span>
              </div>
            {/each}
            <hr class="my-4" />
          </div>
        {/if}
        <div class="flex justify-between text-sm font-semibold pt-4">
          <span class="text-gray-500 font-normal text-base">{total}</span>
          <span class="text-base text-gray-900 font-semibold">{totalValue}</span
          >
        </div>
      </div>
      <div class="flex justify-around gap-3 p-3 pt-4">
        {#each Actions as action}
          <Button
            size="full"
            {...action}
            beforeIcon={action.beforeIcon}
            afterIcon={action.afterIcon}
            on:click={() => handleAction(action)}
            danger={action.danger}
            strokebtn={action.strokebtn}
          >
            {action.label}
          </Button>
        {/each}
      </div>
    </button>
  </button>
{/if}
