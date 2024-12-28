<script setup lang="ts">
  import type { APIDataStructure, VTColumn } from "~/types";

  const props = withDefaults(
    defineProps<{
      docs: APIDataStructure[];
      linkPrefix?: string;
    }>(),
    {
      linkPrefix: "",
    }
  );

  const appID = useRoute().params.id;

  const columns: VTColumn[] = [
    {
      key: "id",
      header: "ID",
      enableSearch: false,
      hidden: true,
    },
    {
      key: "attributes.title",
      header: "Title",
      renderAs: (item) => {
        return h(
          resolveComponent("NuxtLink"),
          {
            to: `${props.linkPrefix}/app/${item["relationships.app.id"]}/doc/${item["id"]}`,
            class: "text-primary font-semibold",
          },
          () => item["attributes.title"]
        );
      },
    },
    {
      key: "relationships.author.attributes.name",
      header: "Author",
    },
    {
      key: "attributes.status",
      header: "Status",
      enableSort: false,
      renderAs: (item) => {
        return h(
          resolveComponent("UiBadge"),
          {
            class: item["attributes.status"] === "published"
              ? "bg-rose-500/20 text-rose-500 hover:bg-rose-500/20"
              : "bg-zinc-500/20 text-zinc-500 hover:bg-zinc-500/20",
          },
          () => [
            h(resolveComponent("Icon"), {
              name: "lucide:circle",
              class: "h-2 w-2 mr-1",
            }),
            textToLabel(item["attributes.status"]),
          ]
        );
      },
    },
    {
      key: "created_at",
      header: "Created At",
      renderAs: (item) => {
        return h(
          "span",
          { class: "dark:text-zinc-500 text-zinc-400" },
          useDateFormat(item.created_at, "DD. MMMM  YYYY").value
        );
      },
    },
  ];
</script>
<template>
  <LayoutHeader level="2">
    <template #title> Docs </template>

    <template #subtitle> Write docs for your app to help users understand how to use it. </template>

    <template #action>
      <UiButton size="sm" @click="navigateTo(`${props.linkPrefix}/app/${appID}/doc/new`)">
        <Icon name="lucide:plus" class="h-4 w-4" />
        New Doc
      </UiButton>
    </template>
  </LayoutHeader>
  <VisualTable class="mt-6" :data="docs" flat-data :columns="columns" :show-select="true" />
</template>
