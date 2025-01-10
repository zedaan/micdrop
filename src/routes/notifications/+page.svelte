<script>
  import { afterUpdate, onMount } from "svelte";
  import { notificationsData } from "./data";
  import { toast } from "svelte-sonner";
  // import NotificationList from "@components/Notification/NotificationList.svelte";
  // import { formatNotificationTime } from "@utils/utils";
  import Notification from "@components/Notification/Notification.svelte";

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
    console.log(notifications, "asdasd");
    // toast({
    //   component: NotificationList,
    //   props: {
    //     name: notification.name,
    //     action: notification.action,
    //     event: notification.event,
    //     message: notification.message,
    //     time: formatNotificationTime(notification.time),
    //     avatar: notification.avatar,
    //     statusIcon: notification.statusIcon,
    //     status: notification.status,
    //   },
    //   options: {
    //     position: "top-right",
    //   },
    // });

    loadNotifications();
  });

  afterUpdate(() => {
    const notification = notifications[0];
    toast.success(`Grace Lusk confirmed for Jest Quest`, {
      position: "top-right",
    });
  });
</script>

<Notification {notifications} />
