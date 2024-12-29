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

        <div
          class="flex w-max items-center justify-self-center rounded-md border border-input bg-background px-3"
        >
          <Icon name="lucide:search" class="h-4 w-4 text-rose-500" />
          <UiInput
            class="border-none text-zinc-800 focus-visible:bg-background dark:text-white dark:focus-visible:bg-background"
            placeholder="Search"
            icon="lucide:search"
            variant="secondary"
          />
        </div>
      </LayoutBannerContent>
    </template>

    <DocList :docs="app?.relationships.docs">
      <template #subtitle> If you need help, you can check the documentation here. </template>

      <template #action>
        <!-- fix with permissions -->
        <button v-show="false" />
      </template>
    </DocList>
    <IssuesList :issues="app?.relationships.issues">
      <template #subtitle> You can create a new issue to ask for help or report a bug. </template>
    </IssuesList>
  </NuxtLayout>
</template>
