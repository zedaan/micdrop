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
    if (field === "cardNumber") {
      value = value.replace(/\D/g, "").slice(0, 16);
      value = value.match(/.{1,4}/g)?.join(" ") || value;
    } else if (field === "expiryDate") {
      value = value.replace(/\D/g, "").slice(0, 4);
    } else if (field === "cvv") {
      value = value.replace(/\D/g, "").slice(0, 3);
    } else if (field === "zipCode") {
      value = value.replace(/\D/g, "").slice(0, 5);
    }

    creditCardInfo = { ...creditCardInfo, [field]: value };
    onCreditCardInfoChange(creditCardInfo);
  }
</script>

<div
  class="p-4 pt-0 border border-t-0 rounded-b-lg bg-white border-primary-300"
>
  <div class="space-y-4">
    <div class="col-span-5">
      <div class="mb-3">
        <Label
          for="cardholder-name"
          class="block mb-2 pt-3 pb-1 text-sm font-medium text-Text-Primary"
          >Cardholder Name</Label
        >
        <Input
          id="cardholder-name"
          placeholder="John Doe"
          type="text"
          class="text-sm font-normal text-Text-Tartiary"
          value={creditCardInfo.cardholderName}
          on:input={(e) => handleInputChange("cardholderName", e.target.value)}
        />
      </div>
      <div class="">
        <Label
          for="card-number"
          class="block mb-2 text-sm font-medium text-Text-Primary"
          >Card Number</Label
        >
        <Input
          id="card-number"
          placeholder="1234 5678 7890 0123"
          type="text"
          class="text-sm font-normal text-Text-Tartiary"
          value={creditCardInfo.cardNumber}
          on:input={(e) => handleInputChange("cardNumber", e.target.value)}
        />
      </div>
    </div>

    <div class="flex sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
      <div class="sm:flex-col-1 flex-col-1">
        <Label
          for="expiry-date"
          class="block mb-2 text-sm font-medium text-Text-Primary"
          >Expiry Date</Label
        >
        <Input
          id="expiry-date"
          placeholder="MMYY"
          type="text"
          class="text-sm font-normal text-Text-Tartiary"
          value={creditCardInfo.expiryDate}
          on:input={(e) => handleInputChange("expiryDate", e.target.value)}
        />
      </div>
      <div class="flex-col-2">
        <Label
          for="cvv"
          class="block mb-2 text-sm font-medium text-Text-Primary">CVV</Label
        >
        <Input
          id="cvv"
          placeholder="123"
          type="text"
          class="text-sm font-normal text-Text-Tartiary"
          value={creditCardInfo.cvv}
          on:input={(e) => handleInputChange("cvv", e.target.value)}
        />
      </div>
      <div class="flex-col-2">
        <Label
          for="zip-code"
          class="block mb-2 text-sm font-medium text-Text-Primary"
          >Zip Code</Label
        >
        <Input
          id="zip-code"
          placeholder="12345"
          type="text"
          class="text-sm font-normal text-Text-Tartiary"
          value={creditCardInfo.zipCode}
          on:input={(e) => handleInputChange("zipCode", e.target.value)}
        />
      </div>
    </div>
  </div>
</div>
