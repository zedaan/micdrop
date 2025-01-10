<script>
  import { formatNotificationTime, isToday } from "@utils/utils";
  import NotificationList from "./NotificationList.svelte";
  export let notifications = [];

  let todayNotifications = [];
  let earlierNotifications = [];

  $: {
    todayNotifications = notifications.filter((notif) => isToday(notif.time));
    earlierNotifications = notifications.filter(
      (notif) => !isToday(notif.time)
    );
  }
</script>

<div class="p-5">
  {#if todayNotifications.length > 0}
    <h3 class="text-sm font-medium text-gray-500 mb-4">Today</h3>
    <div class="flex flex-col gap-6">
      {#each todayNotifications as notification}
        <NotificationList
          name={notification.name}
          action={notification.action}
          event={notification.event}
          message={notification.message}
          time={formatNotificationTime(notification.time)}
          avatar={notification.avatar}
          statusIcon={notification.statusIcon}
          status={notification.status}
        />
      {/each}
    </div>
  {/if}

  {#if earlierNotifications.length > 0}
    <h3 class="text-sm font-medium text-gray-500 mb-4">Earlier</h3>
    <div class="flex flex-col gap-6">
      {#each earlierNotifications as notification}
        <NotificationList
          name={notification.name}
          action={notification.action}
          event={notification.event}
          message={notification.message}
          time={formatNotificationTime(notification.time)}
          avatar={notification.avatar}
          status={notification.status}
        />
      {/each}
    </div>
  {/if}

  {#if notifications.length === 0}
    <p class="text-[16px] font-medium text-gray-900 leading-6">
      No notifications available
    </p>
  {/if}
</div>
