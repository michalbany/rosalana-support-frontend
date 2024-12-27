<script setup lang="ts">
  const { data: app } = await useApi<any>("/apps/" + useRoute().params.id, {
    method: "GET",
    fatal: true,
  });

  useHead({
    title: app?.value.name,
  });
</script>
<template>
  <NuxtLayout name="main">
    <template #banner>
      <BannerContent>
        <template #title>{{ app?.name }}</template>
        <template #description>
          {{ app?.description }}
        </template>
        <UiButton size="sm" variant="secondary">
          <Icon name="lucide:settings" class="h-4 w-4" />
          Settings
        </UiButton>
      </BannerContent>
    </template>
  </NuxtLayout>
</template>
