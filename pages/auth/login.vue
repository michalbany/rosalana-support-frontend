<script setup lang="ts">
  useHead({
    title: "Login",
  });

  const form = reactive({
    email: "",
    password: "",
  });

  const submit = () => {
    useAuth().login(form);
    navigateTo("/");
  };
</script>
<template>
  <NuxtLayout name="auth">
    <template #title>
      <h1 class="text-3xl font-bold">Login</h1>
      <p class="text-xs">Welcome back! Please login to your account.</p>
    </template>

    <form class="flex flex-col gap-4" @submit.prevent="submit">
      <UiInput type="email" v-model="form.email" placeholder="Email" />
      <UiInput type="password" v-model="form.password" placeholder="Password" />

      <div class="flex items-center justify-between gap-6">
        <div class="flex items-center gap-2">
          <UiCheckbox disabled id="remember-me" />
          <UiLabel for="remember-me" class="text-xs">Remember me</UiLabel>
        </div>
        <UiButton disabled type="button" variant="link" size="sm" class="h-auto p-0 text-xs"
          >Forget password?</UiButton
        >
      </div>

      <UiButton type="submit">Login</UiButton>
    </form>

  </NuxtLayout>
</template>
