<script setup lang="ts">
import type { ApiResponse } from '~/types';

useHead({
    title: "Admin",
});

const config = useRuntimeConfig();
const { data:apps } = useFetch<ApiResponse>('/apps', {
    method: 'GET',
    credentials: 'include',
    baseURL: config.public.apiBaseUrl,
    headers: {
        Accept: 'application/json',
    },
});
</script>
<template>
    <NuxtLayout name="main">
        <template #banner>
            <BannerContent>
                <template #title>Admin Dashboard</template>
                <template #description>
                    Manage your applications and users.
                </template>
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

        <h2 class="mt-12 text-2xl font-bold text-zinc-800 dark:text-white">Aplications</h2>

        <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <UiCard
                class="flex justify-center text-center"
                v-for="(app, i) in apps?.data"
                :key="i"
                :title="app.name"
                :description="app.description"
                :icon="app.icon"
                :badge="app.active"
            />
        </div>
    </NuxtLayout>
</template>