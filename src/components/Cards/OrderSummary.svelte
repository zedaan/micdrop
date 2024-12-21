<script>
    import { Card } from "flowbite-svelte";
    import Button from "@components/Button/Button.svelte";
    import chevronRight from '../../assets/icons/navigate_next.svg'

    export let transferSummary;
    export let onClickButton;
    export let buttonText;
</script>

<div class="w-full">
    <Card size="auto" padding={"xl"} class="rounded-2xl">
        <h2 class="text-xl font-normal text-gray-900 mb-1">Order summary</h2>
        <div class=" border-b pb-14 pt-12">
            <h4 class="text-xs text-center text-gray-400 font-normal">
                Choose the ticket type to see a summary of your order
            </h4>
        </div>
        <div class="pt-4">
            <ul class="text-sm">
                <li class="flex justify-between py-2">
                    <span class="text-sm font-normal text-Text-Tartiary"
                        >Subtotal</span
                    >
                    <span class="font-normal text-base text-gray-500"
                        >${transferSummary.subtotal.toFixed(2)}</span
                    >
                </li>
                <li class="flex justify-between py-2">
                    <span class="text-sm font-normal text-Text-Tartiary"
                        >Tax (6%)</span
                    >
                    <span class="font-normal text-base text-gray-500"
                        >${transferSummary.tax.toFixed(2)}</span
                    >
                </li>
                <li class="flex justify-between py-2">
                    <span class="text-sm font-normal text-Text-Tartiary pb-2"
                        >Service Fee (2%)</span
                    >
                    <span class="font-normal text-base text-gray-500"
                        >${transferSummary.serviceFee.toFixed(2)}</span
                    >
                </li>
                <li
                    class="flex justify-between font-semibold py-1 border-t border-gray-200 pt-4"
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
        <div class="mt-4 pb-5">
            <Button on:click={onClickButton} afterIcon={chevronRight} size="full" class="bg-gray-400 w-full rounded-lg text-white py-3 flex items-center justify-center gap-1 text-sm font-medium">
                {buttonText} 
            </Button>
        </div>
    </Card>
</div>
