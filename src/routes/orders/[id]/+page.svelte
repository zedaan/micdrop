<script>
  import { onMount } from "svelte";
  import { cn } from "@lib/utils/utils";
  import Button from "@components/Button/Button.svelte";
  import { Dropdown, DropdownItem, Skeleton } from "flowbite-svelte";
  import DownArrowIcon from "@assets/icons/arrow-up-01.svg";
  import Cancel from "@assets/svg/cancel.svg";
  import CurrencyDollar from "carbon-icons-svelte/lib/CurrencyDollar.svelte";
  import TrashCan from "carbon-icons-svelte/lib/TrashCan.svelte";
  import TicketOutline from "@assets/icons/ticket-outline.svg";
  import SendMessageIcon from "@assets/icons/message.svg";
  import Print from "@assets/icons/print.svg";
  import TransferIcon from "@assets/icons/transfer.svg";
  import LeftCard from "@components/Cards/LeftCard.svelte";
  import RightCard from "@components/Cards/RightCard.svelte";
  import Badge from "@components/Badges/Badge.svelte";
  import { page } from "$app/stores";
  import { Search } from "flowbite-svelte";
  import TicketCard from "@components/Orders/TicketCard.svelte";
  import RefundModal from "@components/Orders/RefundModal.svelte";
  import TableSkeleton from "@components/Table/TableSkeleton.svelte";
  import Table from "@components/Table/Table.svelte";
  import { goto } from "$app/navigation";
  import userProfileImg from "@assets/images/image.png";
  import { AttendeeTableColumns } from "@components/pages/orders/OrderTableColumn";
  import Breadcrumb from "@components/Breadcrumb/Breadcrumb.svelte";
  import DeleteAttendeeModel from "@components/Orders/DeleteAttendeeModel.svelte";
  import Alert from "../../../assets/icons/Alert icon.svg"
  
  function handleDropdownClick() {
    toastStore.addToast("Confirmation resent successfully!", "success");
    toastStore.updateSettings({ position: "top-right" });
  }
  import ArrowrightArrowleft from "@assets/svg/arrow-right-arrow-left.svg";

  $: orderId = $page.params.id;

  let loading = true;
  let order = {};
  let showDeleteModal = false; 
  let selectedAttendee = null; 




  const STATUS_BADGES = {
    Refunded: "warning",
    Cancelled: "danger",
    "Partially Refunded": "warning",
    default: "success",
  };

  async function GetOrdersByID() {
    try {
      const response = await fetch("./../api/orders");
      const data = await response.json();
      const currentData = data.tableData.find(
        (item) => item.orderId.replace("#", "") === orderId
      );
      order = currentData || {};
      order = currentData;
      loading = false;
    } catch (error) {
      loading = false;
      console.error("Failed to load notifications:", error);
    }
  }

  const items = [
    {
      name: "General Admission",
      quantity: 2,
      price: "$29.98",
      unitPrice: "$14.99",
    },
    { name: "VIP Tickets", quantity: 2, price: "$49.98", unitPrice: "$24.99" },
  ];

  const subtotal = "$79.96";
  const tax = "$4.79";
  const serviceFee = "$1.59";
  const total = "$86.34";

  onMount(() => {
    GetOrdersByID();
  });

  const handleDeleteConfirm = () => {
  console.log(`Attendee deleted: ${selectedAttendee?.attendeeName}`);
  showDeleteModal = false;
  selectedAttendee = null;
};

