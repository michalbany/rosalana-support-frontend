<template>
  <!-- eslint-disable-next-line vue/html-self-closing -->
  <input v-bind="props" v-model="localModel" :class="styles({ class: props.class })" />
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      class?: any;
      id?: string;
      name?: string;
      placeholder?: string;
      disabled?: boolean;
      required?: boolean;
      type?: string;
      modelValue?: any;
    }>(),
    { type: "text" }
  );
  const emits = defineEmits<{
    "update:modelValue": [value: any];
  }>();
  const localModel = useVModel(props, "modelValue", emits);

  const styles = tv({
    base: "form-input h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base file:border-0 file:bg-transparent file:px-1 file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground file:hover:cursor-pointer focus:border-input focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:[color-scheme:dark] sm:text-sm focus-visible:outline-none focus-visible:ring-transparent focus-visible:ring-offset-0 focus-visible:bg-zinc-100 dark:focus-visible:bg-zinc-800",
  });
</script>
