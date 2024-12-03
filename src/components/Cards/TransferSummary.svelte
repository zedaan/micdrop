<script>
    import { Card } from "flowbite-svelte";
    import Toggle from "@components/ToggleSwitch/Toggle.svelte";
    import Button from "@components/Button/Button.svelte";
    import Badge from "@components/Badges/Badge.svelte";

    export let transferSummary = {
        originalTickets: [],
        newTickets: [],
        subtotal: 0,
        tax: 0,
        serviceFee: 0,
        total: 0,
        refund: 0,
    };
    function handleAlert() {
        alert("Hii, This is Function Alert");
    }
</script>

<div class="p-6 max-w-md">
    <Card size="auto">
        <h2 class="text-xl font-normal text-gray-900 mb-4">Transfer Summary</h2>
        <p class="text-base text-gray-500 mb-4 font-normal">
            The customer will be charged or refunded the difference between the
            amounts of the original and new order.
        </p>

        <!-- Original Tickets -->
        <div class="mb-4">
            <h3
                class="text-sm font-bold bg-gray-100 text-gray-900 rounded-sm p-1 border-res"
            >
                Original tickets
            </h3>
            <ul class="mt-2">
                {#each transferSummary.originalTickets as ticket}
                    <li class="flex justify-between py-1">
                        <div class="flex flex-col">
                            <span class="text-lg text-gray-900 font-semibold"
                                >{ticket.quantity} x {ticket.type}</span
                            >
                            <span class="text-sm text-gray-500 font-medium"
                                >${ticket.price.toFixed(2)} each</span
                            >
                        </div>
                        <span class="text-gray-500 font-normal text-base"
                            >-${(ticket.quantity * ticket.price).toFixed(
                                2,
                            )}</span
                        >
                    </li>
                {/each}
            </ul>
        </div>

        <!-- New Tickets -->
        <div class="">
            <h3
                class="text-sm font-bold bg-gray-100 text-gray-900 rounded-sm p-1 border-res"
            >
                New tickets
            </h3>
            <ul class="mt-2">
                {#each transferSummary.newTickets as ticket}
                    <li class="flex justify-between text-sm py-1">
                        <div class="flex flex-col">
                            <span class="text-lg text-gray-900 font-semibold"
                                >{ticket.quantity} x {ticket.type}</span
                            >
                            <span class="text-gray-500 text-sm font-medium"
                                >${ticket.price.toFixed(2)} each</span
                            >
                        </div>
                        <span class="ext-gray-500 font-normal text-base"
                            >${(ticket.quantity * ticket.price).toFixed(
                                2,
                            )}</span
                        >
                    </li>
                {/each}
            </ul>
            <span
                class="flex justify-between font-semibold py-1 border-t border-gray-200"
            ></span>
        </div>

        <!-- Totals -->
        <div class="mb-4">
            <ul class="text-sm">
                <li class="flex justify-between py-1">
                    <span class="text-sm font-normal text-Text-Tartiary"
                        >Subtotal</span
                    >
                    <span class="font-normal text-base text-gray-500"
                        >${transferSummary.subtotal.toFixed(2)}</span
                    >
                </li>
                <li class="flex justify-between py-1">
                    <span class="text-sm font-normal text-Text-Tartiary"
                        >Tax (6%)</span
                    >
                    <span class="font-normal text-base text-gray-500"
                        >${transferSummary.tax.toFixed(2)}</span
                    >
                </li>
                <li class="flex justify-between py-1">
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
                    <span class="text-sm font-normal text-Text-Tartiary"
                        >Total</span
                    >
                    <span class="text-gray-900 text-2xl font-semibold"
                        >${transferSummary.total.toFixed(2)}</span
                    >
                </li>
            </ul>
        </div>
        <!-- Transfer Button -->
        <div class="mt-4 pb-5">
            <Button on:click={handleAlert} size="full">Transfer tickets</Button>
        </div>

        <!-- Refund Info -->
        <div class="">
            <Badge size="large" status="success"class="w-full"
                >The customer will be issued a refund of
                <strong>${transferSummary.refund.toFixed(2)}</strong>
            </Badge>
        </div>

        <!-- Waive the Difference Toggle -->
        <div class="flex items-center mt-4">
            <Toggle />
            <label for="waive-difference" class="ml-2 text-sm text-gray-700">
                Waive the difference
            </label>
        </div>
    </Card>
</div>
