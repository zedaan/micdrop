<script>
    import { Accordion, AccordionItem } from "flowbite-svelte";
    import Outline from "@assets/icons/ticket-outline.svg";
    import {Checkbox} from "flowbite-svelte";
    import { Radio } from 'flowbite-svelte';
    export let tickets = [];
    export let selectedTicket = null;
    export let capacity = "";
    export let capacityPercentage = 0;
    const color =
        capacityPercentage < 30
            ? "bg-red-500"
            : capacityPercentage < 70
              ? "bg-yellow-500"
              : "bg-green-500";

    function selectTicket(ticket) {
        selectedTicket = ticket;
    }
</script>

<div class="bg-white custom-shadow rounded-[16px] p-6">
    <Accordion>
        <AccordionItem open={true}>
            <div
                slot="header"
                class=" flex w-full items-center justify-between"
            >
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
                            class={`grid grid-cols-5 items-center p-4  transition hover:shadow-md cursor-pointer 
                          ${
                              selectedTicket === ticket.type
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-gray-300"
                          }`}
                            on:click={() => selectTicket(ticket.type)}
                        >
                            <!-- Ticket Type -->
                            <div class="flex items-center gap-3">
                                <input
                                    type="radio"
                                    class="w-5 h-5 text-blue-600 focus:ring-blue-500"
                                    bind:group={selectedTicket}
                                    value={ticket.type}
                                    aria-checked={selectedTicket ===
                                        ticket.type}
                                />
                                <span class="text-gray-500 font-normal text-sm"
                                    >{ticket.type}</span
                                >
                            </div>
                            <div
                                class="text-center text-gray-500 text-sm font-normal"
                            >
                                ${ticket.newPrice.toFixed(2)}
                            </div>
                            <div
                                class={`text-center text-sm font-semibold ${
                                    ticket.difference < 0
                                        ? "text-green-500"
                                        : "text-red-500"
                                }`}
                            >
                                {ticket.difference < 0 ? "-" : "+"}${Math.abs(
                                    ticket.difference,
                                ).toFixed(2)}
                            </div>
                            <div class="text-center">
                                <input
                                    type="checkbox"
                                    class="w-5 h-5 text-green-500"
                                    disabled={true}
                                    checked={ticket.complimentary}
                                />
                            </div>
                            <div class="pl-12">
                                <div
                                    class="text-gray-500 font-semibold text-xs"
                                >
                                    Capacity
                                </div>
                                <div class="text-xs font-normal text-gray-500">
                                    {capacity}
                                </div>
                                <div class="gap-2 w-full">
                                    <div
                                        class="h-2 w-full bg-gray-200 rounded-full"
                                    >
                                        <div
                                            class="h-2 {color} rounded-full"
                                            style="width: {capacityPercentage}%"
                                        ></div>
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

<style>
    input[type="radio"]:checked + span {
        font-weight: bold;
    }
</style>
