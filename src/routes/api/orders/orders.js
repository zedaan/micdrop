import chart from "@assets/svg/chart.svg"
import user from "@assets/svg/user.svg"
import dollar from "@assets/svg/dollar.svg"

export const OrdersData = {
  id: 1234,
  dashboard: [],
  orders: [
    {
      name: "Total Orders",
      value: 48,
      icon: chart,
    },
    {
      name: "Total Attendees",
      value: "61 of 155",
      totalAttendees: 155,
      confirmedAttendees: 61,
      icon: user
    },
    {
      name: "Total Revenue",
      value: "$1,234",
      totalRevenue: 1234,
      icon: dollar
    },
  ],
  tableData: [
    {
      id: 1,
      orderId: "#12345678",
      purchasedBy: {
        name: "John Doe",
        email: "john@gmail.com",
      },
      status: "Completed",
      dateOfPurchase: "2024-08-18T15:38:33.991Z",
      quantity: 2,
      saleType: "Online",
      total: "$100",
      note: "This is a note",
    },
    {
      id: 2,
      orderId: "#12345679",
      purchasedBy: {
        name: "Jane Smith",
        email: "john@gmail.com",
      },
      status: "Completed",
      dateOfPurchase: "2024-07-15T12:25:10.000Z",
      quantity: 1,
      saleType: "Complimentary",
      total: "$250",
      note: "Delivered on time",
    },
    {
      id: 3,
      orderId: "#12345680",
      purchasedBy: {
        name: "Robert Johnson",
        email: "robert@gmail.com",
      },
      status: "Completed",
      dateOfPurchase: "2024-08-10T10:00:00.000Z",
      quantity: 3,
      saleType: "Online",
      total: "$150",
      note: "Shipped via express",
    },
    {
      id: 4,
      orderId: "#12345681",
      purchasedBy: {
        name: "karim",
        email: "karim@gmail.com",
      },
      status: "Refunded",
      dateOfPurchase: "2024-08-05T14:18:45.000Z",
      quantity: 5,
      saleType: "Online",
      total: "$500",
      note: "Customer canceled the order",
    },
    {
      id: 5,
      orderId: "#12345682",
      purchasedBy: {
        name: "Michael",
        email: "michal@cc.com",
      },
      status: "Partially Refunded",
      dateOfPurchase: "2024-09-20T09:30:15.000Z",
      quantity: 2,
      saleType: "Complimentary",
      total: "$300",
      note: "Processing for pickup",
    },
    {
      id: 6,
      orderId: "#12345683",
      purchasedBy: {
        name: "Sarah Wilson",
        email: "sarah@hotmail.com",
      },
      status: "Completed",
      dateOfPurchase: "2024-09-25T11:45:00.000Z",
      quantity: 1,
      saleType: "Online",
      total: "$100",
      note: "Delivered on time",
    },
    {
      id: 7,
      orderId: "#12345684",
      purchasedBy: {
        name: "David Martinez",
        email: "david@google.com",
      },
      status: "Completed",
      dateOfPurchase: "2024-09-30T08:00:00.000Z",
      quantity: 3,
      saleType: "Complimentary",
      total: "$150",
      note: "Shipped via express",
    },
    {
      id: 8,
      orderId: "#12345685",
      purchasedBy: {
        name: "Olivia Rodriguez",
        email: "olivia123@gmail.com",
      },
      status: "Cancelled",
      dateOfPurchase: "2024-10-05T13:20:30.000Z",
      quantity: 5,
      saleType: "Online",
      total: "$500",
      note: "This is a note",
    },
  ],
};
