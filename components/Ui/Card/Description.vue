<template>
  <Primitive :class="styles({ class: props.class })" :as="as" :as-child="asChild">
    <slot>
      {{ description }}
    </slot>
  </Primitive>
</template>

<script lang="ts" setup>
  import { Primitive } from "radix-vue";
  import type { PrimitiveProps } from "radix-vue";

  const props = withDefaults(
    defineProps<
      PrimitiveProps & {
        /** Description to display in the card */
        description?: string;
        /** Custom class(es) to add to the element */
        class?: any;
      }
    >(),
    {
      as: "div",
    }
  );
  const styles = tv({
    base: "text-xs text-muted-foreground",
  });
</script>
