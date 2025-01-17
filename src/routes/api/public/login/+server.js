import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  const { email, password } = await request.json();
  
  try {
    const response = await fetch('https:/moxy.so/api/public/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      return json({ error: data.message || 'Login failed' }, { status: response.status });
    }

    return json({ token: data.token });
  } catch (error) {
    console.error('Login Error:', error);
    return json({ error: 'An error occurred while logging in' }, { status: 500 });
  }
}