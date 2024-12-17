<script>
    
    export let title = 'Payment Method';
    export let paymentMethods = []; 
    export let selectedPaymentMethod = ''; 
    export let onSelectionChange = () => {}; 
  
    const handleSelection = (value) => {
      selectedPaymentMethod = value;
      onSelectionChange(value);
    };
  </script>
  
  <div class="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto w-full">
    <h2 class="text-lg font-semibold mb-4">{title}</h2>
  
    <form class="space-y-4">
      {#each paymentMethods as method}
        <label
          class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-100 transition"
        >
          <input
            type="radio"
            name="payment"
            on:change={() => handleSelection(method.id)}
            value={method.id}
            class="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            checked={selectedPaymentMethod === method.id}
          />
          <span class="ml-3 text-gray-800">{method.label}</span>
  
          {#if method.icons}
            <div class="ml-auto flex space-x-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
                alt="Mastercard"
                class="h-5"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                alt="Visa"
                class="h-5"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/8f/Discover_Card_logo.png"
                alt="Discover"
                class="h-5"
              />
            </div>
          {/if}
        </label>
      {/each}
    </form>
  </div>
  