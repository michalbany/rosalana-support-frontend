<script setup lang="ts">
  const props = defineProps<{
    app: any;
  }>();

  const responseStore = useResponseStore();

  const form = reactive({
    name: props.app.name,
    description: props.app.description,
    icon: props.app.icon,
  });

  const errors = ref<Record<string, string[]>>({});
  const pending = ref(false);

  const submit = async () => {
    pending.value = true;

    const payload = {
      name: form.name,
      description: form.description,
      icon: form.icon,
    };
    if (form.icon === "") {
        payload.icon = 'lucide:shield-question';
    }

    const { error, data } = await useApiRuntime<any>(`/apps/${props.app.id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
      store: false,
      onResponse: ({ response }) => {
        useSonner.success(response._data.message);
        responseStore.update(response._data);
      },
    });

    errors.value = error.value;
    pending.value = false;
  };
</script>
<template>
  <SettingsForm @submit="submit" :pending="pending">
    <SettingsFormBlock
      name="name"
      :errors="errors?.name"
      description="App name may appear around Rosalana system as a unique identifier."
    >
      <UiInput v-model="form.name" id="name" class="sm:w-[400px]" />
    </SettingsFormBlock>

    <SettingsFormBlock
      name="description"
      :errors="errors?.description"
      description="App description is a brief explanation of what the app does to help users understand its purpose. It may has around 1-3 sentences."
    >
      <UiTextarea v-model="form.description" id="description" class="sm:w-[400px]" />
    </SettingsFormBlock>

    <SettingsFormBlock
      name="icon"
      :errors="errors?.icon"
      description="App icon is a visual representation of the app. It may be used in various places around Rosalana system."
    >
      <div class="flex items-center">
        <UiInput v-model="form.icon" id="icon" class="sm:w-[400px]" />
        <Icon :name="form.icon" class="ml-3 h-7 w-7 align-middle text-zinc-500" />
      </div>
    </SettingsFormBlock>
  </SettingsForm>
</template>
