<script>
    import TransferCard from "@components/Cards/TransferCard.svelte";
    import TransferSummary from "@components/Cards/TransferSummary.svelte";
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
    const transferSummaryData = {
    originalTickets: [
      { type: 'General Admission', quantity: 2, price: 14.99 },
      { type: 'VIP Tickets', quantity: 2, price: 24.99 },
    ],
    newTickets: [
      { type: 'General Admission', quantity: 3, price: 12.99 },
      { type: 'VIP Tickets', quantity: 1, price: 24.99 },
    ],
    subtotal: -16.0,
    tax: -0.96,
    serviceFee: -0.32,
    total: -17.38,
    refund: 17.38,
  };
</script>

<div class="w-full">
    <span class="font-bold text-3xl text-gray-900 p-5">Transfer order</span>
    <div class="mt-3 w-full flex">
        <TransferCard {transferData}  />
        <TransferSummary transferSummary={transferSummaryData} />
    </div>

</div>
