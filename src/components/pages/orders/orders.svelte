<script>
  import { onMount } from "svelte";
  import { Dropdown, DropdownItem } from "flowbite-svelte";
  import { page } from "$app/stores";
  import { OrderTableColumn } from "./OrderTableColumn";
  import Badge from "@components/Badges/Badge.svelte";
  import Table from "@components/Table/Table.svelte";
  import TableSkeleton from "@components/Table/TableSkeleton.svelte";
  import Breadcrumb from "@components/Breadcrumb/Breadcrumb.svelte";
  import StatsCard from "@components/Stats/StatsCard.svelte";
  import FilterIcon from "@assets/svg/filter.svg";
  import ExportIcon from "@assets/svg/file-export.svg";
  import DownArrowIcon from "@assets/icons/arrow-up-01.svg";
  import CartIcon from "@assets/svg/cart-plus.svg";
  import Button from "@components/Button/Button.svelte";
  import PrintIcon from "@assets/icons/print.svg";
  import SendMessageIcon from "@assets/icons/message.svg";
  import TransferIcon from "@assets/icons/transfer.svg";
  import { Pagination } from "flowbite-svelte";
  import OrderDetails from "@components/Orders/OrderDetails.svelte";
  import { goto } from "$app/navigation";

  import {
    ChevronLeftOutline,
    ChevronRightOutline,
  } from "flowbite-svelte-icons";
  import { Search } from "flowbite-svelte";
  import FilterDropdownCard from "@components/Cards/FilterDropdownCard.svelte";

  export function convertToDate(value) {
    return value ? new Date(value).toDateString() : null;
  }

  let stats = [];
  let tableData = [];
  let loading = true;
  let pages = [];

  const salesTypes = ["Retail", "Wholesale", "Online", "Direct"];
  const statuses = ["Pending", "Processing", "Completed", "Cancelled"];

  let selectedSalesTypes = [];
  let selectedStatuses = [];
  let resultsCount = 0;

  const handleSalesTypeChange = (types) => {
    selectedSalesTypes = types;
    updateResults();
  };

  const handleStatusChange = (stats) => {
    selectedStatuses = stats;
    updateResults();
  };

  const handleReset = () => {
    selectedSalesTypes = [];
    selectedStatuses = [];
    resultsCount = 0;
  };

  const updateResults = () => {
    resultsCount = selectedSalesTypes.length + selectedStatuses.length;
  };

  async function getOrdersAll() {
    try {
      const response = await fetch("./api/orders");
      const data = await response.json();

      stats = data.orders.map((order) => ({
        name: order.name,
        value: order.value,
        icon: order.icon,
      }));

      pages = data.tableData.map((i) => {
        return {
          name: i.id,
          href: "",
        };
      });

      tableData = data.tableData.map((item) => ({
        id: item.id,
        orderId: item.orderId,
        purchasedBy: item.purchasedBy,
        email: item.email,
        status: item.status,
        dateOfPurchase: convertToDate(item.dateOfPurchase),
        quantity: item.quantity,
        saleType: item.saleType,
        total: item.total,
        note: item.note,
      }));

      loading = false;
    } catch (error) {
      console.error("Failed to load notifications:", error);
    }
  }

  function rowsSelect(event) {
    const { detail: selectedRows } = event;
    console.log("Selected Rows:", selectedRows);
  }

  const onClickRow = async (row) => {
    let OrderId = row.orderId.replaceAll("#", "");
    await goto(`/orders/${OrderId}`);
  };

  onMount(() => {
    getOrdersAll();
  });

  let breadcrumbData = [
    { name: "Home", href: "/" },
    {
      name: "The Friday Night Comedy Show",
      href: "/shows/friday-night-comedy",
    },
    { name: "Orders", href: "/shows/friday-night-comedy/orders" },
  ];
  $: activeUrl = $page.url.pathname;
</script>

