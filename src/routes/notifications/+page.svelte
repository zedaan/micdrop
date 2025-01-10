<script>
  import { onMount } from "svelte";
  import { notificationsData } from "./data";
  import { toast } from "svelte-sonner";
  import Notification from "@components/Notification/Notification.svelte";
  import ToastNotifactions from "@components/ToastNotifactions/ToastNotifactions.svelte";

  let notifications = [];

  async function loadNotifications() {
    try {
      const data = notificationsData;
      notifications = data.map((notification) => ({
        id: notification.id,
        name: notification.user_name,
        action: notification.action_text,
        event: notification.show_name,
        message: notification.message,
        time: new Date(notification.time),
        avatar: notification.profile_image,
        statusIcon: notification.status_icon,
        status: notification.status,
      }));
    } catch (error) {
      console.error("Failed to load notifications:", error);
    }
  }

  onMount(() => {
    toast(ToastNotifactions, {
      position: "top-right",
      duration: 3000,
    });
    loadNotifications();
  });
</script>

<Notification {notifications} />
