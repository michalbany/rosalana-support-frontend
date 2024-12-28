<script setup lang="ts">
import type { APIDataStructure } from '~/types';

  const form = reactive({
    title: "",
    content: "",
    app_id: useRoute().params.id,
    user_id: useAuth().user?.value?.id,
  });

  const pending = ref(false);
  const errors = ref<Record<string, string[]>>({});

  const submit = async () => {
    pending.value = true;

    const {data, error } = await useApiRuntime<APIDataStructure>('/docs', {
        method: 'POST',
        body: JSON.stringify(form),
        store: false,
        onResponse: ({ response }) => {
            useSonner.success(response._data.message);
        },
    });

    errors.value = error.value;
    pending.value = false;

    if (!error.value) {
        navigateTo('/admin/app/' + form.app_id + '/doc/' + data.value?.id);
    }
  };
</script>
<template>
  <NuxtLayout name="main">
    <h1 class="mb-4 text-2xl font-bold">Create Document</h1>
    <SettingsForm @submit="submit" :pending="pending">
      <SettingsFormBlock
        :errors="errors?.title"
        name="title"
        description="The title of the document."
      >
        <UiInput v-model="form.title" id="title" class="sm:w-[400px]" />
      </SettingsFormBlock>
      <SettingsFormBlock
        :errors="errors?.content"
        name="content"
        description="The content of the document."
      >
        <TextEditor v-model="form.content" />
      </SettingsFormBlock>
    </SettingsForm>
  </NuxtLayout>
</template>