<div class="w-full mx-auto px-4 bg-BG-Secondary">
  <nav class="py-4">
    <Breadcrumb data={breadcrumbData} />
  </nav>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <StatsCard {stats} />
  </div>

  <div class="w-full py-6">
    <section class="bg-white custom-shadow rounded-[16px] p-6">
      <div class="flex items-center justify-between sm:flex-row flex-col">
        <div class="w-full">
          <h5 class=" text-gray-900 text-xl font-normal">Orders</h5>
        </div>
        <div class="w-full flex justify-end gap-2 sm:mt-0 mt-2">
          <div class="relative w-full sm:w-1/2 md:w-3/5">
            <Search class="h-10" />
          </div>

          <div class="sm:block hidden">
            <Button
              className="sm:mb-2 lg:mb-0 font-medium text-sm text-gray-900"
              strokebtn
              beforeIcon={FilterIcon}>Filters</Button
            >
            <Dropdown class="w-[320px] space-y-3">
              <FilterDropdownCard
                {salesTypes}
                {statuses}
                {selectedSalesTypes}
                {selectedStatuses}
                onSalesTypeChange={handleSalesTypeChange}
                onStatusChange={handleStatusChange}
                onReset={handleReset}
                {resultsCount}
              />
            </Dropdown>
            <Button
              strokebtn
              beforeIcon={ExportIcon}
              className="font-medium text-sm text-gray-900">Export</Button
            >
          </div>
        </div>
      </div>
      <div class="w-full items-center justify-between gap-2 mt-3 sm:mt-10">
        <div class="flex flex-row sm:justify-between justify-end items-center">
          <div class="sm:flex hidden flex-row items-center gap-1">
            <p class="text-[14px] leading-6 font-normal text-[#1A1919] pb-1">
              Filter:
            </p>
            <div class="">
              <Badge
                className="text-[#4D4D4D] px-2 text-[14px] leading-6 font-normal border rounded-md border-[#DEDEDE]"
                dismissable={true}>Sale Type: Complimentary</Badge
              >
              <Badge
                className="text-[#4D4D4D] px-2 text-[14px] leading-6 font-normal border rounded-md border-[#DEDEDE]"
                dismissable={true}>Date: Last 4 weeks</Badge
              >
            </div>
          </div>
          <div>
            <Button
              strokebtn
              afterIcon={DownArrowIcon}
              className="!p-1.5 !px-3 gap-6 mb-3 sm:mb-2 lg:mb-0"
              >Actions</Button
            >
            <Dropdown {activeUrl} class="w-[215px] space-y-3">
              <DropdownItem
                class="flex items-center gap-2 no-underline hover:no-underline"
                ><img src={PrintIcon} alt="Print Tickets" />Print Tickets</DropdownItem
              >
              <DropdownItem
                class="flex items-center gap-2 no-underline hover:no-underline"
              >
                <img src={SendMessageIcon} alt="Resend Confirmation" />Resend
                confirmation</DropdownItem
              >
              <DropdownItem
                on:click={async () => await goto(`/TransferOrder`)}
                class="flex items-center gap-2 no-underline hover:no-underline"
              >
                <img src={TransferIcon} alt="transfer" />
                Transfer order
              </DropdownItem>
            </Dropdown>
            <Button
              beforeIcon={CartIcon}
              on:click={() => goto("/orders/newOrder")}>Create new order</Button
            >
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
                columns={OrderTableColumn}
                showTableHead={true}
                on:rowsSelect={rowsSelect}
                data={tableData}
                bordered={false}
                isRounded={false}
                searchable={false}
                isDraggable={false}
                {onClickRow}
                styles={{
                  container:
                    "w-full align-left overflow-hidden overflow-scroll whitespace-nowrap",
                  thead:
                    "text-[12px] leading-[18px] text-gray-500 border-b font-semibold border-gray-200 uppercase bg-gray-50 px-4 py-4 cursor-normal ",
                  tr: "text-[14px] text-gray-500 font-medium leading-[21px]",
                  td: "py-4 border-b border-gray-200",
                }}
                hasCheckBox={true}
                keyField="id"
                hasActions={true}
              />
            </div>
          {/if}
        </div>

        <div class="block md:hidden">
          <OrderDetails orders={tableData} />
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
    </section>
  </div>
</div>

<style>
  .custom-shadow {
    box-shadow:
      0px 1px 3px 0px rgba(0, 0, 0, 0.1),
      0px 1px 2px -1px rgba(0, 0, 0, 0.1);
  }
</style>
