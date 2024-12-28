<script setup lang="ts">
  const { data: app } = await useApi<any>("/apps/" + useRoute().params.id, {
    method: "GET",
    fatal: true,
    store: true,
  });

  useHead({
    title: app?.value.name,
  });

  const tabs = [
    "public_profile",
    "[X]notifications",
    "[X]users",
    "[X]database",
    "[X]public_api",
    "[X]sessions",
    "advanced",
  ];
  const tabsIcons = [
    "lucide:layout-panel-top",
    "lucide:bell",
    "lucide:users",
    "lucide:database",
    "lucide:waypoints",
    "lucide:wind",
    "lucide:settings",
  ];
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

      <template #action>
        <UiButton variant="link" size="sm" :to="`/admin/app`"> All Apps </UiButton>
      </template>
    </LayoutHeader>

    <SettingsTabs :tabs="tabs" :tabs-icons="tabsIcons">
      <template #public_profile>
        <SettingsAppProfileTab :app="app" />
      </template>

      <template #advanced>
        <SettingsAppAdvancedTab :app="app" />
      </template>
    </SettingsTabs>
  </NuxtLayout>
</template>
