<script>
  import { Modal } from "flowbite-svelte";
  import Button from "@components/Button/Button.svelte";

  export let isOpen = false;
  export let title = "Modal Title";
  export let message = "";
  export let cancelText = "";
  export let confirmText = "";
  export let onCancel;
  export let onConfirm;
  export let icon = "";
</script>

<Modal bind:open={isOpen} size="xs" autoclose>
  <div class="text-center p-4">
    <div class="flex flex-col justify-evenly items-center text-center p-2">
      {#if icon}
        <img
          src={icon}
          alt="Icon"
          class="mx-auto mb-4 w-12 h-12"
        />
      {/if}
      <h3 class="mb-4 text-xl font-normal text-Text-Primary">{title}</h3>
      <p class="mb-3 text-sm text-Text-Tartiary font-normal px-4 w-[350px] break-words">
        {@html message}
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
