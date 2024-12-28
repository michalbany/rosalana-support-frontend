<template>
  <div v-if="shown" :class="styles({ variant: variant, class: props.class })">
    <div class="flex gap-3">
      <slot :props="props" name="icon">
        <Icon v-if="icon" :name="icon" class="size-5 flex-shrink-0" />
      </slot>
      <div>
        <slot :props="props">
          <UiAlertTitle v-if="title" :title="title" />
          <UiAlertDescription v-if="description" :description="description" />
        </slot>
      </div>
    </div>
    <slot name="action" />
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      /** Custom class to add to the `Alert` parent */
      class?: any;
      /**
       * Whether or not the `Alert` is shown.
       * @default true
       */
      modelValue?: boolean;
      /** The variant of the `Alert` */
      variant?: VariantProps<typeof styles>["variant"];
      /** The title that is passed to the `AlertTitle` component */
      title?: string;
      /** The description that is passed to the `AlertDescription` component */
      description?: string;
      /** The icon that should be displayed*/
      icon?: string;
    }>(),
    {
      modelValue: true,
      variant: "default",
      title: undefined,
      description: undefined,
      icon: undefined,
      class: undefined,
    }
  );

  const emit = defineEmits(["update:modelValue"]);
  const shown = useVModel(props, "modelValue", emit, { defaultValue: true });

  const styles = tv({
    base: "relative my-2 flex w-full flex-col justify-between gap-3 rounded-lg border p-4 sm:flex-row",
    variants: {
      variant: {
        default: "bg-background/40 text-foreground",
        destructive:
          "border-destructive/50 bg-destructive/10 text-destructive dark:border-destructive [&>svg]:text-destructive",
        success: "border-emerald-500/50 bg-emerald-500/10 text-emerald-500 dark:border-emerald [&>svg]:text-emerald",
        warning:
          "border-orange-500/50 bg-orange-500/10 text-orange-500 dark:border-orange-500 [&>svg]:text-orange-500",
        info: "border-blue-500/50 bg-blue-500/10 text-blue-500 dark:border-blue-500 [&>svg]:text-blue-500",
        ghost:
          "border-border bg-slate-100 text-slate-900 dark:border-slate-800 dark:text-slate-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  });
</script>
