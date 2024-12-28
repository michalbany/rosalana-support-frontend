<script setup lang="ts">
  import type { APIDataStructure } from "~/types";

  const { data: doc } = await useApi<APIDataStructure>("/docs/" + useRoute().params.id, {
    method: "GET",
    fatal: true,
  });

  useHead({
    title: doc?.value?.attributes.title,
  });
</script>
<template>
  <NuxtLayout name="main">
    <template #banner>
      <LayoutBannerContent>
        <template #title>{{ doc?.attributes.title }}</template>
        <UiBadge :variant="doc?.attributes.status === 'published' ? 'default' : 'secondary'">
          <Icon name="lucide:circle" class="mr-1 h-2 w-2" />
          {{ textToLabel(doc?.attributes.status) }}
        </UiBadge>
      </LayoutBannerContent>
    </template>

    <MDView :content="doc?.attributes.content" />
  </NuxtLayout>
</template>
