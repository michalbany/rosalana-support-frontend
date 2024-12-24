<script setup lang="ts">
  useHead({
    title: "Register",
  });

  const form = reactive({
    email: "",
    password: "",
    name: "",
    password_confirmation: "",
  });

  const pending = ref(false);

  const submit = async () => {
    pending.value = true;
    const [status, response] = await useAuth().register(form);
    pending.value = false;
    if (status) {
      if (lastVisited) {
        navigateTo(lastVisited);
      } else {
        navigateTo("/");
      }
    }
  };

  let lastVisited: string | undefined;

  onMounted(() => {
    if (import.meta.client && typeof localStorage !== "undefined") {
      lastVisited = useActivity().activity().last()?.path;
    }
  });
</script>
<template>
  <NuxtLayout name="auth">
    <template #title>
      <h1 class="text-3xl font-bold">Register</h1>
      <p class="text-xs">Create an account to get started.</p>
    </template>

    <form class="flex flex-col gap-4" @submit.prevent="submit">
      <UiInput type="text" v-model="form.name" placeholder="Name" />
      <UiInput type="email" v-model="form.email" placeholder="Email" />
      <UiInput type="password" v-model="form.password" placeholder="Password" />
      <UiInput
        type="password"
        v-model="form.password_confirmation"
        placeholder="Password Confirmation"
      />

      <UiButton type="submit" :disabled="pending">Register</UiButton>
      <UiButton
        @click="navigateTo('/auth/login')"
        type="button"
        variant="link"
        size="sm"
        class="h-auto p-0 text-xs"
        >Already have an account?</UiButton
      >
    </form>
  </NuxtLayout>
</template>
