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
    <LayoutHeader level="1">
      <template #title>
        {{ app?.name }}
      </template>

      <template #subtitle>
        {{ app?.description }}
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
