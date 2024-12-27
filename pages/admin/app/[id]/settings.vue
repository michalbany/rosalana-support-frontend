<script setup lang="ts">
  const { data: app } = await useApi<any>("/apps/" + useRoute().params.id, {
    method: "GET",
    fatal: true,
  });

  useHead({
    title: app?.value.name,
  });

  const tabs = ["public_profile", "notifications", "advanced"];
  const tabsIcons = ["lucide:user", "lucide:bell", "lucide:settings"];
</script>
<template>
  <NuxtLayout name="main">
    <LayoutHeader level="1" :logo="app?.icon">
      <template #title>
        {{ app?.name }}
      </template>

      <template #subtitle>
        {{ app?.description }}
      </template>
    </LayoutHeader>

    <SettingsTabs :tabs="tabs" :tabs-icons="tabsIcons">
        
    </SettingsTabs>
  </NuxtLayout>
</template>
