<script>
  import { z } from "zod";
  import OrderSummary from "@components/Cards/OrderSummary.svelte";
  import CreateNewOrderForm from "@components/Cards/CreateNewOrderForm.svelte";
  import { Label, Input, Button } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import Breadcrumb from "@components/Breadcrumb/Breadcrumb.svelte";
  import StepperNavigation from "./StepperNavigation.svelte";
  import Payment from "@components/Cards/Payment.svelte";
  import leftArrow from "@assets/svg/arrow-left.svg";
  import { goto } from "$app/navigation";
  import CheckMarked from "@assets/svg/checkmark.svg";
  import AlertIcon from "@assets/svg/Alert-icon.svg";
  import OrderPopup from "@components/Orders/OrderPopup.svelte";

  let formState = {
    customer: {
      name: "",
      email: "",
    },
    tickets: {
      selectedTickets: {},
      quantities: {},
    },
    payment: {
      method: "",
      creditCard: {
        cardholderName: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        zipCode: "",
      },
    },
    promoCode: "",
  };
  let isCreatingOrder = false;
  let isCompleteOrder = false;
  let isInCompleteOrder = false;

  const CustomerSchema = z.object({
    customer: z.object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Invalid email address"),
    }),
  });

  const TicketSchema = z.object({
    tickets: z.object({
      selectedTickets: z.record(z.string(), z.number().min(0)),
      quantities: z.record(
        z.string(),
        z.number().min(1, "Quantity must be at least 1")
      ),
    }),
  });

  const CreditCardSchema = z.object({
    cardholderName: z.string().min(1, "Cardholder name is required"),
    cardNumber: z
      .string()
      .min(19, "Invalid card number")
      .regex(/^(\d{4}\s){3}\d{4}$/, "Invalid card number format"),
    expiryDate: z
      .string()
      .regex(/^\d{2}\/\d{2}$/, "Invalid expiry date format"),
    cvv: z
      .string()
      .length(3, "CVV must be 3 digits")
      .regex(/^\d{3}$/, "CVV must contain only numbers"),
    zipCode: z
      .string()
      .length(5, "ZIP code must be 5 digits")
      .regex(/^\d{5}$/, "ZIP code must contain only numbers"),
  });

  const PaymentSchema = z.object({
    payment: z.object({
      method: z.string().min(1, "Payment method is required"),
      creditCard: CreditCardSchema.optional(),
    }),
  });

  let errors = {
    customer: {},
    tickets: {},
    payment: {
      creditCard: {},
    },
  };
  let steps = ["Tickets", "Payment"];
  let currentStep = 1;
  let loading = true;
  let events = [];

  const paymentMethods = [
    { id: "complimentary", label: "Complimentary" },
    { id: "cash", label: "Cash" },
    { id: "check", label: "Check" },
    { id: "gift-card", label: "Gift Card" },
    { id: "paid-online", label: "Paid Online" },
    { id: "credit-card", label: "Credit Card", icons: true },
  ];

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

  $: orderId = $page.params.id;

  $: userInfo =
    formState.customer.name && formState.customer.email ? true : false;
  $: orderSummary = calculateOrderSummary(formState.tickets);

  function validateCustomerInfo() {
    try {
      CustomerSchema.parse(formState);
      errors.customer = {};
      return true;
    } catch (error) {
      errors.customer = error.formErrors.fieldErrors.customer || {};
      return false;
    }
  }

  function validatePayment() {
    try {
      PaymentSchema.parse(formState);
      if (formState.payment.method === "credit-card") {
        CreditCardSchema.parse(formState.payment.creditCard);
      }
      errors.payment = {};
      return true;
    } catch (error) {
      if (error.formErrors?.fieldErrors?.payment) {
      }
      if (
        formState.payment.method === "credit-card" &&
        error.formErrors?.fieldErrors
      ) {
        errors.payment.creditCard = error.formErrors.fieldErrors;
      }
      return false;
    }
  }

  function handleSelectionChange(value) {
    formState.payment.method = value.detail;
    errors.payment = {};
  }

  function handleCreditCardChange(event) {
    const { type, creditCard } = event.detail.detail;
    if (type === "creditCard") {
      formState.payment.creditCard = creditCard;
      errors.payment.creditCard = {};
    }
  }

  function handleTicketChange(event) {
    const { ticket, quantity } = event.detail;
    formState.tickets.selectedTickets[ticket.id] = ticket;
    formState.tickets.quantities[ticket.id] = quantity;
    errors.tickets = {};
  }

  function calculateOrderSummary(ticketState) {
    const subtotal = Object.entries(ticketState.quantities).reduce(
      (total, [id, quantity]) => {
        const ticket = tickets.find((t) => t.id === id);
        return total + (ticket?.price || 0) * quantity;
      },
      0
    );

    const tax = subtotal * 0.06;
    const serviceFee = subtotal * 0.02;
    const total = subtotal + tax + serviceFee;

    return {
      tickets: Object.entries(ticketState.quantities).map(([id, quantity]) => {
        const ticket = tickets.find((t) => t.id === id);
        return {
          type: ticket?.name || "",
          quantity,
          price: ticket?.price || 0,
        };
      }),
      subtotal,
      tax,
      serviceFee,
      total,
    };
  }

  function transformTickets(purchasedTickets) {
    const ticketMap = {
      "General Admission": "2",
      VIP: "3",
      Mezzanine: "4",
    };

    return purchasedTickets.reduce((acc, ticket) => {
      const ticketId = ticketMap[ticket.type];
      if (ticketId) {
        acc[ticketId] = ticket.quantity;
      }
      return acc;
    }, {});
  }

  async function handlePlaceOrder() {
    isCreatingOrder = true;
    if (!validatePayment()) return;
    const payload = {
      firstName: formState.customer.name.split(" ")[0],
      lastName: formState.customer.name.split(" ").slice(1).join(" "),
      email: formState.customer.email,
      price: orderSummary.total,
      // purchasedTickets: orderSummary.tickets,
      purchasedTickets: null,
      paymentMethod: formState.payment.method,
      billingZIP: formState.payment.creditCard?.zipCode || "",
      phone: "",
      notes: "",
      paymentIntentId: "",
      paymentStatus: "pending",
      purchaserIP: "",
      refundRequested: false,
      refundMessage: "",
      refundAmount: 0,
      source: "web",
    };

    try {
      const orderData = await fetch("./../../api/public/createOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const paymentMethodId = await orderData.json();
      if (paymentMethodId.uuid) {
        const paymentPayload = {
          id: paymentMethodId.uuid,
          paymentIntentId: "pi_3PfY8CJ3w04AV8CH1tBhHVzu",
          tickets: transformTickets(orderSummary.tickets),
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email,
          mailingList: true,
        };
        const paymentData = await fetch(
          "./../../api/public/validatePaymentIntent",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentPayload),
          }
        );
        const paymentDataResponse = await paymentData.json();
        if (paymentDataResponse.status === "Payment succeeded") {
          isCompleteOrder = true;
        } else if (
          paymentDataResponse.status ===
          "Payment amount does not match the total price"
        ) {
          isInCompleteOrder = true;
        }
        console.log(paymentDataResponse, "payment");
        isCreatingOrder = false;
      }
      if (!orderData.ok) {
        const errorData = await orderData.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to create order");
      }
    } catch (error) {
      isCreatingOrder = false;
      console.error("Error creating order:", error);
    }
  }

  onMount(async () => {
    await getTransferAll();
  });

  async function getTransferAll() {
    try {
      const response = await fetch("./../../api/transfer");
      events = await response.json();
    } catch (error) {
      console.error("Failed to load events:", error);
    } finally {
      loading = false;
    }
  }

  const breadcrumbData = [
    { name: "Home", href: "/" },
    {
      name: "The Friday Night Comedy Show",
      href: "/shows/friday-night-comedy",
    },
    { name: "Orders", href: "/orders" },
    { name: "New order", href: "/newOrder" },
  ];
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
    <img class="h-5 w-5 text-primary-500" src={leftArrow} alt="note-edit" />
    <p class="ml-2 text-primary-500 text-sm font-medium">Go Back</p>
  </div>

  <div class="grid grid-cols-12 gap-5">
    <div class="col-span-12 md:col-span-8">
      {#if currentStep === 1}
        <CreateNewOrderForm
          bind:customerName={formState.customer.name}
          bind:customerEmail={formState.customer.email}
          {tickets}
          on:quantityChange={handleTicketChange}
          errors={errors.customer}
        />
      {/if}

      {#if currentStep === 2}
        <Payment
          {paymentMethods}
          bind:selectedPaymentMethod={formState.payment.method}
          bind:creditCardInfo={formState.payment.creditCard}
          on:selectionChange={handleSelectionChange}
          on:creditCardChange={handleCreditCardChange}
          errors={errors.payment}
        />
      {/if}

      <div
        class="mt-6 justify-between space-x-6 align-middle items-end hidden sm:flex"
      >
        <div class="col-span-10 w-full">
          <Label
            for="promo-code"
            class="block mb-2 text-sm font-medium text-gray-900"
          >
            Promo code
          </Label>
          <Input
            id="promo-code"
            bind:value={formState.promoCode}
            placeholder=""
          />
        </div>
        <div>
          <Button color="blue">Apply</Button>
        </div>
      </div>

      <button
        class="items-center cursor-pointer mt-3 md:mt-10 md:pb-2 hidden sm:flex"
        on:click={() => {
          if (currentStep === 2) {
            currentStep = 1;
          } else if (currentStep === 1) {
            goto("/orders");
          }
        }}
        type="button"
      >
        <img class="h-5 w-5 text-primary-500" src={leftArrow} alt="note-edit" />
        <p class="ml-2 text-primary-500 text-sm font-medium">Go Back</p>
      </button>
    </div>

    <div class="col-span-12 md:col-span-4">
      <OrderSummary
        ordersSummary={orderSummary}
        onClickButton={() => {
          if (currentStep === 1) {
            if (validateCustomerInfo()) {
              currentStep = 2;
            }
          } else if (currentStep === 2) {
            handlePlaceOrder();
          }
        }}
        buttonClass={(userInfo && currentStep == 1) || formState.payment.method
          ? "bg-primary-500"
          : "bg-gray-400"}
        buttonText={isCreatingOrder
          ? "Loading ..."
          : currentStep === 2
            ? "Place order"
            : "Next: Payment" || "Next: Payment"}
      />
    </div>
  </div>

  <OrderPopup
    isOpen={isCompleteOrder}
    title="Order successful"
    confirmText="Back to Orders"
    onCancel={() => {
      isCompleteOrder = false;
      goto("/orders/newOrder");
    }}
    onConfirm={() => {
      isCompleteOrder = false;
      goto("/orders");
    }}
    icon={CheckMarked}
  />

  <OrderPopup
    isOpen={isInCompleteOrder}
    title="Order failed"
    message="This order did not complete successfully.
Please try again."
    confirmText="Ok"
    onCancel={() => {
      isInCompleteOrder = false;
      currentStep = 1;
      goto("/orders/newOrder");
    }}
    onConfirm={() => {
      isInCompleteOrder = false;
      currentStep = 1;
      goto("/orders/newOrder");
    }}
    icon={AlertIcon}
  />
</div>
