<script setup lang="ts">
import type { APIDataStructure } from '~/types';

  useHead({
    title: "Home",
  });

  const { data: apps } = await useApi<APIDataStructure[]>("/apps?filter[active]", {
    method: "GET",
    fatal: true,
  });

  const accordionItems = [
    {
      value: "item-1",
      title: "What is Rosalana?",
      content:
        "Rosalana is a platform that unites aplications and software under one hud. It provides a wide range of tools and features that help you manage your projects and enhance your creativity.",
    },
    {
      value: "item-2",
      title: "Why other aplications say that I already have an account?",
      content:
        "In Rosalana eco-system, you stick with one account. You can use the same account to access all aplications. We already know you, so why create another account right? That just makes things complicated 😊",
    },
    {
      value: "item-3",
      title: "Can I participate in the development of Rosalana?",
      content:
        "First of all, wait! Are you willing to work for free? Hah that was a hitch right? 😃. We are always open to new ideas and suggestions. If you have any, feel free to ring us up.",
    },
  ];
</script>
<template>
  <NuxtLayout name="main">
    <template #banner>
      <LayoutBannerContent>
        <template #title>Support & Documentation</template>
        <template #description>
          Need help with something? Check out our most frequently asked questions.
        </template>
        <div
          class="flex w-max items-center justify-self-center rounded-md border border-input bg-background px-3"
        >
          <Icon name="lucide:search" class="h-4 w-4 text-rose-500" />
          <UiInput
            class="border-none text-zinc-800 focus-visible:bg-background dark:text-white dark:focus-visible:bg-background"
            placeholder="Search"
            icon="lucide:search"
            variant="secondary"
          />
        </div>
      </LayoutBannerContent>
    </template>

    <h2 class="mt-12 text-2xl font-bold text-zinc-800 dark:text-white">Aplications</h2>

    <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <UiCard
        class="flex justify-center text-center"
        v-for="(app, i) in apps"
        :key="i"
        :title="app.attributes.name"
        :description="app.attributes.description"
        :icon="app.attributes.icon"
        @click="navigateTo('/app/' + app.id)"
      />
    </div>

    <h2 class="mt-12 text-2xl font-bold text-zinc-800 dark:text-white">General FAQs</h2>

    <UiAccordion type="single" default-value="item-2" :items="accordionItems">
      <template #trigger="{ open, item }">
        <UiAccordionTrigger
          class="text-left text-sm"
          :class="[open && 'underline underline-offset-2']"
          :title="item.title"
        >
          <template #icon>
            <Icon v-if="!open" name="lucide:plus" class="size-4 shrink-0" />
            <Icon v-else name="lucide:minus" class="size-4 shrink-0" />
          </template>
        </UiAccordionTrigger>
      </template>
    </UiAccordion>
  </NuxtLayout>
</template>
