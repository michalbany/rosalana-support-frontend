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
  const errors = ref<Record<string, string[]>>({});
  const lastVisitedPage = useActivity().activity().last()?.path;

  const submit = async () => {
    pending.value = true;
    const { error, data } = await useAuth().register(form);
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
      <h1 class="text-3xl font-bold">Register</h1>
      <p class="text-xs">Create an account to get started.</p>
    </template>

    <form class="flex flex-col gap-4" @submit.prevent="submit">
      <div>
        <UiInput type="text" v-model="form.name" placeholder="Name" />
        <UiErrorText :error="errors?.name" />
      </div>
      <div>
        <UiInput type="email" v-model="form.email" placeholder="Email" />
        <UiErrorText :error="errors?.email" />
      </div>
      <div>
        <UiInput type="password" v-model="form.password" placeholder="Password" />
        <UiErrorText :error="errors?.password" />
      </div>
      <div>
        <UiInput
          type="password"
          v-model="form.password_confirmation"
          placeholder="Password Confirmation"
        />
        <UiErrorText :error="errors?.password_confirmation" />
      </div>

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
