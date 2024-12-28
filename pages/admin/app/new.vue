<script setup lang="ts">
import type { APIDataStructure } from '~/types';

  const form = reactive({
    name: "",
    description: "",
    icon: "",
  });

  useHead({
    title: "Register App",
  });

  const errors = ref<Record<string, string[]>>({});
  const pending = ref(false);
  const formResponse = ref<APIDataStructure | null>(null);
  const openModal = ref(false);

  const submit = async () => {
    pending.value = true;
    const payload = {
      name: form.name,
      description: form.description,
      icon: form.icon || "lucide:shield-question",
    };

    const { error, data } = await useApiRuntime<APIDataStructure>("/apps", {
      method: "POST",
      body: JSON.stringify(payload),
      store: false,
      onResponse: ({ response }) => {
        useSonner.success(response._data.message);
      },
    });

    formResponse.value = data.value;
    errors.value = error.value;
    openModal.value = true;
    pending.value = false;
  };
</script>
<template>
  <NuxtLayout name="main">
    <h1 class="mb-4 text-2xl font-bold">Register App</h1>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <SettingsForm
        @submit="submit"
        :pending="pending"
        :response="openModal"
        hide-close
        :onResponse="{ url: '/admin/app/' + formResponse?.id, label: 'View App' }"
      >
        <SettingsFormBlock
          name="name"
          :errors="errors?.name"
          description="App name may appear around Rosalana system as a unique identifier."
        >
          <UiInput v-model="form.name" id="name" class="sm:w-[400px]" />
        </SettingsFormBlock>

        <SettingsFormBlock
          name="description"
          :errors="errors?.description"
          description="App description is a brief explanation of what the app does to help users understand its purpose. It may has around 1-3 sentences."
        >
          <UiTextarea v-model="form.description" id="description" class="sm:w-[400px]" />
        </SettingsFormBlock>

        <SettingsFormBlock
          name="icon"
          :errors="errors?.icon"
          description="App icon is a visual representation of the app. It may be used in various places around Rosalana system."
        >
          <div class="flex items-center">
            <UiInput v-model="form.icon" id="icon" class="sm:w-[400px]" />
            <Icon :name="form.icon" class="ml-3 h-7 w-7 align-middle text-zinc-500" />
          </div>
        </SettingsFormBlock>

        <template #response-title> App Registered </template>

        <template #response-description> Your app has been successfully registered. </template>

        <template #response-action="{ action }">
          <CopyInput :value="formResponse?.attributes.token" @copied="() => action(true)" />
        </template>
      </SettingsForm>
      <div
        class="order-first flex items-center justify-center rounded-lg border border-dashed p-5 sm:order-last"
      >
        <div class="flex w-full flex-col items-center justify-center gap-2">
          <Icon
            class="mb-2 size-32 text-zinc-300 dark:text-zinc-700"
            :name="form.icon || 'lucide:shield-question'"
          />
          <h2 class="text-lg font-semibold">{{ form.name || "App Name" }}</h2>
          <p class="max-w-[300px] text-center text-sm text-zinc-600 dark:text-zinc-400">
            {{ form.description || "Description" }}
          </p>
        </div>
      </div>
    </div>

    <!-- <UiDialog :open="openModal">
      <UiDialogContent hide-close>
        <UiDialogTitle class="sr-only">App Registered</UiDialogTitle>
        <UiDialogDescription class="sr-only">Copy the token bellow</UiDialogDescription>
        <div class="flex items-center gap-4">
          <Icon name="lucide:shield-check" class="h-8 w-8 text-rose-500" />
          <div>
            <h2 class="text-lg font-semibold">App Registered</h2>
            <p class="text-sm text-zinc-600 dark:text-zinc-400">
              Your app has been successfully registered.
            </p>
          </div>
        </div>
        <CopyInput :value="formResponse?.token" @copied="handleUserCopiedText" />
        <div class="mt-4 flex items-center gap-4">
          <UiButton
            size="sm"
            :disabled="!appCodeCopied"
            @click="navigateTo('/admin/app/' + formResponse?.app.id)"
            >View App</UiButton
          >
          <UiButton
            size="sm"
            :disabled="!appCodeCopied"
            @click="navigateTo('/admin/app')"
            variant="secondary"
            >Go to Apps</UiButton
          >
        </div>
      </UiDialogContent>
    </UiDialog> -->

    <!-- <form @submit.prevent="submit" class="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
          <p class="max-w-[300px] text-center text-sm text-zinc-600 dark:text-zinc-400">
            {{ form.description || "Description" }}
          </p>
        </div>
      </div>
    </form> -->
  </NuxtLayout>
</template>
