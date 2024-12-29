<script setup lang="ts">
  import type { APIDataStructure } from "~/types";

  const { data: doc } = await useApi<APIDataStructure>("/docs/" + useRoute().params.id_1, {
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
        <template #description>
          Written by {{ doc?.relationships.author?.attributes.name }}
        </template>
        <UiBadge :variant="doc?.attributes.status === 'published' ? 'default' : 'secondary'">
          <Icon name="lucide:circle" class="mr-1 h-2 w-2" />
          {{ textToLabel(doc?.attributes.status) }}
          {{
            doc?.attributes.published_at
              ? "at " + useDateFormat(doc?.attributes.published_at, "DD. MMMM  YYYY").value
              : ""
          }}
        </UiBadge>
      </LayoutBannerContent>
    </template>
    <MDView :content="doc?.attributes.content" />

    <!-- footer -->
    <div class="w-full">
      <div class="flex items-center justify-between p-3 hover:bg-muted/20">
        <div class="flex items-center gap-2">
          <Icon name="lucide:calendar" class="h-4 w-4" />
          <span>{{ useDateFormat(doc?.attributes.created_at, "MMMM DD, YYYY") }}</span>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
