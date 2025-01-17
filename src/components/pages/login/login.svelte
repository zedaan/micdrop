<script lang="ts">
  import { writable } from "svelte/store";
  import { goto } from "$app/navigation";
  import Input from "@components/Input/Input.svelte";
  import SideImage from "../../../assets/images/Frame.png"
  import Toplogo from "../../../assets/images/image_68.png"
  import { Label } from "flowbite-svelte";
  import { Checkbox } from 'flowbite-svelte';
  import Button from "@components/Button/Button.svelte";
  
  const authError = writable("");
  const email = writable("");
  const password = writable("");

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
      const response = await fetch("./../../api/public/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        authError.set(data.error || "Login failed");
        return;
      }

      const token = data.token;
      localStorage.setItem("token", token);
      goto("/orders");
    } catch (error) {
      console.error("Login Error:", error);
      authError.set("An error occurred while logging in");
    }
  }

  async function handleLoginLink() {
    if (!$email) {
      authError.set("Please enter your email address");
      return;
    }

    try {
      const response = await fetch("./../../api/public/login-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: $email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        authError.set(data.error || "Failed to send login link");
        return;
      }

      authError.set("Login link has been sent to your email");
    } catch (error) {
      console.error("Login Link Error:", error);
      authError.set("An error occurred while sending login link");
    }
  }
</script>

<div
  class="min-h-screen flex items-center justify-center bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8"
>
  <div class="max-w-7xl w-full flex gap-12 items-center">
      <div class="flex-1 w-full space-y-6 bg-white p-10 rounded-2xl">
        <div class="space-y-6">
          <div class="flex items-center space-x-2">
             <img src= {Toplogo} alt="toplogo"/>
          </div>
          <h2 class="text-2xl font-norma text-Text-Primary">
            Login to Micdrop
          </h2>
        </div>

        <form class="space-y-6" on:submit={handleSubmit}>
          <div class="space-y-5">
            <div>
              <div class="mb-6">
                <Label for="default-input" class="block mb-2"
                  >Email address</Label
                >
                <Input
                  className="font-normal text-sm text-gray-500"
                  size="full"
                  id="default-input"
                  placeholder="John Doe"
                  bind:value={$email}
                />
                <!-- {#if errors?.Email}
                  <p class="text-red-500 text-sm mt-1">{errors.Email}</p>
                {/if} -->
              </div>
            </div>
            
            <div>
              <div class="mb-6">
                <Label for="default-input" class="block mb-2"
                  >Password</Label
                >
                <Input
                  className="font-normal text-sm text-gray-500"
                  size="full"
                  id="default-input"
                  placeholder="********** "
                  bind:value={$password}
                  type="password"
                />
                <!-- {#if errors?.Email}
                  <p class="text-red-500 text-sm mt-1">{errors.Email}</p>
                {/if} -->
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <Checkbox 
              checked
              id="remember-me"
              class=" text-Text-Tartiary"
              >Remember me</Checkbox>
            </div>

            <a
              href="/forgot-password"
              class="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              Forgot password?
            </a>
          </div>

          {#if $authError}
            <p
              class="text-sm text-red-600 bg-red-50 p-3 rounded-md"
              role="alert"
            >
              {$authError}
            </p>
          {/if}

          <div class="space-y-4">
            <Button
                
                class="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                size="xl"
                on:click={handleLoginLink}
                type="submit"
                >Login</Button
              >

            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-200"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-[#F8FAFC] text-gray-500">or</span>
              </div>
            </div>
            <Button
                strokebtn
                class="w-full flex justify-center py-3.5 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                size="full"
                on:click={handleLoginLink}
                >Email me a login link</Button
              >
          </div>
        </form>
      </div>

    <div class="hidden lg:flex flex-1 justify-center">
      <div class="relative w-full max-w-lg">
        <img
          src={SideImage}
          alt="Login illustration"
          
        />
      </div>
    </div>
  </div>
</div>

<style>
  :global(body) {
    background-color: #f8fafc;
  }
</style>
