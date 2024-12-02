<script>
  import NoteEdit from "@assets/svg/note-edit.svg";
  import { Input } from "flowbite-svelte";
  import Button from "@components/Button/Button.svelte";
  export let customerName = "Cameron Williamson";
  export let email = "cameron.williamson@gmail.com";
  export let phone = "910 482 3053";
  export let orderTotal = "$86.34";
  export let tickets = 4;
  export let purchaseDate = "Tuesday, July 30, 2024";
  export let purchaseTime = "1:41pm EST";
  export let paymentMethod = "•••• •••• •••• ";

  let isNoteEdit = false;
  let noteEditText = "";
</script>

<div
  class="bg-white shadow-sm rounded-lg p-4 sm:p-6 border border-gray-200 size-full mx-4"
>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-6 items-start">
    <div class="space-y-4 text-gray-700">
      <div>
        <span class="text-sm font-normal text-gray-500">Customer name</span>
        <p class="text-sm md:text-base font-medium text-gray-900 ext-gray-800">
          {customerName}
        </p>
      </div>
      <div>
        <span class="text-sm font-normaltext-gray-500">Email address</span>
        <p class="text-sm md:text-base font-medium text-gray-900 sm:text-lg">
          {email}
        </p>
      </div>
      <div>
        <span class="text-sm font-normaltext-gray-500">Phone</span>
        <p class="text-sm md:text-base font-medium text-gray-900 sm:text-lg">
          {phone}
        </p>
      </div>
    </div>
    <div class="space-y-4 text-gray-700">
      <div class="flex justify-between items-center">
        <div>
          <span class="text-sm font-normaltext-gray-500">Order Total</span>
          <p class="text-sm md:text-base font-medium text-gray-900 sm:text-lg">
            {orderTotal}
          </p>
        </div>
      </div>
      <div>
        <span class="text-sm font-normaltext-gray-500">Number of tickets</span>
        <p class="text-sm md:text-base font-medium text-gray-900 sm:text-lg">
          {tickets}
        </p>
      </div>
      <div>
        <span class="text-sm font-normaltext-gray-500">Purchase date</span>
        <p class="font-medium text-sm md:text-base text-gray-900">
          {purchaseDate}
        </p>
        <p class="font-medium text-sm md:text-base text-gray-900">
          {purchaseTime}
        </p>
      </div>
    </div>
    <div class="col-span- md:col-span3">
      <span class="text-sm font-normal text-gray-500 w-full"
        >Payment Method</span
      >
      <div class="flex items-center space-x-2">
        <div class="bg-red-500 w-4 h-4 rounded-full"></div>
        <p class="text-sm md:text-base font-medium text-gray-900">
          {paymentMethod}
        </p>
      </div>
    </div>
  </div>

  <div class="border-t mt-4 sm:mt-6 pt-4">
    {#if !isNoteEdit}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div
        class="flex items-center cursor-pointer mt-2"
        on:click={() => (isNoteEdit = true)}
      >
        <img class="h-5 w-5" src={NoteEdit} alt="note-edit" />
        <p class="ml-2 text-primary-500 text-sm">Add order note</p>
      </div>
    {/if}
    {#if isNoteEdit}
      <div class="flex items-center w-full gap-3 flex-wrap">
        <Input
          type="textarea"
          size="small"
          bind:value={noteEditText}
          class="max-w-md h-10"
        />
        <Button className="px-10" size="lg">Add</Button>
        <Button
          strokebtn
          className="px-10 border-none"
          size="lg"
          on:click={() => (isNoteEdit = false)}>Cancel</Button
        >
      </div>
    {/if}
  </div>
</div>
