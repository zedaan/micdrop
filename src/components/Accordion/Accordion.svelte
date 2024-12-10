<script>
    import { DataDiode } from "carbon-icons-svelte";
    import { Accordion, AccordionItem } from "flowbite-svelte";
    import Outline from "../../assets/icons/ticket-outline.svg";
    export let tickets = [];
    export let selectedTicket = null;

    function selectTicket(ticket) {
        selectedTicket = ticket;
    }
</script>

<div class="bg-white custom-shadow rounded-[16px] p-6">
    <Accordion>
        <AccordionItem open={true} >
            <div
                slot="header"
                class=" flex w-full items-center justify-between"
            >
                <div class="flex gap-2 items-center">
                   <div>
                    <img src={Outline} alt="outline">
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
                    class="grid grid-cols-4 items-center text-xs font-semibold text-gray-500 pb-4 mb-2 border-b border-gray-300"
                >
                    <span> New Ticket Type</span>
                    <span class="text-center">New Price</span>
                    <span class="text-center">Difference</span>
                    <span class="text-center">Complimentary</span>
                </div>
                <div class="space-y-3">
                    {#each tickets as ticket}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <div
                            class={`grid grid-cols-4 items-center p-4  transition hover:shadow-md cursor-pointer 
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
