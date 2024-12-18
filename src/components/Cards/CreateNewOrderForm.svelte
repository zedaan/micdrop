<script>
  export let customerName = "";
  export let customerEmail = "";
  export let tickets = [];
  import { Card, Button } from "flowbite-svelte";
  import { Label, Input } from "flowbite-svelte";

  let ticketCounters = {};

  $: tickets,
    () => {
      tickets.forEach((ticket) => {
        ticketCounters[ticket.id] = 0;
      });
    };

  function increment(id) {
    ticketCounters[id]++;
  }

  function decrement(id) {
    if (ticketCounters[id] > 0) ticketCounters[id]--;
  }
</script>

<Card size="xl">
  <div>
    <h2 class="text-xl font-normal text-gray-900 mb-4">Customer information</h2>
    <div class="grid grid-cols-2 gap-4 mb-6">
      <div>
        <div class="mb-6">
          <Label for="default-input" class="block mb-2 ">Customer name</Label>
          <Input
            class="font-normal text-sm text-gray-500"
            id="default-input"
            placeholder="John Doe"
            bind:value={customerName}
          />
        </div>
      </div>
      <div>
        <div class="mb-6">
          <Label for="default-input" class="block mb-2"
            >Customer email address</Label
          >
          <Input
            placeholder="john.doe@gmail.com"
            class="font-normal text-sm text-gray-500"
            id="email"
            name="email"
            bind:value={customerEmail}
          />
        </div>
      </div>
    </div>

    <h3 class="text-lg font-normal text-gray-900 mb-4">Select ticket type</h3>

    {#each tickets as ticket}
      <div class="flex justify-between space-y-5">
        <div class="grid grid-cols-3 space-y-5 gap-40 md:gap-10 items-end">
          <div class="flex justify-between items-center border rounded">
            <Button
              size="xs"
              class="1 border rounded bg-gray-200 hover:bg-gray-300"
              color="alternative"
              on:click={() => decrement(ticket.id)}>-</Button
            >
            <span class="md:w-20 text-center text-sm font-normal text-gray-500"
              >{ticketCounters[ticket.id] || 0}</span
            >
            <Button
              size="xs"
              color="alternative"
              class="border rounded bg-gray-200 hover:bg-gray-300"
              on:click={() => increment(ticket.id)}>+</Button
            >
          </div>
          <div>
            <h2 class="font-semibold text-gray-900">{ticket.name}</h2>
            <h2 class="text-gray-500 text-sm font-medium">
              ${ticket.price} each
            </h2>
          </div>
        </div>
        <div class="w-32 pt-5">
          <p class="text-xs text-right text-gray-500">
            {ticket.availability}/100
          </p>
          <div class="h-2 bg-gray-200 rounded">
            <div class="gap-2 w-full">
              <div class="gap-2 w-full pr-2">
                <div class="h-2 w-full bg-gray-200 rounded-full">
                  <div
                    class="h-2 {ticket.availability < 30
                      ? 'bg-red-500'
                      : ticket.availability < 70
                        ? 'bg-yellow-500'
                        : 'bg-green-500'} rounded-full"
                    style="width: {ticket.availability}%"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</Card>
