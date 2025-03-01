<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="styles({ class: props.class })"
    @click="props.click"
  >
    <slot>
      <UiBadge
        v-if="props.badge !== undefined"
        class="absolute left-2 top-2"
        :class="{ 'bg-rose-500/20 text-rose-500 hover:bg-rose-500/20': props.badge, 'bg-zinc-500/20 text-zinc-500 hover:bg-zinc-500/20': !props.badge }"
      >
        <Icon name="lucide:circle" class="h-2 w-2 mr-1" />
        {{ props.badge ? "Online" : "Offline" }}
      </UiBadge>

      <slot name="header">
        <UiCardHeader>
          <slot name="icon">
            <div v-if="icon" class="mb-1 flex w-full justify-center">
              <div class="rounded-lg border p-2">
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
        badge?: boolean;
      }
    >(),
    {
      as: "div",
      title: undefined,
      description: undefined,
      content: undefined,
      class: undefined,
      badge: undefined,
    }
  );

  const styles = tv({
    base: "relative cursor-pointer rounded-lg border text-card-foreground transition-transform hover:scale-105",
  });
</script>
