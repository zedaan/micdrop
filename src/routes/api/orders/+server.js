import {OrdersData} from "./orders";
export function GET() {
  return new Response(JSON.stringify(OrdersData), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
