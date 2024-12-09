<script>
    import { DataDiode } from "carbon-icons-svelte";
    import { Accordion, AccordionItem } from "flowbite-svelte";
    export let tickets = [];
    export let selectedTicket = null;

    function selectTicket(ticket) {
        selectedTicket = ticket;
    }
</script>

<Accordion class="rounded-lg shadow-md">
    <AccordionItem open={true}>
        <div slot="header" class=" flex items-center justify-between">
            <div class="flex gap-2 items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5 text-blue-500"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 9.75V5.25A2.25 2.25 0 0111.25 3h1.5A2.25 2.25 0 0115 5.25v4.5m-6 9V14.25a.75.75 0 01.75-.75h7.5a.75.75 0 01.75.75V19.5m-9 0h9"
                    />
                </svg>
                <h3 class="text-base font-normal text-gray-900">
                    Cameron Williamson
                </h3>
            </div>
            <div class="text-sm text-gray-500 font-normal">General Admission $14.99</div>
        </div>
        <div class="">
            <div
                class="grid grid-cols-4 items-center text-xs font-semibold text-gray-500 p-4 mb-3"
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
                                aria-checked={selectedTicket === ticket.type}
                            />
                            <span class="text-gray-500 font-normal text-sm">{ticket.type}</span>
                        </div>
                        <!-- New Price -->
                        <div class="text-center text-gray-500 text-sm font-normal">
                            ${ticket.newPrice.toFixed(2)}cccc
                        </div>
                        <!-- Difference -->
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
                        <!-- Complimentary -->
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

<style>
    input[type="radio"]:checked + span {
        font-weight: bold;
    }
</style>
