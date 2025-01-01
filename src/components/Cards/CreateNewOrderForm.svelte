<script>
  export let customerName = "";
  export let customerEmail = "";
  import { Card } from "flowbite-svelte";
  import { Label } from "flowbite-svelte";
  import TicketSelector from "./TicketSelector.svelte";
  import Input from "@components/Input/Input.svelte";

  export let tickets = [
    { name: "General Admission", price: 14.99, availability: 50 },
    { name: "VIP", price: 24.99, availability: 75 },
    { name: "Mezzanine", price: 54.99, availability: 18 },
  ];

  let ticketQuantities = {};

  function handleQuantityChange(event) {
    const { ticket, quantity } = event.detail;
    ticketQuantities[ticket.name] = quantity;
  }
</script>

<Card size="xl">
  <div>
    <h2 class="text-xl font-normal text-gray-900 mb-4">Customer information</h2>
    <div class="grid grid-cols-2 gap-4 mb-2">
      <div>
        <div class="mb-6">
          <Label for="default-input" class="block mb-2 ">Customer name</Label>
          <Input
            className="font-normal text-sm text-gray-500"
            size="full"
            id="default-input"
            placeholder="John Doe"
            bind:value={customerName}
          />
        </div>
      </div>
      <div>
        <div class="mb-6 text-nowrap">
          <Label for="default-input" class="block mb-2"
            >Customer email address</Label
          >
          <Input
            placeholder="john.doe@gmail.com"
            className="font-normal text-sm text-gray-500 "
            id="email"
            name="email"
            type="email"
            size="full"
            bind:value={customerEmail}
          />
        </div>
      </div>
    </div>

    <h3 class="text-lg font-normal text-gray-900 mb-4">Select ticket type</h3>

    {#each tickets as ticket}
      <TicketSelector
        {ticket}
        initialQuantity={ticketQuantities[ticket.name] || 0}
        on:quantityChange={handleQuantityChange}
      />
    {/each}
  </div>
</Card>
