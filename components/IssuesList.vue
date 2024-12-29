<script setup lang="ts">
  import type { APIDataStructure, VTColumn } from "~/types";

  const props = defineProps<{
    issues: APIDataStructure[];
  }>();

  const appID = useRoute().params.id;

  const columns: VTColumn[] = [
    {
      key: "id",
      header: "ID",
      enableSearch: false,
      hidden: true,
    },
    {
      key: "title",
      header: "Title",
    },
  ];
</script>
<template>
  <LayoutHeader level="2">
    <template #title> Issues </template>

    <template #subtitle>
      <slot name="subtitle">Issues reported by users. Be sure to fix them as soon as possible.</slot>
    </template>

    <template #action>
      <slot name="action">
        <UiButton size="sm" @click="navigateTo(`/app/${appID}/issue/new`)">
          <Icon name="lucide:plus" class="h-4 w-4" />
          New Issue
        </UiButton>
      </slot>
    </template>
  </LayoutHeader>
  <VisualTable
    class="mt-6"
    :data="issues"
    prefix="attributes"
    :columns="columns"
    :show-select="true"
  />
</template>
