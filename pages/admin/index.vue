<script setup lang="ts">
  useHead({
    title: "Admin",
  });

  const { data: apps } = await useApi<any>("/apps", {
    method: "GET",
    fatal: true,
  });

  const computedApps = computed(() => {
    return apps.value.filter((app: any) => app.active).slice(0, 4);
  });
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

      <UiButton size="sm" @click="navigateTo('/admin/app/register')">
        <Icon name="lucide:plus" class="h-4 w-4" />
        New App
      </UiButton>
    </div>

    <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <UiCard
        class="flex justify-center text-center"
        v-for="(app, i) in computedApps"
        :key="i"
        :title="app.name"
        :description="app.description"
        :icon="app.icon"
        :badge="app.active"
        @click="navigateTo('/admin/app/' + app.id)"
      />
    </div>
    <UiButton size="sm" variant="link" @click="navigateTo('/admin/app')"> View All </UiButton>
  </NuxtLayout>
</template>
