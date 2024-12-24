<script lang="ts" setup>
const apps = [
  {
    name: "Rosalana",
  },
  {
    name: "Blueprint",
  },
  {
    name: "ProxyMa",
  },
  {
    name: "S Transfer"
  }
]
</script>
<template>
  <div class="selection:bg-primary selection:text-white flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-900 dark:text-white text-zinc-800">
    <div class="mx-auto flex max-w-[1200px] grow flex-col px-6 w-full">
      <slot />
    </div>

  <footer>
      <div class="bg-zinc-100 dark:bg-zinc-800 py-1 mt-32">
        <div class="px-6 max-w-[1200px] mx-auto mt-8 flex sm:justify-between items-center sm:items-start sm:flex-row flex-col sm:gap-0 gap-8">

          <div class="flex flex-col self-start">
            <UiButton
              v-for="(item, i) in apps"
              class="justify-start px-0 items-start text-zinc-600 dark:text-zinc-400"
              variant="linkHover2"
              :key="i"
            >
              {{ item.name }}
            </UiButton>
          </div>
          <div class="flex flex-col gap-2 items-start">
            <p class="text-sm text-zinc-600 sm:max-w-[250px] max-w-max dark:text-zinc-400">Stuck on a problem? Get in touch with us and we'll help you out.</p>
            <UiButton size="sm" class="mb-1"> Send us a message</UiButton>
            <span class="text-sm dark:text-zinc-500">Made with <Icon name="solar:heart-bold" class="size-4 text-red-500 align-middle" /> by <UiButton variant="link" href="https://github.com/michalbany" target="_blank" class="text-zinc-600 p-0 h-auto inline-flex dark:text-zinc-400">Michael Bany</UiButton></span>
          </div>
        </div>
        <div class="container mx-auto py-4 text-center text-zinc-600 dark:text-zinc-300">
          <span class="text-sm text-zinc-600 dark:text-zinc-400">&copy; 2024 Rosalana</span>
        </div>
      </div>
    </footer>
  </div>
</template>
