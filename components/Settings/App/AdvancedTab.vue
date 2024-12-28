<script setup lang="ts">
  import type { APIDataStructure } from "~/types";

  const props = defineProps<{
    app: APIDataStructure | null;
  }>();

  const responseStore = useResponseStore();

  const appStatusToken = ref<any>("");
  const openStatusResponseModal = ref(false);
  const appStatusPending = ref(false);

  const appStatus = computed(() => {
    if (props.app?.attributes.active) {
      return {
        description: "The app is currently enabled. Users can authenticate via Rosalana Accounts.",
        button: "Disable",
        response: "App has been connected to Rosalana Accounts. App can access it.",
        confirm: "By disabling the app, Rosalana Accounts won't be accessible by this app anymore.",
        url: "/apps/" + props.app?.id + "/disable",
        state: "enabled",
      };
    } else {
      return {
        description:
          "The app is currently disabled. Users can't authenticate via Rosalana Accounts.",
        button: "Enable",
        response: "App has been disconnected from Rosalana Accounts. App can't access it.",
        confirm: "By enabling the app, Rosalana Accounts will be accessible by this app.",
        url: "/apps/" + props.app?.id + "/enable",
        state: "disabled",
      };
    }
  });

  const submitAppStatus = async () => {
    appStatusPending.value = true;
    const { data } = await useApiRuntime<any>(appStatus.value.url, {
      method: "POST",
      store: false,
      onResponse: ({ response }) => {
        useSonner.success(response._data.message);
        if (response._data.data.attributes.token) {
          appStatusToken.value = response._data.data.attributes.token;
          openStatusResponseModal.value = true;
        }
        responseStore.update(response._data);
      },
    });

    openStatusResponseModal.value = false;
    appStatusPending.value = false;
  };

  const appTokenPending = ref(false);
  const appTokenToken = ref<any>("");
  const openTokenResponseModal = ref(false);

  const submitAppToken = async () => {
    appTokenPending.value = true;
    const { data } = await useApiRuntime<any>(`/apps/${props.app?.id}/refresh`, {
      method: "POST",
      store: false,
      onResponse: ({ response }) => {
        useSonner.success(response._data.message);
        if (response._data.data.attributes.token) {
          appTokenToken.value = response._data.data.attributes.token;
          openTokenResponseModal.value = true;
        }
        responseStore.update(response._data);
      },
    });

    openTokenResponseModal.value = false;
    appTokenPending.value = false;
  };

  const appRemovePending = ref(false);
  const submitAppRemove = async () => {
    appRemovePending.value = true;
    const { data } = await useApiRuntime<any>("/apps/" + props.app?.id, {
      method: "DELETE",
      store: false,
      onResponse: ({ response }) => {
        useSonner.success(response._data.message);
      },
    });

    navigateTo("/admin/app");
    appRemovePending.value = false;
  };
</script>
<template>
  <!-- enable / disable -->
  <SettingsForm
    :response="openStatusResponseModal"
    variant="single"
    @submit="submitAppStatus"
    :pending="appStatusPending"
    :label="appStatus.button"
    confirm
    :disabled="app?.attributes.master"
    :onResponse="{ url: '/admin/app', label: 'Go To Apps' }"
  >
    <SettingsFormBlock
      :name="`app_status_(${appStatus.state})`"
      :description="appStatus.description"
    />

    <template #confirm>
      {{ appStatus.confirm }}
    </template>

    <template #response-title> App {{ textToLabel(appStatus.state) }} </template>

    <template #response-description>
      {{ appStatus.response }}
    </template>

    <template #response-action="{ action }">
      <CopyInput :value="appStatusToken" @copied="() => action(true)" />
    </template>
  </SettingsForm>

  <!-- refresh token -->
  <SettingsForm
    variant="single"
    :response="openTokenResponseModal"
    @submit="submitAppToken"
    :pending="appTokenPending"
    label="Regenerate Token"
    confirm
    :disabled="app?.attributes.master || !app?.attributes.active"
    :onResponse="{ url: '/admin/app', label: 'Go To Apps' }"
  >
    <SettingsFormBlock
      name="app_token"
      description="Regenerate the app token to keep your app secure."
    />

    <template #confirm>
      By regenerating the token, the current token will be invalidated and the new token will be
      generated. Your app will need to use the new token to authenticate with Rosalana Accounts.
    </template>

    <template #response-title> App Token Regenerated </template>
    <template #response-description>
      The app token has been successfully regenerated. Copy the new token and update your app with
      it.
    </template>

    <template #response-action="{ action }">
      <CopyInput :value="appTokenToken" @copied="() => action(true)" />
    </template>
  </SettingsForm>

  <!-- remove app -->
  <SettingsForm
    variant="single"
    @submit="submitAppRemove"
    :pending="appRemovePending"
    label="Remove App"
    confirm
    :disabled="app?.attributes.master"
    :onResponse="{ url: '/admin/app', label: 'Go To Apps' }"
  >
    <SettingsFormBlock
      name="app_remove"
      description="Remove the app from Rosalana Accounts and this system. This action is irreversible."
    />

    <template #confirm>
      By removing the app, all data associated with the app will be deleted. This action is
      irreversible. This includes all data from this system and Rosalana Accounts.
    </template>
  </SettingsForm>
</template>
