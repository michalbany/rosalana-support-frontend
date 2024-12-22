<template>
  <Primitive :as="as" :as-child="asChild" :class="styles({ class: props.class })" @click="props.click">
    <slot>
      <slot name="header">
        <UiCardHeader>
            <slot name="icon">
              <div v-if="icon" class="w-full flex justify-center mb-1">
                <div class="border p-2 rounded-lg">
                  <Icon :name="icon" class="block h-5 w-5" />
                </div>
              </div>
            </slot>
          <slot name="title">
            <UiCardTitle v-if="title || $slots.title" :title="title" />
          </slot>
          <slot name="description">
            <UiCardDescription
              v-if="description || $slots.description"
              :description="description"
            />
          </slot>
        </UiCardHeader>
      </slot>
      <slot v-if="content || $slots.content" name="content">
        <UiCardContent>
          <div v-html="content" />
        </UiCardContent>
      </slot>
      <slot name="footer" />
    </slot>
  </Primitive>
</template>

<script lang="ts" setup>
  import { Primitive } from "radix-vue";
  import type { PrimitiveProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      PrimitiveProps & {
        /** Title that should be displayed. Passed to the `CardTitle` component */
        title?: string;
        /** Description that should be displayed. Passed to the `CardDescription` component */
        description?: string;
        /** Content that should be displayed. Passed to the `CardContent` component */
        content?: string;
        /** Custom class(es) to add to the element */
        class?: any;
        icon?: string;
        click?: () => void;
      }
    >(),
    {
      as: "div",
      title: undefined,
      description: undefined,
      content: undefined,
      class: undefined,
    }
  );

  const styles = tv({
    base: "rounded-lg cursor-pointer border hover:scale-105 transition-transform text-card-foreground",
  });
</script>
