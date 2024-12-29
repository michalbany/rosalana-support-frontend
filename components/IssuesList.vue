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
      key: "attributes.title",
      header: "Title",
      renderAs: (item) => {
        return h(
          resolveComponent("NuxtLink"),
          {
            to: "/app/" + appID + "/issue/" + item["id"],
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
      header: "Tags",
      enableSort: false,
      renderAs: (item) => {
        const status = h(
          resolveComponent("UiBadge"),
          {
            class:
              item["attributes.status"] === "solved"
                ? "bg-rose-500/20 text-rose-500 hover:bg-rose-500/20"
                : item["attributes.status"] === "open"
                  ? "bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/20"
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
        const visibility = h(
          resolveComponent("UiBadge"),
          {
            class:
              item["attributes.visibility"] === "public"
                ? "bg-orange-500/20 text-orange-500 hover:bg-orange-500/20"
                : "bg-zinc-500/20 text-zinc-500 hover:bg-zinc-500/20",
          },
          () => [
            h(resolveComponent("Icon"), {
              name: "lucide:circle",
              class: "h-2 w-2 mr-1",
            }),
            textToLabel(item["attributes.visibility"]),
          ]
        );

        return h("div", { class: "flex items-center gap-2" }, [status, visibility]);
      },
    },
    {
      key: "attributes.created_at",
      header: "Created At",
      renderAs: (item) => {
        return h(
          "span",
          { class: "dark:text-zinc-500 text-zinc-400" },
          useDateFormat(item['attributes.created_at'], "DD. MMMM  YYYY").value
        );
      },
    },
  ];
</script>
<template>
  <LayoutHeader level="2">
    <template #title> Issues </template>

    <template #subtitle>
      <slot name="subtitle"
        >Issues reported by users. Be sure to fix them as soon as possible.</slot
      >
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
  <VisualTable class="mt-6" :data="issues" flat-data :columns="columns" :show-select="true" />
</template>
