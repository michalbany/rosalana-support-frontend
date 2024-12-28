<script setup lang="ts">
  import type { APIDataStructure, VTColumn } from "~/types";

  const props = defineProps<{
    docs: APIDataStructure[];
  }>();

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
    <template #title> Docs </template>

    <template #subtitle> Write docs for your app to help users understand how to use it. </template>

    <template #action>
      <UiButton size="sm" @click="navigateTo('/admin/doc/create')">
        <Icon name="lucide:plus" class="h-4 w-4" />
        New Doc
      </UiButton>
    </template>
  </LayoutHeader>
  <VisualTable
    class="mt-6"
    :data="docs"
    prefix="attributes"
    :columns="columns"
    :show-select="true"
  />
</template>
