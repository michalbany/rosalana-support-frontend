<script setup lang="ts">
  import type { ApiResponse } from "~/types";

  const config = useRuntimeConfig();
  const { data: app } = await useFetch<ApiResponse>("/apps/" + useRoute().params.id, {
    method: "GET",
    credentials: "include",
    baseURL: config.public.apiBaseUrl,
    headers: {
      Accept: "application/json",
    },
  });
</script>
<template>
  <NuxtLayout name="main">
    <template #banner>
      <BannerContent>
        <template #title>{{ app?.data.name }}</template>
        <template #description>
          {{ app?.data.description }}
        </template>
        <UiButton size="sm" variant="secondary">
          <Icon name="lucide:settings" class="h-4 w-4" />
          Settings
        </UiButton>
      </BannerContent>
    </template>
  </NuxtLayout>
</template>
