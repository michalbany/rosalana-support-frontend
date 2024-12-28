<script setup lang="ts">
import type { APIDataStructure } from '~/types';

  const { data: app } = await useApi<APIDataStructure>("/apps/" + useRoute().params.id, {
    method: "GET",
    fatal: true,
  });

  useHead({
    title: app?.value?.attributes.name,
  });
</script>
<template>
  <NuxtLayout name="main">
    <LayoutHeader level="1">
      <template #title>
        {{ app?.attributes.name }}
      </template>

      <template #subtitle>
        {{ app?.attributes.description }}
      </template>

      <template #action>
        <UiButton size="sm" @click="navigateTo('/admin/app/' + app?.id + '/settings')">
          <Icon name="lucide:settings" class="h-4 w-4" />
          Options
        </UiButton>
      </template>
    </LayoutHeader>
  </NuxtLayout>
</template>
