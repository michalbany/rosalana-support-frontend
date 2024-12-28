<script setup lang="ts">
  import type { APIDataStructure } from "~/types";

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
    <template #banner>
      <LayoutBannerContent>
        <template #title>{{ app?.attributes.name }}</template>
        <template #description>{{ app?.attributes.description }}</template>
        <UiButton @click="navigateTo('/admin/app/' + app?.id + '/settings')">
          <Icon name="lucide:settings" class="h-4 w-4" />
          Options
        </UiButton>
      </LayoutBannerContent>
    </template>

    <DocList :docs="app?.relationships.docs" link-prefix="/admin" />
    <IssuesList :issues="app?.relationships.issues" />

  </NuxtLayout>
</template>
