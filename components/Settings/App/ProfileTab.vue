<script setup lang="ts">
  const props = defineProps<{
    app: any;
  }>();

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
    };
    if (form.icon !== "") {
      Object.assign(payload, { icon: form.icon });
    }

    const { error, data } = await useApiRuntime<any>(`/apps/${props.app.id}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
        store: false,
        onResponse: ({response}) => {
            useSonner.success(response._data.message);
        },
    });

    errors.value = error.value;
    pending.value = false;
  };

  const handleSelectIcon = (icon: string) => {
    if (form.icon === icon) {
      form.icon = "";
    } else {
      form.icon = icon;
    }
  };
</script>
<template>
  <form @submit.prevent="submit" class="flex flex-col gap-5">
    <div class="space-y-2">
      <div>
        <UiLabel class="font-semibold" for="name">Name</UiLabel>
        <p class="text-xs text-zinc-500 sm:w-[550px]">
          App name may appear around Rosalana system as a unique identifier.
        </p>
      </div>
      <UiInput v-model="form.name" id="name" class="sm:w-[400px]" />
      <UiErrorText class="block" :error="errors?.name" />
    </div>

    <div class="space-y-2">
      <div>
        <UiLabel class="font-semibold" for="description">Description</UiLabel>
        <p class="text-xs text-zinc-500 sm:w-[550px]">
          App description is a brief explanation of what the app does to help users understand its
          purpose. It may has around 1-3 sentences.
        </p>
      </div>
      <UiTextarea v-model="form.description" id="description" class="sm:w-[400px]" />
      <UiErrorText class="block" :error="errors?.description" />
    </div>

    <div class="space-y-2">
      <div>
        <UiLabel class="font-semibold" for="icon">Icon</UiLabel>
        <p class="text-xs text-zinc-500 sm:w-[550px]">
            App icon is a visual representation of the app. It may be used in various places around
            Rosalana system.
        </p>
      </div>
      <div>
          <UiInput v-model="form.icon" id="icon" class="sm:w-[400px]" />
          <Icon :name="form.icon" class="h-7 w-7 align-middle ml-3 text-zinc-500" />
        </div>
      <UiErrorText class="block" :error="errors?.icon" />
    </div>

    <UiButton type="submit" :loading="pending" class="mt-4 w-min"> Save </UiButton>
  </form>
</template>
