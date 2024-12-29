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
      </LayoutBannerContent>
    </template>

    <UiAlert
      v-for="(error, i) in app?.attributes.warnings"
      :key="i"
      class="p-3"
      icon="lucide:alert-circle"
      :description="error"
      variant="warning"
    />

    <DocList :docs="app?.relationships.docs">
      <template #subtitle> If you need help, you can check the documentation here. </template>

      <template #action>
        <!-- fix with permissions -->
        <button v-show="false" />
      </template>
    </DocList>
    <IssuesList :issues="app?.relationships.issues">
        <template #subtitle>
            You can create a new issue to ask for help or report a bug.
        </template>
    </IssuesList>
  </NuxtLayout>
</template>
