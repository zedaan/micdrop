<script>
    import { Label, Input } from "flowbite-svelte";
    export let creditCardInfo = {
        cardholderName: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        zipCode: "",
    };

    export let onCreditCardInfoChange;

    function handleInputChange(field, value) {
        creditCardInfo = { ...creditCardInfo, [field]: value };
        onCreditCardInfoChange(creditCardInfo);
    }
</script>

<div class="p-4 border rounded-lg bg-white">
    <div class="space-y-4">
        <div class=" col-span-5">
            <div class=" mb-3">
                <Label
                    for="large-input"
                    class="block mb-2 text-sm font-medium text-Text-Primary"
                    >Cardholder Name</Label
                >
                <Input
                    id="large-input"
                    placeholder="John Doe"
                    type="text"
                    class="text-sm font-normal text-Text-Tartiary"
                    value={creditCardInfo.cardholderName}
                    on:input={(e) =>
                        handleInputChange("cardholderName", e.target.value)}
                />
            </div>
            <div class="">
                <Label
                    for="large-input"
                    class="block mb-2 text-sm font-medium text-Text-Primary"
                    >Card Number</Label
                >
                <Input
                    id="large-input"
                    placeholder="1234 5678 7890 0123"
                    type="text"
                    class="text-sm font-normal text-Text-Tartiary"
                    value={creditCardInfo.cardNumber}
                    on:input={(e) =>
                        handleInputChange("cardNumber", e.target.value)}
                />
            </div>
        </div>

        <div class="flex sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
            <div class="sm:flex-col-1 flex-col-1">
                <Label
                    for="large-input"
                    class="block mb-2 text-sm font-medium text-Text-Primary"
                    >Expiry Date</Label
                >
                <Input
                    id="large-input"
                    placeholder="MMYY"
                    type="text"
                    class="text-sm font-normal text-Text-Tartiary"
                    value={creditCardInfo.expiryDate}
                    on:input={(e) =>
                        handleInputChange("expiryDate", e.target.value)}
                />
            </div>
            <div class="flex-col-2">
                <Label
                    for="large-input"
                    class="block mb-2 text-sm font-medium text-Text-Primary"
                    >CVV</Label
                >
                <Input
                    id="large-input"
                    placeholder="123"
                    type="text"
                    class="text-sm font-normal text-Text-Tartiary"
                    value={creditCardInfo.cvv}
                    on:input={(e) => handleInputChange("cvv", e.target.value)}
                />
            </div>
            <div class="flex-col-2">
                <Label
                    for="large-input"
                    class="block mb-2 text-sm font-medium text-Text-Primary"
                    >Zip Code</Label
                >
                <Input
                    id="large-input"
                    placeholder="123"
                    type="text"
                    class="text-sm font-normal text-Text-Tartiary"
                    value={creditCardInfo.zipCode}
                    on:input={(e) =>
                        handleInputChange("zipCode", e.target.value)}
                />
            </div>
        </div>
    </div>
</div>
