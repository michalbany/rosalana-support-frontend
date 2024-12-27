<script setup lang="ts">
const props = defineProps<{
    error: string[] | undefined;
}>();

const attactedText = computed(() => {
    let text = '';

    if (props.error && props.error?.length > 1) {
        text = `(and ${props.error?.length - 1} more)`;
    }

    return text;
});
</script>
<template>
    <span v-if="error" class="text-xs text-red-500">
        {{ `${error[0]} ${attactedText}`  }}
    </span>
</template>