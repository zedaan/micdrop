<script>
  import NoteEdit from "@assets/svg/note-edit.svg";

  import Button from "@components/Button/Button.svelte";
  import Input from "@components/Input/Input.svelte";
  import Notedit from "@assets/svg/note-edit-dark.svg";
  export let customerName = "Cameron Williamson";
  export let email = "cameron.williamson@gmail.com";
  export let phone = "910 482 3053";
  export let orderTotal = "$86.34";
  export let tickets = 4;
  export let purchaseDate = "Tuesday, July 30, 2024";
  export let purchaseTime = "1:41pm EST";
  export let paymentMethod = "•••• •••• •••• ";

  let submitNote = false;

  let isNoteEdit = false;
  let noteEditText = "";
</script>

<div class="bg-white shadow-sm rounded-lg p-4 sm:p-6 border border-gray-200">
  <div class="grid grid-cols-2 md:grid-cols-3 gap-10 items-start">
    <div class="space-y-4 text-gray-700">
      <div>
        <span class="text-sm font-normal text-gray-500">Customer name</span>
        <p class="text-sm md:text-base font-medium text-gray-900">
          {customerName}
        </p>
      </div>
      <div>
        <span class="text-sm font-normaltext-gray-500">Email address</span>
        <p class="text-sm md:text-base font-medium text-gray-900">
          {email}
        </p>
      </div>
      <div>
        <span class="text-sm font-normaltext-gray-500">Phone</span>
        <p class="text-sm md:text-base font-medium text-gray-900">
          {phone}
        </p>
      </div>
    </div>
    <div class="space-y-4 text-gray-700">
      <div class="flex justify-between items-center">
        <div>
          <span class="text-sm font-normaltext-gray-500">Order Total</span>
          <p class="text-sm md:text-base font-medium text-gray-900">
            {orderTotal}
          </p>
        </div>
      </div>
      <div>
        <span class="text-sm font-normaltext-gray-500">Number of tickets</span>
        <p class="text-sm md:text-base font-medium text-gray-900">
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
    <div class="">
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

  <div class="border-t mt-4 sm:mt-5">
    {#if !isNoteEdit && !submitNote}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div
        class="flex items-center cursor-pointer p-3.5 mt-3 md:mt-6 md:pb-2"
        on:click={() => (isNoteEdit = true)}
      >
        <img class="h-5 w-5" src={NoteEdit} alt="note-edit" />
        <p class="ml-2 text-primary-500 text-sm">Add order note</p>
      </div>
    {/if}
    {#if !submitNote && isNoteEdit}
      <div class="flex items-center w-full gap-4 flex-wrap pt-3">
        <Input
          type="textarea"
          size="full"
          bind:value={noteEditText}
          className="h-14 px-2 leading-5 w-full md:w-96 "
        />

        <div>
          <Button
            className="px-12"
            size="lg"
            on:click={() => noteEditText && (submitNote = true)}>Add</Button
          >
          <Button
            strokebtn
            className="px-10 border-none"
            size="lg"
            on:click={() => ((isNoteEdit = false), (submitNote = false))}
            >Cancel</Button
          >
        </div>
      </div>
    {:else if submitNote && noteEditText}
      <div class="flex items-center gap-2 py-1 md:pt-3">
        <img src={Notedit} alt="Note edit" class="shrink-0" />
        <div class="flex flex-col w-full md:w-96 px-1">
          <p class="text-sm text-gray-700 break-words">
            {noteEditText}
          </p>
        </div>
        <button
          class="text-sm text-primary-500 font-medium mt-2"
          on:click={() => {
            noteEditText = noteEditText;
            submitNote = false;
          }}
        >
          Edit
        </button>
      </div>
    {/if}
  </div>
</div>
