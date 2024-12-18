<script>
  import TransferSummary from "@components/Cards/TransferSummary.svelte";
  import CreateNewOrderForm from "@components/Cards/CreateNewOrderForm.svelte";
  import { Label, Input } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { Button } from "flowbite-svelte";
  import Breadcrumb from "@components/Breadcrumb/Breadcrumb.svelte";

  let loading = true;
  let events = [];
  let isSelectTicket = false;
  $: orderId = $page.params.id;

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

  const tickets = [
    {
      id: "generalAdmission",
      name: "General Admission",
      price: 14.99,
      availability: 50,
      color: "yellow",
    },
    {
      id: "vip",
      name: "VIP",
      price: 24.99,
      availability: 75,
      color: "green",
    },
    {
      id: "mezzanine",
      name: "Mezzanine",
      price: 54.99,
      availability: 18,
      color: "red",
    },
  ];

  onMount(async () => {
    await getTransferAll();
  });

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
      name: `New order`,
      href: `/shows/friday-night-comedy/orders/${orderId}/transferOrder`,
    },
  ];
</script>

<div class="w-full mx-auto px-4">
  <nav class="py-4">
    <Breadcrumb data={breadcrumbData} />
  </nav>
  <h4 class="font-bold text-3xl text-gray-900 py-4">Create new order</h4>
  <div class="grid grid-cols-12 gap-5">
    <div class="col-span-12 md:col-span-8">
      <CreateNewOrderForm {tickets} />
      <div></div>
      <div class="mt-6 flex justify-between space-x-6 align-middle items-end">
        <div class="col-span-10 w-full">
          <Label
            for="default-input"
            class="block mb-2 text-sm font-medium text-gray-900"
            >Promo code</Label
          >
          <Input id="default-input" placeholder="" />
        </div>
        <div class="">
          <Button color="blue">Apply</Button>
        </div>
      </div>
      <din>
        <h2 class="mt-6 text-sm font-medium text-Hue-Red">
          Invalid promo code
        </h2>
      </din>
      <div class="flex items-center cursor-pointer mt-3 md:mt-12 md:pb-2">
        <img
          class="h-5 w-5 text-primary-500"
          src="/src/assets/svg/arrow-left.svg"
          alt="note-edit"
        />
        <p class="ml-2 text-primary-500 text-sm font-medium">Go Back</p>
      </div>
    </div>
    <div class="col-span-12 md:col-span-4">
      <TransferSummary
        transferSummary={transferSummaryData}
        onClickButton={() => {
          isSelectTicket = false;
          alert("Okayy");
        }}
        buttonText={isSelectTicket ? "Transfer tickets" : "Continue"}
      />
    </div>
  </div>
</div>
