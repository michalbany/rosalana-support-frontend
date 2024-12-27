<script setup lang="ts">
  useHead({
    title: "Login",
  });

  const form = reactive({
    email: "",
    password: "",
  });

  const pending = ref(false);
  const errors = ref<Record<string, string[]>>({});
  const lastVisitedPage = useActivity().activity().last()?.path;

  const submit = async () => {
    pending.value = true;
    const {error, data } = await useAuth().login(form);
    errors.value = error.value;
    pending.value = false;
    if (!error.value) {
      if (lastVisitedPage) {
        navigateTo(lastVisitedPage);
      } else {
        navigateTo("/");
      }
    }
  };
</script>
<template>
  <NuxtLayout name="auth">
    <template #title>
      <h1 class="text-3xl font-bold">Login</h1>
      <p class="text-xs">Welcome back! Please login to your account.</p>
    </template>
    <form class="flex flex-col gap-4" @submit.prevent="submit">
      <div>
        <UiInput type="text" v-model="form.email" placeholder="Email" />
        <UiErrorText :error="errors?.email" />
      </div>
      <div>
        <UiInput type="password" v-model="form.password" placeholder="Password" />
        <UiErrorText :error="errors?.password" />
      </div>
      <div class="flex items-center justify-between gap-6">
        <div class="flex items-center gap-2">
          <UiCheckbox disabled id="remember-me" />
          <UiLabel for="remember-me" class="text-xs">Remember me</UiLabel>
        </div>
        <UiButton disabled type="button" variant="link" size="sm" class="h-auto p-0 text-xs"
          >Forget password?</UiButton
        >
      </div>

      <UiButton type="submit" :disabled="pending">Login</UiButton>

      <UiButton
        type="button"
        variant="link"
        size="sm"
        class="h-auto p-0 text-xs"
        @click="navigateTo('/auth/register')"
        >Don't have an account?</UiButton
      >
    </form>
  </NuxtLayout>
</template>
