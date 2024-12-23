<script>
  import OrderSummary from "@components/Cards/OrderSummary.svelte";
  import CreateNewOrderForm from "@components/Cards/CreateNewOrderForm.svelte";
  import { Label, Input } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { Button } from "flowbite-svelte";
  import Breadcrumb from "@components/Breadcrumb/Breadcrumb.svelte";
  import StepperNavigation from "./StepperNavigation.svelte";
  import Payment from "@components/Cards/Payment.svelte";

  let steps = ["Tickets", "Payment"];
  let currentStep = 1;

  let loading = true;
  let events = [];
  let isSelectTicket = false;
  let customerName = "";
  let customerEmail = "";
  let selectedMethod = "";
  $: orderId = $page.params.id;

  let paymentMethods = [
    { id: "complimentary", label: "Complimentary" },
    { id: "cash", label: "Cash" },
    { id: "check", label: "Check" },
    { id: "gift-card", label: "Gift Card" },
    { id: "paid-online", label: "Paid Online" },
    { id: "credit-card", label: "Credit Card", icons: true },
  ];

  const handleSelectionChange = (value) => {
    selectedMethod = value;
    console.log("Selected Payment Method:", value);
  };

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

  $: userInfo = customerEmail && customerName ? true : false;
</script>

<div class="w-full mx-auto px-4">
  <nav class="py-4">
    <Breadcrumb data={breadcrumbData} />
  </nav>
  <div class="flex justify-between flex-wrap items-center">
    <h4 class="font-bold text-3xl text-gray-900 py-4 flex-grow sm:flex-grow-0">
      Create new order
    </h4>

    <div class="w-full sm:w-auto flex justify-end">
      <StepperNavigation {steps} {currentStep} />
    </div>
  </div>
  <div class="flex items-center cursor-pointer pb-8 pt-2 sm:hidden">
    <img
      class="h-5 w-5 text-primary-500"
      src="/src/assets/svg/arrow-left.svg"
      alt="note-edit"
    />
    <p class="ml-2 text-primary-500 text-sm font-medium">Go Back</p>
  </div>
  <div class="grid grid-cols-12 gap-5">
    <div class="col-span-12 md:col-span-8">
      {#if currentStep === 1}
        <CreateNewOrderForm bind:customerName bind:customerEmail {tickets} />
      {/if}
      {#if currentStep === 2}
        <Payment
          {paymentMethods}
          bind:selectedPaymentMethod={selectedMethod}
          on:selectionChange={handleSelectionChange}
        />
      {/if}
      <div></div>
      <div
        class="mt-6 justify-between space-x-6 align-middle items-end hidden sm:flex"
      >
        <div class="col-span-10 w-full">
          <Label
            for="default-input"
            class="block mb-2 text-sm font-medium text-gray-900"
            >Promo code</Label
          >
          <Input id="default-input" placeholder="" />
        </div>
        <div>
          <Button color="blue">Apply</Button>
        </div>
      </div>
      <!-- <div>
        <h2 class="mt-6 text-sm font-medium text-Hue-Red">
          Invalid promo code
        </h2>
      </div> -->
      <div
        class=" items-center cursor-pointer mt-3 md:mt-10 md:pb-2 hidden sm:flex"
      >
        <img
          class="h-5 w-5 text-primary-500"
          src="/src/assets/svg/arrow-left.svg"
          alt="note-edit"
        />
        <p class="ml-2 text-primary-500 text-sm font-medium">Go Back</p>
      </div>
    </div>
    <div class="col-span-12 md:col-span-4">
      <OrderSummary
        transferSummary={transferSummaryData}
        onClickButton={() => {
          if (userInfo) {
            currentStep = 2;
          }
        }}
        buttonClass={(userInfo && currentStep == 1) || selectedMethod
          ? "bg-primary-500"
          : "bg-gray-400"}
        buttonText={currentStep === 2 ? "Place order" : "Next: Payment"}
      />
    </div>
  </div>
</div>
