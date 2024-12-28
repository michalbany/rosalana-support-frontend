<script setup lang="ts">
  import { useDateFormat } from "@vueuse/core";
  import type { VTColumn } from "~/types";

  useHead({
    title: "All Apps",
  });

  const { data: apps } = await useApi<any>("/apps", {
    method: "GET",
  });

  const columns: VTColumn[] = [
    {
      key: "id",
      header: "ID",
      enableSearch: false,
      hidden: true,
    },
    {
      key: "name",
      header: "App Name",
      enableToggle: false,
      renderAs: (item) => {
        return h(
          resolveComponent("NuxtLink"),
          { to: `/admin/app/${item.id}`, class: "text-primary font-semibold" },
          () => item.name
        );
      },
    },
    {
      key: "description",
      header: "Description",
      renderAs: (item) =>
        h("span", { class: "dark:text-zinc-500 text-zinc-400" }, item.description),
    },
    {
      key: "active",
      header: "Status",
      renderAs: (item) => {
        const active = h(
          resolveComponent("UiBadge"),
          {
            class: item.active
              ? "bg-rose-500/20 text-rose-500 hover:bg-rose-500/20"
              : "bg-zinc-500/20 text-zinc-500 hover:bg-zinc-500/20",
          },
          () => [
            h(resolveComponent("Icon"), {
              name: "lucide:circle",
              class: "h-2 w-2 mr-1",
            }),
            item.active ? "Online" : "Offline",
          ]
        );

        const master = h(
          resolveComponent("UiBadge"),
          {
            class: "bg-orange-500/20 text-orange-500 hover:bg-orange-500/20",
          },
          () => [
            h(resolveComponent("Icon"), {
              name: "lucide:circle",
              class: "h-2 w-2 mr-1",
            }),
            "Master",
          ]
        );

        const badges = item.master ? [active, master] : [active];
        return h("div", { class: "flex items-center gap-2" }, badges);
      },
    },
    {
      key: "created_at",
      header: "Created At",
      renderAs: (item) => {
        return h(
          "span",
          { class: "dark:text-zinc-500 text-zinc-400" },
          useDateFormat(item.created_at, 'DD. MMMM  YYYY').value
        );
      },
    },
  ];
</script>
<template>
  <NuxtLayout name="main">
    <div class="mt-12 flex items-center justify-between">
      <h2 class="text-2xl font-bold text-zinc-800 dark:text-white">Aplications</h2>

      <UiButton size="sm" @click="navigateTo('/admin/app/register')">
        <Icon name="lucide:plus" class="h-4 w-4" />
        New App
      </UiButton>
    </div>
    <VisualTable class="mt-6" :data="apps" :columns="columns" :show-select="true" />
  </NuxtLayout>
</template>
