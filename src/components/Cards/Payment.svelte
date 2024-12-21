<script>
  import Mastercard from "@assets/icons/International.svg"
  import Visa from "@assets/icons/Internat.svg"
  import Discover from "@assets/icons/International1.png"
  import Atmcard from "@assets/icons/International6.svg"
    
    export let title = 'Payment Method';
    export let paymentMethods = []; 
    export let selectedPaymentMethod = ''; 
    export let onSelectionChange = () => {}; 
  
    const handleSelection = (value) => {
      selectedPaymentMethod = value;
      onSelectionChange(value);
    };
  </script>
  
  <div class="p-6 bg-white border rounded-lg shadow-md  mx-auto w-full">
    <h2 class="text-xl font-normal text-gray-900 mb-4">{title}</h2>
  
    <form class="space-y-4">
      {#each paymentMethods as method}
        <label
          class="flex items-center py-6 px-2 border rounded-lg cursor-pointer hover:bg-gray-100 transition"
        >
          <input
            type="radio"
            name="payment"
            on:change={() => handleSelection(method.id)}
            value={method.id}
            class="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            checked={selectedPaymentMethod === method.id}
          />
          <span class="ml-3 text-sm font-normal text-gray-500">{method.label}</span>
  
          {#if method.icons}
            <div class="ml-auto flex space-x-2">
              <img
                src={Mastercard}
                alt="Mastercard"
                class="h-5"
              />
              <img
                src={Visa}
                alt="Visa"
                class="h-5"
              />
              <img
                src={Discover}
                alt="Discover"
                class="h-4 w-9 pt-0.5"
              />
              <img
                src={Atmcard}
                alt="Discover"
                class="h-5 w-8"
              />
            </div>
          {/if}
        </label>
      {/each}
    </form>
  </div>
  