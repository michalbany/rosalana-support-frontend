<script setup lang="ts">
  const props = withDefaults(defineProps<{
    type?: "success" | "info" | "warning" | "default" | "destructive" | "ghost" | undefined;
  }>(), {
    type: "default",
  });

  const icon = computed(() => {
    switch (props.type) {
        case "success":
            return "solar:check-circle-linear";
        case "info":
            return "solar:question-circle-linear";
        case "warning":
            return "solar:danger-circle-linear";
        case "destructive":
            return "solar:close-circle-linear";
        default:
            return undefined;
    }
  });
</script>
<template>
  <UiAlert :variant="props.type" :icon="icon">
    <UiAlertDescription class="not-prose">
        <MDCSlot unwrap="p" />
    </UiAlertDescription>
  </UiAlert>
</template>
<style scoped>
  code {
    @apply bg-slate-100 text-slate-900 font-mono border border-primary/20 px-1 py-0.5 rounded-sm;
  }
</style>
