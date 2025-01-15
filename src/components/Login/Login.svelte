<script lang="ts">
  import { writable } from "svelte/store";
  import { goto } from "$app/navigation";
  import { Input, Label, Button, Checkbox } from "flowbite-svelte";

  const authError = writable("");
  const email = writable("");
  const password = writable("");
  let rememberMe = false;

  async function handleSubmit(event: Event) {
    event.preventDefault();
    authError.set("");
    const emailValue = $email;
    const passwordValue = $password;

    if (!emailValue || !passwordValue) {
      authError.set("Email and Password are required");
      return;
    }

    try {
      const response = await fetch("https://moxy.so/api/public/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        authError.set(errorData?.message || "Login failed");
        return;
      }

      const data = await response.json();
      const token = data.token;
      localStorage.setItem("token", token);
      // Uncomment the next line when ready to redirect
      goto("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);
      authError.set("An error occurred while logging in");
    }
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
    <div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Welcome back
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Please enter your details
      </p>
    </div>
    <form class="mt-8 space-y-6" on:submit={handleSubmit}>
      <div class="rounded-md shadow-sm -space-y-px">
        <div class="mb-4">
          <Label for="email" class="sr-only">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Email address"
            required
            bind:value={$email}
          />
        </div>
        <div class="mt-4">
          <Label for="password" class="sr-only">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            required
            bind:value={$password}
          />
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <Checkbox id="remember-me" bind:checked={rememberMe} />
          <Label for="remember-me" class="ml-2 block text-sm text-gray-900">
            Remember me
          </Label>
        </div>

        <div class="text-sm">
          <a href="/forget" class="font-medium text-primary-600 hover:text-primary-500">
            Forgot your password?
          </a>
        </div>
      </div>

      <div>
        <Button type="submit" class="w-full">
          Sign in
        </Button>
      </div>

      {#if $authError}
        <p class="mt-2 text-center text-sm text-red-600" role="alert">
          {$authError}
        </p>
      {/if}
    </form>
  </div>
</div>