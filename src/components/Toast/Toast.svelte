<script>
  import { Toast } from "flowbite-svelte";
  import {
    CheckCircleSolid,
    ExclamationCircleSolid,
    FireOutline,
    CloseCircleSolid,
  } from "flowbite-svelte-icons";

  export let message = "";
  export let type = "success";
  export let color = "green";
  export let simple = false;
  export let transition = true;
  export let dismisable = true;
  export let duration = undefined;
  export let className = "mb-2 w-56 shadow-md p-2 rounded-md  bg-gray-100";
  export let position = "top-right";
  export let divClass = "";
  export let defaultClass = "";
  export let closeClass = "";

  export let icon = undefined;
  export let iconClass = "w-5 h-5";

  const typeToColor = {
    success: "green",
    error: "red",
    warning: "yellow",
    default: "blue",
  };

  $: toastColor = color || typeToColor[type] || "blue";

  const getIcon = (type) => {
    if (icon) return icon;

    switch (type) {
      case "success":
        return CheckCircleSolid;
      case "error":
        return CloseCircleSolid;
      case "warning":
        return ExclamationCircleSolid;
      default:
        return FireOutline;
    }
  };

  const Icon = getIcon(type);
  console.log(typeToColor[type], "toastColor");
</script>

<Toast
  color={toastColor}
  {simple}
  {transition}
  {dismisable}
  {duration}
  {position}
  class={className}
  {divClass}
  {defaultClass}
  {closeClass}
>
  <svelte:fragment slot="icon">
    <Icon class={iconClass} />
    <span class="sr-only">{type} icon</span>
  </svelte:fragment>
  <p class="pl-2">{message}</p>
</Toast>
