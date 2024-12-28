<script setup lang="ts">
  import type { APIDataStructure } from "~/types";

  const { data: doc } = await useApi<APIDataStructure>("/docs/" + useRoute().params.id, {
    method: "GET",
    fatal: true,
    store: true,
  });

  const responseStore = useResponseStore();

  useHead({
    title: doc?.value?.attributes.title,
  });

  const active = computed(() => {
    if (doc.value?.attributes.status === "published") {
      return {
        text: "Draft",
        icon: "lucide:globe-lock",
        variant: "secondary" as "secondary" | "default",
        value: "draft",
      };
    } else {
      return {
        text: "Publish",
        icon: "lucide:globe",
        variant: "default" as "secondary" | "default",
        value: "published",
      };
    }
  });

  const pendingState = ref(false);
  const pendingDelete = ref(false);
  const confirmModal = ref(false);

  const dropdownItems = [
    {
      title: active.value.text,
      icon: active.value.icon,
      click: () => submitState(),
      class: "sm:hidden",
      disabled: pendingState.value,
    },
    {
      title: "Edit",
      icon: "lucide:pencil",
      click: () => null,
    },
    {
      title: "Delete",
      icon: "lucide:trash",
      click: () => (confirmModal.value = true),
    },
  ];

  const submitState = async () => {
    pendingState.value = true;

    const { data, error } = await useApiRuntime<APIDataStructure>("/docs/" + doc.value?.id, {
      method: "PATCH",
      body: JSON.stringify({
        status: active.value.value,
      }),
      store: false,
      onResponse: ({ response }) => {
        useSonner.success(response._data.message);
        responseStore.update(response._data);
      },
    });

    pendingState.value = false;
  };

  const submitDelete = async () => {
    pendingDelete.value = true;

    const { error } = await useApiRuntime<APIDataStructure>("/docs/" + doc.value?.id, {
      method: "DELETE",
      store: false,
      onResponse: ({ response }) => {
        useSonner.success(response._data.message);
      },
    });
    navigateTo("/admin/app/" + doc.value?.relationships.app.id);

    pendingDelete.value = false;
  };
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

        <div class="flex items-center gap-2">
          <UiButton
            size="sm"
            :variant="active.variant"
            class="hidden sm:flex"
            @click="submitState()"
          >
            <Icon :name="active.icon" class="h-4 w-4" />
            {{ active.text }}
          </UiButton>

          <ActionDropdown :items="dropdownItems" />
        </div>
      </div>
    </div>

    <UiDialog :open="confirmModal" @update:open="(value) => (confirmModal = value)">
      <UiDialogContent hide-close>
        <UiDialogTitle class="sr-only">Confirm Modal</UiDialogTitle>
        <UiDialogDescription class="sr-only">Confirm your action</UiDialogDescription>
        <div class="flex items-center gap-4">
          <span class="text-3xl font-semibold text-primary">?</span>
          <div>
            <h2 class="text-lg font-semibold">Are you sure?</h2>
            <p class="text-sm text-zinc-600 dark:text-zinc-400">
                Are you sure you want to delete this document?
            </p>
          </div>
        </div>
        <div class="mt-4 flex items-center gap-4">
          <UiButton @click="confirmModal = false" class="w-min"> Close </UiButton>
          <UiButton
            @click="
              submitDelete();
              confirmModal = false;
            "
            class="w-min"
            variant="secondary"
          >
            Confirm
          </UiButton>
        </div>
      </UiDialogContent>
    </UiDialog>
  </NuxtLayout>
</template>