const handleDeleteCancel = () => {
  showDeleteModal = false;
  selectedAttendee = null;
};

  const getBadgeStatus = (status) =>
    STATUS_BADGES[status] || STATUS_BADGES.default;

  function rowsSelect(event) {
    const { detail: selectedRows } = event;
    console.log("Selected Rows:", selectedRows);
  }

  const tableData = [
    {
      id: 1,
      attendeeName: "Cameron Williamson",
      ticketType: "General Admission",
      price: "14.99",
      isChecked: true,
      status: "Checked in",
    },
    {
      id: 2,
      attendeeName: "Arlene McCoy",
      ticketType: "General Admission",
      price: "14.99",
      isChecked: true,
      status: "Checked in",
    },
    {
      id: 3,
      attendeeName: "Kristin Watson",
      ticketType: "VIP Ticket",
      price: "24.99",
      isChecked: false,
      status: "Check in",
    },
    {
      id: 4,
      attendeeName: "Eleanor Pena",
      ticketType: "VIP Ticket",
      price: "24.99",
      isChecked: false,
      status: "Check in",
    },
  ];

  let showRefundModal = false;

  const handleRefund = () => {
    console.log("Refund processed!");
  };

  const handleCancel = () => {
    showRefundModal = false;
  };

  const onSelectDropDown = (value) => {
  if (value === "issue_refund") {
    showRefundModal = true;
  } else if (value === "delete_attendee") {
    showDeleteModal = true; 

  }
};

  $: breadcrumbData = [
    { name: "Home", href: "/" },
    {
      name: "The Friday Night Comedy Show",
      href: "/shows/friday-night-comedy",
    },
    {
      name: `Orders`,
      href: `/shows/friday-night-comedy/orders`,
    },
    {
      name: `#${orderId}`,
      href: `/shows/friday-night-comedy/orders/${orderId}`,
    },
  ];

  let dropdownItems = [
    {
      label: "Switch ticket type",
      icon: TicketOutline,
      alt: "Switch",
      iconType: "image",
      action: "switch_ticket_type",
    },
    {
      label: "Transfer",
      icon: ArrowrightArrowleft,
      alt: "Transfer",
      iconType: "image",
      action: "transfer",
    },
    {
      label: "Issue refund",
      icon: CurrencyDollar,
      className: "font-normal text-sm text-gray-700",
      alt: "Issue refund",
      iconType: "component",
      action: "issue_refund",
    },
    {
    label: "Delete attendee",
    icon: TrashCan,
    alt: "Delete attendee",
    iconType: "component",
    action: "delete_attendee",
    className: "font-normal text-sm text-red-600",
  },
  ];
 
</script>

