<script>
  import { Card } from "flowbite-svelte";
  import Button from "@components/Button/Button.svelte";
  import chevronRight from "../../assets/icons/navigate_next.svg";

  export let ordersSummary;
  export let onClickButton;
  export let buttonClass = "bg-gray-400";
  export let buttonText = "";
</script>

<div class="w-full">
  <Card size="auto" padding={"xl"} class="rounded-2xl">
    <h2 class="text-xl font-normal text-gray-900 mb-1">Order summary</h2>
    <div class=" border-b">
      {#if ordersSummary.tickets.length === 0}
        <h4 class="text-xs text-center text-gray-400 font-normal py-10">
          Choose the ticket type to see a summary of your order
        </h4>
      {:else}
        <ul class="mt-2">
          {#each ordersSummary.tickets as ticket}
            <li class="flex justify-between py-3">
              <div class="flex flex-col">
                <span class="text-lg text-gray-900 font-semibold"
                  >{ticket.quantity} x {ticket.type}</span
                >
                <span class="text-sm text-gray-500 font-medium"
                  >${ticket.price.toFixed(2)} each</span
                >
              </div>
              <span class="text-gray-500 font-normal text-base"
                >${(ticket.quantity * ticket.price).toFixed(2)}</span
              >
            </li>
          {/each}
        </ul>
      {/if}
    </div>
    <div class="pt-4">
      <ul class="text-sm">
        <li class="flex justify-between py-2">
          <span class="text-sm font-normal text-Text-Tartiary">Subtotal</span>
          <span class="font-normal text-base text-gray-500"
            >${ordersSummary.subtotal.toFixed(2)}</span
          >
        </li>
        <li class="flex justify-between py-2">
          <span class="text-sm font-normal text-Text-Tartiary">Tax (6%)</span>
          <span class="font-normal text-base text-gray-500"
            >${ordersSummary.tax.toFixed(2)}</span
          >
        </li>
        <li class="flex justify-between py-2">
          <span class="text-sm font-normal text-Text-Tartiary pb-2"
            >Service Fee (2%)</span
          >
          <span class="font-normal text-base text-gray-500"
            >${ordersSummary.serviceFee.toFixed(2)}</span
          >
        </li>
        <li
          class="flex justify-between font-semibold py-1 border-t border-gray-200 pt-4"
        >
          <span class="text-sm font-normal text-Text-Tartiary">Total</span>
          <span class="text-gray-900 text-2xl font-semibold"
            >${ordersSummary.total.toFixed(2)}</span
          >
        </li>
      </ul>
    </div>
    <div class="mt-4 pb-5">
      <Button
        on:click={onClickButton}
        afterIcon={chevronRight}
        size="full"
        class=" w-full rounded-lg text-white py-3 flex items-center justify-center gap-1 text-sm font-medium {buttonClass}"
      >
        {buttonText}
      </Button>
    </div>
  </Card>
</div>
