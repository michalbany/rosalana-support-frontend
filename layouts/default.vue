<script lang="ts" setup>
import type { APIDataStructure } from '~/types';

  const { data } = useApi<APIDataStructure[]>('/apps?filter[active]', {
    method: 'GET',
  });
</script>
<template>
  <div
    class="flex min-h-screen flex-col bg-zinc-50 text-zinc-800 selection:bg-primary selection:text-white dark:bg-zinc-900 dark:text-white"
  >
    <div class="mx-auto flex w-full max-w-[1200px] grow flex-col px-6">
      <slot />
    </div>

    <footer>
      <div class="mt-32 bg-zinc-100 py-1 dark:bg-zinc-800">
        <div
          class="mx-auto mt-8 flex max-w-[1200px] flex-col items-center gap-8 px-6 sm:flex-row sm:items-start sm:justify-between sm:gap-0"
        >
          <div class="flex flex-col self-start">
            <UiButton
              v-for="(item, i) in data"
              class="items-start justify-start px-0 text-zinc-600 dark:text-zinc-400"
              variant="linkHover2"
              :key="i"
              @click="navigateTo('/app/' + item.id)"
            >
              {{ item?.attributes.name }}
            </UiButton>
          </div>
          <div class="flex flex-col items-start gap-2">
            <p class="max-w-max text-sm text-zinc-600 dark:text-zinc-400 sm:max-w-[250px]">
              Stuck on a problem? Get in touch with us and we'll help you out.
            </p>
            <UiButton size="sm" class="mb-1"> Send us a message</UiButton>
            <span class="text-sm dark:text-zinc-500"
              >Made with
              <Icon name="solar:heart-bold" class="size-4 align-middle text-red-500" /> by
              <UiButton
                variant="link"
                href="https://github.com/michalbany"
                target="_blank"
                class="inline-flex h-auto p-0 text-zinc-600 dark:text-zinc-400"
                >Michael Bany</UiButton
              ></span
            >
          </div>
        </div>
        <div class="container mx-auto py-4 text-center text-zinc-600 dark:text-zinc-300">
          <span class="text-sm text-zinc-600 dark:text-zinc-400">&copy; 2024 Rosalana</span>
        </div>
      </div>
    </footer>
  </div>
</template>
