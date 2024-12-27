<script>
  import { onMount } from "svelte";
  import Button from "@components/Button/Button.svelte";
  import { Dropdown, DropdownItem, Pagination } from "flowbite-svelte";
  import DownArrowIcon from "@assets/icons/arrow-up-01.svg";
  import CurrencyDollar from "carbon-icons-svelte/lib/CurrencyDollar.svelte";
  import TrashCan from "carbon-icons-svelte/lib/TrashCan.svelte";
  import TicketOutline from "@assets/icons/ticket-outline.svg";
  import Message from "@assets/icons/message.svg";
  import ExportIcon from "@assets/svg/file-export.svg";
  import TransferIcon from "@assets/icons/transfer.svg";
  import { Search } from "flowbite-svelte";
  import RefundModal from "@components/Orders/RefundModal.svelte";
  import TableSkeleton from "@components/Table/TableSkeleton.svelte";
  import Table from "@components/Table/Table.svelte";
  import Plus from "@assets/svg/plus.svg";

  import { Attendees, AttendeeTableColumns } from "./attendeesTableColumn";
  import Breadcrumb from "@components/Breadcrumb/Breadcrumb.svelte";
  import {
    ChevronLeftOutline,
    ChevronRightOutline,
  } from "flowbite-svelte-icons";
  import OrderDetails from "@components/Orders/OrderDetails.svelte";
  import AttendeesDetails from "@components/Orders/AttendeesDetails.svelte";

  let loading = false;

  let pages = [];

  onMount(() => {
    pages = Attendees.map((i) => {
      return {
        name: i.id,
        href: "",
      };
    });
  });

  function rowsSelect(event) {
    const { detail: selectedRows } = event;
    console.log("Selected Rows:", selectedRows);
  }

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
    }
    console.log("Select", value);
  };

  let breadcrumbData = [
    { name: "Home", href: "/" },
    {
      name: "The Friday Night Comedy Show",
      href: "/shows/friday-night-comedy",
    },
    { name: "Attendees", href: "/shows/friday-night-comedy/attendees" },
  ];
</script>

<div class="attendees">
  <nav class="py-4">
    <Breadcrumb data={breadcrumbData} />
  </nav>
  <div
    class="border border-gray-200 bg-white shadow-sm rounded-lg m-4 align-center sm:m-6 my-4 pb-10 p-4"
  >
    <div class=" flex justify-between p-4 md:pb-6 tems-center flex-wrap">
      <h3 class=" text-xl font-normal text-gray-900 pb-4 md:pb-0">Attendees</h3>
      <div
        class="flex justify-start md:justify-end items-center gap-4 flex-wrap md:flex-nowrap"
      >
        <div class="relative w-10/12 md:w-12/12">
          <Search class="h-10" />
        </div>
        <Button
          strokebtn
          size="xl"
          beforeIcon={ExportIcon}
          className="font-medium text-sm text-gray-900">Export</Button
        >
      </div>
    </div>

    <div class="grid grid-cols-1 gap-3 pl-4">
      <div>
        <div class="grid grid-cols-12 gap-3 md:gap-8 mb-8">
          <div class="col-span-12 sm:col-span-6 md:col-span-6">
            <Button
              strokebtn
              size="xl"
              beforeIcon={Plus}
              className="font-medium text-sm text-gray-900"
              >Add Attendees</Button
            >
          </div>
          <div class="col-span-12 sm:col-span-6 md:col-span-6">
            <div class="flex items-center justify-start md:justify-end">
              <div class="space-x-4 mr-4">
                <Button
                  strokebtn
                  afterIcon={DownArrowIcon}
                  className="!p-1.5 !px-3 gap-6">Actions</Button
                >
                <Dropdown class="w-[215px]">
                  <DropdownItem
                    on:click={() => onSelectDropDown("print_tickets")}
                    class="flex items-center gap-2 text-sm no-underline hover:no-underline font-normal text-gray-700"
                    ><img src={Message} alt="Print Tickets" />Message attendee</DropdownItem
                  >
                  <DropdownItem
                    on:click={() => onSelectDropDown("switch_ticket_type")}
                    class="flex items-center gap-2 no-underline hover:no-underline font-normal"
                  >
                    <img
                      src={TicketOutline}
                      alt="Resend Confirmation"
                      class="font-normal text-sm text-gray-700"
                    />Switch ticket type</DropdownItem
                  >
                  <DropdownItem
                    on:click={() => {
                      onSelectDropDown("transfer");
                    }}
                    class="flex items-center gap-2 no-underline hover:no-underline font-normal"
                  >
                    <img
                      src={TransferIcon}
                      alt="transfer"
                      class="font-normal text-sm text-gray-700"
                    />Transfer</DropdownItem
                  >
                  <DropdownItem
                    on:click={() => onSelectDropDown("issue_refund")}
                    class="flex items-center gap-2 no-underline hover:no-underline font-normal"
                  >
                    <CurrencyDollar
                      class="font-normal text-sm text-gray-700"
                    />Issue refund</DropdownItem
                  >
                  <DropdownItem
                    on:click={() => onSelectDropDown("delete_attendee")}
                    class="flex items-center gap-2 no-underline hover:no-underline text-red-600 font-normal"
                  >
                    <TrashCan class="font-normal text-sm text-gray-700" />Delete
                    attendee</DropdownItem
                  >
                </Dropdown>
                <Button>Check in</Button>
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
                data={Attendees}
                {onSelectDropDown}
                bordered={false}
                isRounded={false}
                searchable={false}
                isDraggable={false}
                styles={{
                  container:
                    "w-full align-left overflow-hidden overflow-auto whitespace-nowrap",
                  thead:
                    "text-xs leading-[18px] text-gray-500 border-b font-semibold border-gray-200 uppercase bg-gray-50 px-4 py-4 cursor-normal",
                  tr: " text-sm text-gray-500 font-normal leading-[21px]",
                  td: "text-sm font-normal py-4 border-b border-gray-200",
                }}
                hasCheckBox={true}
                keyField="id"
                hasActions={true}
              />
            </div>
          {/if}
        </div>

        <div class="block md:hidden">
          <AttendeesDetails attendees={Attendees} />
        </div>
        <div class="sm:flex hidden flex-row items-center justify-between pt-4">
          <div>
            <p class="text-gray-500 text-[14px] leading-[21px] font-normal">
              Showing <span class="text-gray-900">1-10</span> of
              <span class="text-gray-900">48</span>
            </p>
          </div>
          <Pagination {pages} medium icon>
            <svelte:fragment slot="prev">
              <span class="sr-only">Previous</span>
              <ChevronLeftOutline class="w-6 h-6" />
            </svelte:fragment>
            <svelte:fragment slot="next">
              <span class="sr-only">Next</span>
              <ChevronRightOutline class="w-6 h-6" />
            </svelte:fragment>
          </Pagination>
        </div>
      </div>
    </div>
  </div>
</div>

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
    { label: "Go back", strokebtn: true, onClick: handleCancel },
    { label: "Refund $26.97", danger: true, onClick: handleRefund },
  ]}
/>
