<script setup lang="ts">
  const props = defineProps<{
    name: string;
    description?: string;
    errors?: string[] | undefined;
  }>();
</script>
<template>
  <div class="space-y-2">
    <div>
      <UiLabel class="font-semibold" :for="props?.name">{{ textToLabel(props?.name) }}</UiLabel>
      <p class="text-xs text-zinc-500 sm:w-[550px]">
        {{ props?.description }}
      </p>
    </div>
    <slot />
    <UiErrorText class="block" :error="props?.errors" />
  </div>
</template>
