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
                <div class="space-y-3">
                    {#each tickets as ticket}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <div class="border-b border-gray-300">
                            <div
                                class={`grid grid-cols-2 items-center p-4  transition hover:shadow-md cursor-pointer 
                          ${
                              selectedTicket === ticket.type
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-gray-300"
                          }`}
                                on:click={() => selectTicket(ticket.type)}
                            >
                                <!-- Ticket Type -->
                                <div class="flex items-center gap-3">
                                    <Radio name="example" checked={true} class="text-gray-500 font-normal text-sm"
                                    >{ticket.type}</Radio>
                                </div>
                                <div class="flex justify-between">
                                    <div class="flex flex-col items-start">
                                    <span class="text-center text-xs font-semibold text-gray-500">New Price</span>
                                    <div
                                        class="text-center text-gray-500 text-sm font-normal"
                                    >
                                        ${ticket.newPrice.toFixed(2)}
                                    </div>
                                </div>
                                    <div class="flex flex-col items-start">
                                        <span class="text-center text-xs font-semibold text-gray-500">Difference</span>
                                        <div
                                            class={`text-center text-sm font-semibold ${
                                                ticket.difference < 0
                                                    ? "text-green-500"
                                                    : "text-red-500"
                                            }`}
                                        >
                                            {ticket.difference < 0
                                                ? "-"
                                                : "+"}${Math.abs(
                                                ticket.difference,
                                            ).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                                </div>
                               
                            <div class="grid grid-cols-2 items-center pb-5">
                                <div/>
                                <div class="">
                                    <span class="text-center text-xs font-semibold text-gray-500">Capacity</span>
                                    <div
                                        class="text-xs font-normal text-gray-500"
                                    >
                                        {capacity}
                                    </div>
                                    <div class="gap-2">
                                        <div
                                            class="h-2 w-[103px] bg-gray-200 rounded-full"
                                        >
                                            <div
                                                class="h-2 {color} rounded-full"
                                                style="width: {capacityPercentage}%"
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="grid grid-cols-2 items-center pb-5">
                               <div></div>
                               <Checkbox checked class="text-center text-xs font-semibold text-gray-500">Complimentary</Checkbox>
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
