<script>
  import { Modal } from "flowbite-svelte";
  import AlterIcon from "@assets/icons/transfer.svg";
  import Button from "@components/Button/Button.svelte";
  export let isOpen = false;
  export let title = "Modal Title";
  export let message = "";
  export let cancelText = "";
  export let confirmText = "";
  export let onCancel;
  export let onConfirm;
</script>

<Modal bind:open={isOpen} size="xs" autoclose>
  <div class="text-center">
    <div class="flex flex-col justify-evenly items-center text-center p-2">
      <img
        src={AlterIcon}
        alt="Right icon here"
        class="mx-auto mb-4 text-orange-500 w-12 h-12"
      />
      <h3 class="mb-2 text-xl font-normal text-Text-Primary">{title}</h3>
      <p class="mb-5 text-sm text-Text-Tartiary font-normal px-3 w-10/12">
        {message}
      </p>
    </div>
    <div class="flex justify-center gap-4">
      {#if cancelText}
        <Button
          strokebtn
          size="full"
          on:click={() => {
            onCancel && onCancel();
            isOpen = false;
          }}
        >
          {cancelText}
        </Button>
      {/if}
      <Button
        variant="primary"
        size="full"
        on:click={() => {
          onConfirm && onConfirm();
          isOpen = false;
        }}
      >
        {confirmText}
      </Button>
    </div>
  </div>
</Modal>
