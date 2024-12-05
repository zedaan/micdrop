<script>
  import { Card } from "flowbite-svelte";
  import Toggle from "@components/ToggleSwitch/Toggle.svelte";
  import Button from "@components/Button/Button.svelte";
  import Badge from "@components/Badges/Badge.svelte";

  export let transferSummary;
  function handleAlert() {
    alert("Hii, This is Function Alert");
  }
</script>

<div class="w-full">
  <Card size="auto">
    <h2 class="text-xl font-normal text-gray-900 mb-1">Transfer Summary</h2>
    <p class="text-base text-gray-500 mb-4 font-normal">
      The customer will be charged or refunded the difference between the
      amounts of the original and new order.
    </p>

    <div class="mb-4">
      <h3
        class="text-sm font-bold bg-gray-100 text-gray-900 rounded-sm p-1 border-res"
      >
        Original tickets
      </h3>
      <ul class="mt-2">
        {#each transferSummary.originalTickets as ticket}
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
              >-${(ticket.quantity * ticket.price).toFixed(2)}</span
            >
          </li>
        {/each}
      </ul>
    </div>

    <div class="">
      <h3
        class="text-sm font-bold bg-gray-100 text-gray-900 rounded-sm p-1 border-res"
      >
        New tickets
      </h3>
      {#if transferSummary.newTickets.length}
        <ul class="mt-2">
          {#each transferSummary.newTickets as ticket}
            <li class="flex justify-between py-3">
              <div class="flex flex-col">
                <span class="text-lg text-gray-900 font-semibold"
                  >{ticket.quantity} x {ticket.type}</span
                >
                <span class="text-gray-500 text-sm font-medium"
                  >${ticket.price.toFixed(2)} each</span
                >
              </div>
              <span class="ext-gray-500 font-normal text-base"
                >${(ticket.quantity * ticket.price).toFixed(2)}</span
              >
            </li>
          {/each}
        </ul>
      {:else}
        <div
          class="text-base font-normal text-gray-400 text-center w-full py-4"
        >
          Choose the new ticket type to see the new charges
        </div>
      {/if}
      <span
        class="flex justify-between font-semibold py-1 border-t border-gray-200"
      ></span>
    </div>

    <div class="mb-4">
      <ul class="text-sm">
        <li class="flex justify-between py-2">
          <span class="text-sm font-normal text-Text-Tartiary">Subtotal</span>
          <span class="font-normal text-base text-gray-500"
            >${transferSummary.subtotal.toFixed(2)}</span
          >
        </li>
        <li class="flex justify-between py-2">
          <span class="text-sm font-normal text-Text-Tartiary">Tax (6%)</span>
          <span class="font-normal text-base text-gray-500"
            >${transferSummary.tax.toFixed(2)}</span
          >
        </li>
        <li class="flex justify-between py-2">
          <span class="text-sm font-normal text-Text-Tartiary"
            >Service Fee (2%)</span
          >
          <span class="font-normal text-base text-gray-500"
            >${transferSummary.serviceFee.toFixed(2)}</span
          >
        </li>
        <li
          class="flex justify-between font-semibold py-1 border-t border-gray-200 pt-2"
        >
          <span class="text-sm font-normal text-Text-Tartiary">Total</span>
          <span class="text-gray-900 text-2xl font-semibold"
            >${transferSummary.total.toFixed(2)}</span
          >
        </li>
      </ul>
    </div>
    <div class="mt-4 pb-5">
      <Button on:click={handleAlert} size="full">Transfer tickets</Button>
    </div>

    <div>
      {#if transferSummary.refund && transferSummary.refund.toFixed(2) > 0}
        <Badge size="large" status="success" className="w-full h-12 font-normal text-sm">
          The customer will be issued a refund of
          <strong>${transferSummary.refund.toFixed(2)}</strong>
        </Badge>
      {:else if transferSummary.refund}
        <Badge size="large" status="danger" className="w-full h-12 font-normal text-sm">
          The customer will be charged
          <strong>${transferSummary.refund.toFixed(2)}</strong>
        </Badge>
      {/if}
    </div>

    <div class="flex items-center mt-4">
      <Toggle />
      <label for="waive-difference" class="ml-2 text-sm text-gray-900 font-normal ">
        Waive the difference
      </label>
    </div>
  </Card>
</div>
