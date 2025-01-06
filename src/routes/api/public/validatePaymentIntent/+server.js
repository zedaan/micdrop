import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  const payload = await request.json();
  const {id, ...restPayload} = payload
  
  const response = await fetch(`https://moxy.so/api/public/validatePaymentIntent/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(restPayload)
  });

  const data = await response.json();
  return json(data);
}