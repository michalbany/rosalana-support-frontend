<script setup lang="ts">
import type { APIDataStructure } from '~/types';

  useHead({
    title: "Admin",
  });

  const { data: apps } = await useApi<APIDataStructure[]>("/apps?filter[active]", {
    method: "GET",
    fatal: true,
  });

  const computedApp = computed(() => {
    return apps.value?.slice(0, 4);
  })
</script>
<template>
  <NuxtLayout name="main">
    <template #banner>
      <LayoutBannerContent>
        <template #title>Admin Dashboard</template>
        <template #description> Manage your applications and users. </template>
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

    <div class="mt-12 flex items-center justify-between">
      <h2 class="text-2xl font-bold text-zinc-800 dark:text-white cursor-pointer" @click="navigateTo('/admin/app')">Aplications</h2>

      <UiButton size="sm" @click="navigateTo('/admin/app/new')">
        <Icon name="lucide:plus" class="h-4 w-4" />
        New App
      </UiButton>
    </div>

    <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <UiCard
        class="flex justify-center text-center"
        v-for="(app, i) in computedApp"
        :key="i"
        :title="app.attributes.name"
        :description="app.attributes.description"
        :icon="app.attributes.icon"
        :badge="app.attributes.active"
        @click="navigateTo('/admin/app/' + app.id)"
      />
    </div>
    <UiButton size="sm" variant="link" @click="navigateTo('/admin/app')"> View All </UiButton>

    <div v-for="app in apps" :key="app.id">
        <UiAlert
        v-for="(error, i) in app.attributes.warnings"
        :key="i"
        class="p-3"
        icon="lucide:alert-circle"
        :description="error"
        variant="warning"
        />
    </div>
  </NuxtLayout>
</template>
