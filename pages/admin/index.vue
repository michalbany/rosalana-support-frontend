<script setup lang="ts">
  import type { ApiResponse } from "~/types";

  useHead({
    title: "Admin",
  });

  const appDialog = ref(false);

  const closeAppDialog = async (save: boolean) => {
    if (save) {
        await useAuth().csrf();
        const cookie = useAuth().cookie('XSRF-TOKEN');
        const config = useRuntimeConfig();

        try {
            const data = await $fetch('/apps', {
                method: 'POST',
                credentials: 'include',
                baseURL: config.public.apiBaseUrl,
                headers: {
                    Accept: 'application/json',
                    'X-XSRF-TOKEN': cookie,
                },
                body: JSON.stringify(appForm),
            });
        } catch (error) {
            console.error(error);
        }
    }
    appDialog.value = false;
  };

  const appForm = reactive({
    name: "",
    icon: "" as string,
    description: "",
  });

  const handleSelectIcon = (icon: string) => {
    if (appForm.icon === icon) {
      appForm.icon = '';
    } else {
      appForm.icon = icon;
    }
  };

  const config = useRuntimeConfig();
  const { data: apps } = await useFetch<ApiResponse>("/apps", {
    method: "GET",
    credentials: "include",
    baseURL: config.public.apiBaseUrl,
    headers: {
      Accept: "application/json",
    },
  });
</script>
<template>
  <NuxtLayout name="main">
    <template #banner>
      <BannerContent>
        <template #title>Admin Dashboard</template>
        <template #description> Manage your applications and users. </template>
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
      </BannerContent>
    </template>

    <div class="mt-12 flex items-center justify-between">
      <h2 class="text-2xl font-bold text-zinc-800 dark:text-white">Aplications</h2>

      <UiDialog v-model:open="appDialog">
        <UiDialogTrigger as-child>
          <UiButton size="sm">
            <Icon name="lucide:plus" class="h-4 w-4" />
            New App
          </UiButton>
        </UiDialogTrigger>

        <UiDialogContent
          class="sm:max-w-[425px]"
          title="Register a new application"
          description="Fill in the fields below to register a new application."
        >
          <template #content>
            <div class="grid gap-4 py-4">
              <div class="grid grid-cols-4 items-center gap-4">
                <UiLabel for="name" class="text-right"> Name </UiLabel>
                <UiInput id="name" v-model="appForm.name" class="col-span-3" />
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <UiLabel for="description" class="text-right"> Description </UiLabel>
                <UiTextarea id="description" v-model="appForm.description" class="col-span-3" />
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <UiLabel for="icon" class="text-right"> Icon </UiLabel>
                <div class="col-span-3 flex w-full flex-wrap gap-4">
                  <div
                    v-for="(icon, i) in appLogos()"
                    :key="i"
                    @click="handleSelectIcon(appLogos()[i])"
                    class="cursor-pointer rounded-lg border p-2 transition-colors"
                    :class="{ 'bg-zinc-500/20': appForm.icon === icon }"
                  >
                    <Icon :name="icon" class="block h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template #footer>
            <UiDialogFooter>
              <UiButton
                variant="outline"
                type="button"
                class="mt-2 sm:mt-0"
                @click="closeAppDialog(false)"
                >Cancel</UiButton
              >
              <UiButton type="submit" @click="closeAppDialog(true)">Save</UiButton>
            </UiDialogFooter>
          </template>
        </UiDialogContent>
      </UiDialog>
    </div>

    <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <UiCard
        class="flex justify-center text-center"
        v-for="(app, i) in apps?.data"
        :key="i"
        :title="app.name"
        :description="app.description"
        :icon="app.icon"
        :badge="app.active"
        @click="navigateTo('/admin/app/' + app.id)"
      />
    </div>
  </NuxtLayout>
</template>
