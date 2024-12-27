<script setup lang="ts">
  const props = defineProps<{
    pending: boolean;
  }>();

  const emit = defineEmits(["submit"]);

  const submit = () => emit("submit");
</script>
<template>
  <form @submit.prevent="submit" class="flex flex-col gap-5">
    <slot />
    <UiButton type="submit" :loading="props.pending" class="mt-4 w-min"> Save </UiButton>
  </form>
</template>