<div class="order-get-by-id">
 
  <nav class="py-4">
    <Breadcrumb data={breadcrumbData} />
  </nav>
  <div class="grid grid-cols- 12 gap-8 px-4 pt-0 py-5 items-center">
    <div class="col-span-12 md:col-span-6">
      <div class="flex items-center justify-between md:justify-start space-x-2">
        <span class=" text-2xl font-bold text-gray-900">Order #{orderId}</span>
        {#if loading}
          <Skeleton class="h4 bg-gray-500" />
        {:else if order?.status}
          <Badge
            status={getBadgeStatus(order.status)}
            className="rounded-full px-2"
          >
            {order.status}
          </Badge>
        {/if}
      </div>
    </div>
    <div class="col-span-12 md:col-span-6">
      <div class="flex items-center space-x-2 justify-end">
        <Button
          strokebtn
          afterIcon={DownArrowIcon}
          className="!p-1.5 !px-3 gap-6 w-[215px] justify-between"
          >Actions</Button
        >
        <Dropdown class="w-[215px] space-y-1 ">
          <DropdownItem
            class="flex items-center gap-2 no-underline hover:no-underline"   >
            <img src={SendMessageIcon} alt="Resend Confirmation" />Meessage
            Attendee</DropdownItem
          >
          <DropdownItem
            class="flex items-center gap-2 no-underline hover:no-underline"
          >
            <img src={Print} alt="Resend Confirmation" />Print tickets</DropdownItem
          >
          <DropdownItem
            class="flex items-center gap-2 no-underline hover:no-underline"
            on:click={handleDropdownClick}
          >
            <img src={SendMessageIcon} alt="Resend Confirmation" />
            Resend confirmation
          </DropdownItem>

          <DropdownItem
            on:click={async () =>
              await goto(`/orders/${orderId}/transferOrder`)}
            class="flex items-center gap-2 no-underline hover:no-underline"
          >
            <img src={TransferIcon} alt="transfer" />Transfer
          </DropdownItem>
        </Dropdown>
        <Button
          danger
          strokebtn
          beforeIcon={Cancel}
          on:click={() => (showRefundModal = true)}>Cancel order</Button
        >
      </div>
    </div>
  </div>

  <div class="grid grid-cols-12 gap-3 pl-4">
    <div class="col-span-12 md:col-span-8 mr-7 md:mr-0">
      <div class="h-auto">
        <LeftCard
          customerName={order?.purchasedBy?.name}
          email={order?.purchasedBy?.email}
          phone="910 482 3053"
          orderTotal="$86.34"
          tickets={4}
          purchaseDate="Tuesday, July 30, 2024"
          purchaseTime="1:41pm EST"
          paymentMethod="•••• •••• •••• 1865"
          userDetails={{ userProfileUrl: userProfileImg }}
        />
      </div>
      <div
        class="bg-white shadow-sm rounded-lg p-4 align-center sm:p-6 border border-gray-200 my-4"
      >
        <div>
          <h2 class="py-3 pt-1 pb-6 text-xl font-normal text-gray-900">
            Attendees
          </h2>
          <div class="grid grid-cols-12 gap-3 md:gap-8">
            <div class="col-span-12 md:col-span-6">
              <Search class="h-10" />
            </div>
            <div class="col-span-12 md:col-span-6">
              <div class="flex items-center justify-end">
                <div class="space-x-4">
                  <Button
                    strokebtn
                    afterIcon={DownArrowIcon}
                    className="!p-1.5 !px-3 gap-6">Actions</Button
                  >
                  <Dropdown class="w-[215px] ">
                    {#each dropdownItems as item}
                      <DropdownItem
                        on:click={() => onSelectDropDown(item.action)}
                        class={cn(
                          "flex items-center gap-2 no-underline hover:no-underline font-normal",
                          item.className
                        )}
                      >
                        {#if item.icon}
                          {#if item.iconType === "image"}
                            <img
                              src={item.icon}
                              alt={item.alt}
                              class="font-normal"
                            />
                          {:else if item.iconType === "component"}
                            <svelte:component this={item.icon} size={16} />
                          {/if}
                        {/if}
                        {item.label}
                      </DropdownItem>
                    {/each}
                  </Dropdown>
                  <Button deemphasized={true}>Check in</Button>
                </div>
              </div>
            </div>
          </div>

          <div class="hidden md:block">
            {#if loading}
              <TableSkeleton columns={8} rows={4} />
            {:else}
              <div
                class="bg-BG-Secondary w-full rounded-[16px] mt-5 flex items-center justify-center"
              >
                <Table
                  columns={AttendeeTableColumns}
                  showTableHead={true}
                  on:rowsSelect={rowsSelect}
                  data={tableData}
                  {onSelectDropDown}
                  bordered={false}
                  isRounded={false}
                  searchable={false}
                  isDraggable={false}
                  {dropdownItems}
                  styles={{
                    container:
                      "w-full align-left overflow-hidden overflow-auto whitespace-nowrap",
                    thead:
                      "text-xs leading-[18px] text-gray-500 border-b font-semibold border-gray-200 uppercase bg-gray-50 px-4 py-4 cursor-normal",
                    tr: " text-sm text-gray-500 font-normal leading-[21px]",
                    td: "text-sm font-normal py-4 border-b border-gray-200 !pr-0 ",
                    th: "!pr-0",
                  }}
                  hasCheckBox={true}
                  keyField="id"
                  hasActions={true}
                />
              </div>
            {/if}
          </div>

          <div class="block md:hidden">
            {#each tableData as attend, index}
              <TicketCard
                attendeeName={attend.attendeeName}
                ticketType={attend.ticketType}
                price={attend.price}
                status={attend.status}
                isCheckedIn={attend.isChecked}
                {onSelectDropDown}
              />
            {/each}
          </div>
        </div>
      </div>
    </div>

    <div class="col-span-12 md:col-span-4 mr-4 sm:ml-4">
      <div class="h-auto">
        <RightCard orderItems={items} {subtotal} {tax} {serviceFee} {total} />
      </div>
    </div>
  </div>
</div>
{#if showDeleteModal}
  <DeleteAttendeeModel
  isOpen={showDeleteModal}
    title="Getting Error"
    message="Are you want to Sure to Delete the Attendee"
    cancelText="No"
    confirmText="Yes"
    icon={Alert}
    onCancel={handleDeleteConfirm}
    onConfirm={handleDeleteCancel}
  />
{/if}

<RefundModal
  show={showRefundModal}
  on:close={() => (showRefundModal = false)}
  on:click={() => (showRefundModal = false)}
  title="Are you sure you want to issue a refund?"
  description="This will refund the cost of the purchase and make any ordered tickets available for resale."
  Items={[{ label: "1 x VIP Ticket", price: "$24.99" }]}
  PriceBreakdown={[
    { label: "Subtotal", value: "$24.99" },
    { label: "Tax (6%)", value: "$1.49" },
    { label: "Service Fee (2%)", value: "$0.49" },
  ]}
  total="Total"
  totalValue="$26.97"
  Actions={[
    {
      label: "Go back",
      strokebtn: true,
      onClick: handleCancel,
      class:
        "w-full rounded-lg text-blue-500 border border-blue-500 text-sm font-medium",
    },
    { label: "Refund $26.97", danger: true, onClick: handleRefund },
  ]}
/>
