import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  const payload = await request.json();
  
  const response = await fetch('https://moxy.so/api/public/createOrder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();
  return json(data);
}