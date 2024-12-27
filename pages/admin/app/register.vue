<script setup lang="ts">
  const form = reactive({
    name: "",
    description: "",
    icon: "",
  });

  const errors = ref<Record<string, string[]>>({});
  const pending = ref(false);
  const appCodeCopied = ref(false);
  const formResponse = ref<any>({});
  const openModal = ref(false);

  const submit = async () => {
    pending.value = true;
    const payload = {
        name: form.name,
        description: form.description,
    };
    if (form.icon !== "") {
        Object.assign(payload, { icon: form.icon });
    }

    const { error, data } = await useApiRuntime<any>('/apps', {
        method: 'POST',
        body: JSON.stringify(payload),
        store: false,
        onResponse: ({response}) => {
            useSonner.success(response._data.message);
            openModal.value = true;
        },
    });

    formResponse.value = data.value;
    errors.value = error.value;
    pending.value = false;
  };

  const handleSelectIcon = (icon: string) => {
    if (form.icon === icon) {
      form.icon = "";
    } else {
      form.icon = icon;
    }
  };

  const handleUserCopiedText = () => {
    appCodeCopied.value = true;
  }
</script>
<template>
  <NuxtLayout name="main">
    <h1 class="mb-4 text-2xl font-bold">Register App</h1>

    <UiDialog :open="openModal">
        <UiDialogContent hide-close>
            <UiDialogTitle class="sr-only">App Registered</UiDialogTitle>
            <UiDialogDescription class="sr-only">Copy the token bellow</UiDialogDescription>
            <div class="flex items-center gap-4">
                <Icon name="lucide:shield-check" class="h-8 w-8 text-rose-500" />
                <div>
                    <h2 class="text-lg font-semibold">App Registered</h2>
                    <p class="text-sm text-zinc-600 dark:text-zinc-400">Your app has been successfully registered.</p>
                </div>
            </div>
            <CopyInput :value="formResponse?.token" @copied="handleUserCopiedText" />
            <div class="mt-4 flex items-center gap-4">
                <UiButton size="sm" :disabled="!appCodeCopied" @click="navigateTo('/admin/app/' + formResponse?.app.id)">View App</UiButton>
                <UiButton size="sm" :disabled="!appCodeCopied" @click="navigateTo('/admin')" variant="secondary">Go to Dashboard</UiButton>
            </div>
        </UiDialogContent>
    </UiDialog>

    <form @submit.prevent="submit" class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div class="flex flex-col gap-4">
        <div>
          <UiInput type="text" v-model="form.name" placeholder="App Name" />
          <UiErrorText :error="errors?.name" />
        </div>
        <div>
          <UiTextarea v-model="form.description" placeholder="Description" />
          <UiErrorText :error="errors?.description" />
        </div>
        <div class="mt-4 flex w-full gap-4">
          <div
            v-for="icon in appLogos()"
            :key="icon"
            @click="handleSelectIcon(icon)"
            class="cursor-pointer rounded-lg border p-2 transition-colors hover:bg-border"
            :class="{ 'bg-border': form.icon === icon }"
          >
            <Icon :name="icon" class="block h-6 w-6" />
          </div>
        </div>
        <UiErrorText :error="errors?.icon" />

        <div class="mt-4 flex items-center gap-4">
          <UiButton type="submit" :disabled="pending">Register</UiButton>
          <UiButton type="button" variant="link" @click="navigateTo('/admin')">Cancel</UiButton>
        </div>
      </div>
      <div
        class="order-first flex items-center justify-center rounded-lg border border-dashed p-5 sm:order-last"
      >
        <div class="flex w-full flex-col items-center justify-center gap-2">
          <Icon
            class="mb-2 size-32 text-zinc-300 dark:text-zinc-700"
            :name="form.icon || 'lucide:shield-question'"
          />
          <h2 class="text-lg font-semibold">{{ form.name || "App Name" }}</h2>
          <p class="text-sm text-zinc-600 dark:text-zinc-400 max-w-[300px] text-center">
            {{ form.description || "Description" }}
          </p>
        </div>
      </div>
    </form>
  </NuxtLayout>
</template>
