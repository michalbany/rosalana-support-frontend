<script setup lang="ts">
  import type { APIDataStructure } from "~/types";

  const form = reactive({
    title: "",
    content: "",
    app_id: useRoute().params.id,
    user_id: useAuth().user?.value?.id,
    visibility: "public",
  });

  const visibilityOptions = [
    {
      value: "public",
      icon: "lucide:globe",
    },
    { value: "private", icon: "lucide:lock" },
  ];

  useHead({
    title: "Create Issue",
  });

  const pending = ref(false);
  const errors = ref<Record<string, string[]>>({});

  const submit = async () => {
    pending.value = true;

    const { data, error } = await useApiRuntime<APIDataStructure>("/issues", {
      method: "POST",
      body: JSON.stringify(form),
      store: false,
      onResponse: ({ response }) => {
        useSonner.success(response._data.message);
      },
    });

    errors.value = error.value;
    pending.value = false;

    if (!error.value) {
      navigateTo("/app/" + form.app_id + "/issue/" + data.value?.id);
    }
  };
</script>
<template>
  <NuxtLayout name="main">
    <h1 class="mb-4 text-2xl font-bold">Create Issue</h1>
    <SettingsForm @submit="submit" :pending="pending">
      <SettingsFormBlock
        :errors="errors?.title"
        name="title"
        description="The title of the Issue."
      >
        <UiInput v-model="form.title" id="title" class="sm:w-[400px]" />
      </SettingsFormBlock>

      <SettingsFormBlock
        :errors="errors?.visibility"
        name="visibility"
        description="Do you want let other users see this issue and react to it?"
      >
        <UiSelect v-model="form.visibility">
          <UiSelectTrigger placeholder="Select an option" class="sm:w-[200px]" />
          <UiSelectContent>
            <UiSelectItem v-for="(option, i) in visibilityOptions" :key="i" :value="option.value">
                <Icon :name="option.icon" class="mr-2 align-middle" />
              {{ textToLabel(option.value) }}
            </UiSelectItem>
          </UiSelectContent>
        </UiSelect>
      </SettingsFormBlock>

      <SettingsFormBlock
        :errors="errors?.content"
        name="content"
        description="The content of the Issue."
      >
        <TextEditor v-model="form.content" />
      </SettingsFormBlock>
    </SettingsForm>
  </NuxtLayout>
</template>
