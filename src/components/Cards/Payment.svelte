<script>
  import Mastercard from "@assets/icons/International.svg";
  import Visa from "@assets/icons/Internat.svg";
  import Discover from "@assets/icons/International1.png";
  import Atmcard from "@assets/icons/International6.svg";
  import { createEventDispatcher } from "svelte";
  import CreditCardForm from "@components/pages/orders/CreditCardForm.svelte";

  export let paymentMethods = [];
  export let selectedPaymentMethod = "";
  export let creditCardInfo = {
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    zipCode: "",
  };
  export let errors = {};

  const dispatch = createEventDispatcher();

  function handleSelection(value) {
    selectedPaymentMethod = value;
    dispatch("selectionChange", value);
  }

  function handleCreditCardInfoChange(updatedInfo) {
    creditCardInfo = updatedInfo;
    dispatch("creditCardChange", {
      detail: {
        type: "creditCard",
        creditCard: creditCardInfo,
      },
    });
  }
</script>

<div class="p-6 bg-white border rounded-lg shadow-md mx-auto w-full">
  <h2 class="text-xl font-normal text-gray-900 mb-4">Payment Method</h2>

  <form class="space-y-4">
    {#each paymentMethods as method}
      <label
        class="flex items-center py-6 px-2 border rounded-lg cursor-pointer hover:bg-primary-50 transition {selectedPaymentMethod ===
          method.id && method.label === 'Credit Card'
          ? 'border !rounded-b-none bg-primary-50 border-primary-300'
          : ''}"
      >
        <input
          type="radio"
          name="payment"
          on:change={() => handleSelection(method.id)}
          value={method.id}
          class="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
          checked={selectedPaymentMethod === method.id}
        />
        <span class="ml-3 text-sm font-normal text-gray-500"
          >{method.label}</span
        >

        {#if method.icons}
          <div class="ml-auto flex space-x-2">
            <img src={Mastercard} alt="Mastercard" class="h-5" />
            <img src={Visa} alt="Visa" class="h-5" />
            <img src={Discover} alt="Discover" class="h-4 w-9 pt-0.5" />
            <img src={Atmcard} alt="ATM card" class="h-5 w-8" />
          </div>
        {/if}
      </label>

      {#if selectedPaymentMethod === method.id && method.label === "Credit Card"}
        <CreditCardForm
          bind:creditCardInfo
          errors={errors?.creditCard || {}}
          on:creditCardInfoChange={(event) =>
            handleCreditCardInfoChange(event.detail)}
        />
      {/if}
    {/each}
  </form>

  {#if errors?.method}
    <p class="text-red-500 text-sm mt-1">{errors.method}</p>
  {/if}
</div>
