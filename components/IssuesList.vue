<script setup lang="ts">
  import type { APIDataStructure, VTColumn } from "~/types";

  const props = defineProps<{
    issues: APIDataStructure[];
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
    <template #title> Issues </template>

    <template #subtitle>
      Issues reported by users. Be sure to fix them as soon as possible.
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
