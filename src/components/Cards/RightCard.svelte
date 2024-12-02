<script>
  export let orderItems = [];
  export let subtotal = 0;
  export let tax = 0;
  export let serviceFee = 0;
  export let total = 0;
</script>

<div class="bg-white shadow-sm rounded-lg p-6 border border-gray-200 size-full">
  <h2 class="text-lg font-normal text-gray-900 mb-4">Order summary</h2>

  <div class="space-y-4">
    {#each orderItems as item}
      <div class="flex justify-between items-start">
        <div>
          <p class="text-lg font-semibold text-gray-900">
            {item.quantity} x {item.name}
          </p>
          <p class="text-sm text-gray-500 font-medium">{item.unitPrice} each</p>
        </div>
        <p class="text-base font-normal text-gray-500 mt-1">{item.price}</p>
      </div>
    {/each}
  </div>

  <hr class="my-4 border-gray-200" />

  <div class="space-y-2">
    <div class="flex justify-between">
      <span class="font-normal text-sm text-Text-Tartiary">Subtotal</span>
      <span class="text-base font-normal text-gray-500">{subtotal}</span>
    </div>
    <div class="flex justify-between">
      <span class="font-normal text-sm text-Text-Tartiary">Tax</span>
      <span class="text-base font-normal text-gray-500">{tax}</span>
    </div>
    <div class="flex justify-between">
      <span class="font-normal text-sm text-Text-Tartiary">Service Fee</span>
      <span class="text-base font-normal text-gray-500">{serviceFee}</span>
    </div>
  </div>

  <hr class="my-4 border-gray-200" />
  <div
    class="flex justify-between items-center text-gray-900 text-lg font-semibold"
  >
    <span class="font-normal text-sm text-Text-Tartiary">Total</span>
    <span class="font-semibold text-base text-Text-Tartiary">{total}</span>
  </div>
</div>
