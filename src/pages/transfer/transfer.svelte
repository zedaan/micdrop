<script>
  import TransferCard from "@components/Cards/TransferCard.svelte";
  import TransferSummary from "@components/Cards/TransferSummary.svelte";
  import Table from "@components/Table/Table.svelte";
  import TableSkeleton from "@components/Table/TableSkeleton.svelte";
  import { onMount } from "svelte";
  import { EventTableColumns } from "./transferOrderTableColumn";
  import { Search } from "flowbite-svelte";

  let search = "";
  let loading = true;
  let events = [];

  async function getTransferAll() {
    try {
      const fetchedEvents = await fetch("./../../api/transfer").then((res) => {
        loading = false;
        return res.json();
      });
      events = [...fetchedEvents];
    } catch (error) {
      loading = false;
      console.error("Failed to load events:", error);
    }
  }

  function rowsSelect(event) {
    const { detail: selectedRows } = event;
    console.log("Selected Rows:", selectedRows);
  }

  const transferData = [
    {
      label: "Transfer from",
      title: "The Friday Night Comedy Show",
      date: "Friday, November 19, 2023, 8:30pm",
    },
    {
      label: "Transfer to",
      title: "The Friday Night Comedy Show",
      date: "Friday, August 16, 2024, 8:30pm",
    },
  ];

  const onClickRow = async (row) => {
    console.log(row, "Select Rows");
  };

  const transferSummaryData = {
    originalTickets: [
      { type: "General Admission", quantity: 2, price: 14.99 },
      { type: "VIP Tickets", quantity: 2, price: 24.99 },
    ],
    newTickets: [
      { type: "General Admission", quantity: 3, price: 12.99 },
      { type: "VIP Tickets", quantity: 1, price: 24.99 },
    ],
    subtotal: 16.0,
    tax: 0.96,
    serviceFee: 0.32,
    total: 17.38,
  };

  $: filteredEvents = events?.filter((event) =>
    event?.show?.name?.toLowerCase().includes(search.toLowerCase())
  );

  onMount(async () => {
    await getTransferAll();
  });
</script>

<div class="w-full mx-auto px-4">
  <h4 class="font-bold text-3xl text-gray-900 py-4">Transfer order</h4>
  <div class="grid grid-cols-12 gap-5">
    <div class="col-span-12 md:col-span-8">
      <TransferCard {transferData} />
      <div
        class=" bg-white shadow-sm rounded-2xl p-4 align-center sm:p-6 border border-gray-200 my-4"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 py-3">
          <h3 class="font-normal text-xl text-Text-Primary">
            Select the event you want to transfer to
          </h3>
          <Search class="h-10" />
        </div>
        <div class="hidden md:block mt-6">
          {#if loading}
            <TableSkeleton columns={8} rows={4} />
          {:else if filteredEvents?.length === 0}
            <div class="text-center text-gray-500 py-4">No events found.</div>
          {:else}
            <Table
              columns={EventTableColumns}
              showTableHead={true}
              on:rowsSelect={rowsSelect}
              data={filteredEvents}
              bordered={false}
              isRounded={false}
              isDraggable={false}
              searchable={false}
              {onClickRow}
              styles={{
                container:
                  "w-full align-left overflow-hidden whitespace-nowrap overflow-scroll ",
                thead:
                  "text-xs font-semibold leading-[18px] text-gray-500 border-b border-gray-200 uppercase bg-gray-50 px-4 py-4 cursor-normal",
                tr: "text-sm text-gray-400 font-normal leading-[21px]",
                td: "text-sm border-b border-gray-200",
              }}
              hasRadioButton={true}
              keyField="id"
            />
          {/if}
        </div>
      </div>
      <div class="block md:hidden">
        <h3 class="flex justify-center py-4">Mobile View</h3>
      </div>
    </div>
    <div class="col-span-12 md:col-span-4">
      <TransferSummary transferSummary={transferSummaryData} />
    </div>
  </div>
</div>
