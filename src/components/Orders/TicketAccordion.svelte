<script>
  import { Accordion, AccordionItem } from "flowbite-svelte";
  import Outline from "@assets/icons/ticket-outline.svg";
  import { Checkbox } from "flowbite-svelte";
  import { Radio } from "flowbite-svelte";
  export let tickets = [];
  export let selectedTicket = null;
  export let capacity = "";

  function selectTicket(ticket) {
    selectedTicket = ticket;
  }
</script>

<div class="bg-white p-4 pt-2">
  <Accordion>
    <AccordionItem open={true} border={false} borderOpenClass>
      <div slot="header" class=" flex w-full items-center justify-between">
        <div class="flex gap-2 items-center">
          <div>
            <img src={Outline} alt="outline" />
          </div>
          <h3 class="text-base font-normal text-gray-900">
            Cameron Williamson
          </h3>
        </div>
        <div class="text-sm text-gray-500 font-normal pr-5">
          General Admission $14.99
        </div>
      </div>
      <div class="">
        <div
          class="grid grid-cols-5 items-center text-xs font-semibold text-gray-500 pb-4 mb-2 border-b border-gray-300 uppercase"
        >
          <span> New Ticket Type</span>
          <span class="text-center">New Price</span>
          <span class="text-center">Difference</span>
          <span class="text-center">Complimentary</span>
          <span class="text-center">Capacity</span>
        </div>
        <div class="space-y-3">
          {#each tickets as ticket}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
              class={`grid grid-cols-5 items-center p-0  py-3 transition  cursor-pointer 
                          ${
                            selectedTicket === ticket.type
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-300"
                          }`}
            >
              <div class="flex items-center gap-2">
                <Radio
                  value={ticket.type}
                  on:click={() => selectTicket(ticket.type)}
                  bind:group={selectedTicket}
                  class="w-5 h-5"
                />
                <span class="text-gray-500 font-normal text-sm"
                  >{ticket.type}</span
                >
              </div>
              <div class="text-center text-gray-500 text-sm font-normal">
                ${ticket.newPrice.toFixed(2)}
              </div>
              <div
                class={`text-center text-sm font-semibold ${
                  ticket.difference < 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {ticket.difference < 0 ? "-" : "+"}${Math.abs(
                  ticket.difference
                ).toFixed(2)}
              </div>
              <div class="text-center pl-12">
                <Checkbox class="w-5 h-5" />
              </div>
              <div class="pl-12">
                <div
                  class="text-gray-500 font-semibold text-xs text-right pr-2 pb-1"
                >
                  {`${ticket.capacityPercentage}/100`}
                </div>
                <div class="text-xs font-normal text-gray-500">
                  {capacity}
                </div>
                <div class="gap-2 w-full">
                  <div class="gap-2 w-full pr-2">
                    <div class="h-2 w-full bg-gray-200 rounded-full">
                      <div
                        class="h-2 {ticket.capacityPercentage < 30
                          ? 'bg-red-500'
                          : ticket.capacityPercentage < 70
                            ? 'bg-yellow-500'
                            : 'bg-green-500'} rounded-full"
                        style="width: {ticket.capacityPercentage}%"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </AccordionItem>
  </Accordion>
</div>
