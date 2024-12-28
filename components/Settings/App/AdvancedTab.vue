<script setup lang="ts">
  const props = defineProps<{
    app: any;
  }>();

  const responseStore = useResponseStore();
  const appStatusToken = ref<any>("");
  const openResponseModal = ref(false);

  const appStatus = computed(() => {
    if (props.app?.active) {
      return {
        description: "The app is currently enabled and users can access it.",
        button: "Disable",
        confirm: "By disabling the app, users won't be able to access it anymore.",
        url: "/apps/" + props.app?.id + "/disable",
        state: "enabled",
      };
    } else {
      return {
        description: "The app is currently disabled and users can't access it.",
        button: "Enable",
        confirm: "By enabling the app, users will be able to access it.",
        url: "/apps/" + props.app?.id + "/enable",
        state: "disabled",
      };
    }
  });

  const pending = ref(false);

  const submitAppEnable = async () => {
    pending.value = true;
    const { data } = await useApiRuntime<any>(appStatus.value.url, {
      method: "POST",
      store: false,
      onResponse: ({ response }) => {
        useSonner.success(response._data.message);
        if (response._data.data.token) {
          appStatusToken.value = response._data.data.token;
          openResponseModal.value = true;
          const newData = {
            ...response._data,
            data: response._data.data.app,
          };
          responseStore.update(newData);
        } else {
          responseStore.update(response._data);
        }
      },
    });

    pending.value = false;
  };
</script>
<template>
  <!-- enable / disable -->
  <SettingsForm
    :response="openResponseModal"
    variant="single"
    @submit="submitAppEnable"
    :pending="pending"
    :label="appStatus.button"
    confirm
  >
    <SettingsFormBlock :name="`app_status_(${appStatus.state})`" :description="appStatus.description" />

    <template #confirm>
      {{ appStatus.confirm }}
    </template>

    <template #response-action="{ action }">
      <CopyInput :value="appStatusToken" @copied="() => action(true)" />
    </template>
  </SettingsForm>


  
</template>
