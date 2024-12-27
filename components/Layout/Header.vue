<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      to?: string;
      level?: "1" | "2" | "3" | "4" | "5" | "6";
    }>(),
    {
      to: undefined,
      level: "2",
    }
  );

  const Tag = computed(() => `h${props.level}`);
</script>
<template>
  <div class="mt-12 flex items-center justify-between">
    <div>
      <component
        :is="Tag"
        class="cursor-pointer text-2xl font-bold text-zinc-800 dark:text-white"
        @click="props.to ? navigateTo(props.to) : null"
      >
        <slot name="title" />
      </component>
      <p class="text-sm text-zinc-500 dark:text-zinc-400"><slot name="subtitle" /></p>
    </div>
    <slot name="action" />
  </div>
</template>
