<script>
    import { Accordion, AccordionItem } from "flowbite-svelte";
    export let tickets = [];
    export let selectedTicket = null;

    function selectTicket(ticket) {
        selectedTicket = ticket;
    }
</script>

<Accordion flush={true}>
    <AccordionItem open={true}>
        <span slot="header" class="text-lg flex items-center justify-between font-semibold">
            <span class="flex gap-2 items-center">
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
                Cameron Williamson
            </span>
            <span class="text-sm text-gray-500">General Admission $14.99</span>
        </span>
        <div class="p-4 bg-white rounded-lg shadow-md">
            <h2 class="text-sm font-semibold mb-4 text-gray-600 uppercase tracking-wide">New Ticket Type</h2>
            <div class="grid grid-cols-4 items-center text-sm font-medium text-gray-600 border-b pb-2 mb-3">
                <span>Ticket Type</span>
                <span class="text-center">New Price</span>
                <span class="text-center">Difference</span>
                <span class="text-center">Complimentary</span>
            </div>
            <div class="space-y-3">
                {#each tickets as ticket}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div
                        class={`grid grid-cols-4 items-center p-4 rounded-lg border transition hover:shadow-md cursor-pointer 
                        ${selectedTicket === ticket.type 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-300'}`}
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
                            <span class="text-gray-900">{ticket.type}</span>
                        </div>
                        <!-- New Price -->
                        <div class="text-center text-gray-800 font-bold">
                            ${ticket.newPrice.toFixed(2)}
                        </div>
                        <!-- Difference -->
                        <div
                            class={`text-center font-medium ${
                                ticket.difference < 0 ? "text-green-500" : "text-red-500"
                            }`}
                        >
                            {ticket.difference < 0 ? "-" : "+"}${Math.abs(ticket.difference).toFixed(2)}
                        </div>
                        <!-- Complimentary -->
                        <div class="text-center">
                            <input type="checkbox" class="w-5 h-5 text-green-500" disabled={true} checked={ticket.complimentary} />
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
