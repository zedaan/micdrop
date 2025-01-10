<script>
  import NotificationList from "@components/Notification/NotificationList.svelte";
  import { formatNotificationTime } from "@utils/utils";

  let notifications = [
    {
      id: "1",
      profile_image:
        "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      user_name: "Grace Lusk",
      action_text: "confirmed for",
      show_name: "Jest Quest",
      status: "message sent",
      message: "Can I go up early? I have another show at...",
      time: "2024-10-11T00:15:00",
      status_icon: "src/assets/icons/confirmed.svg",
    },
  ];
</script>

<div class="w-full">
  {#each notifications as notification}
    <NotificationList
      name={notification.user_name}
      action={notification.action_text}
      event={notification.show_name}
      message={notification.message}
      time={formatNotificationTime(notification.time)}
      avatar={notification.profile_image}
      status={notification.status}
      statusIcon={notification.statusIcon}
    />
  {/each}
</div>
