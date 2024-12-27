<script setup lang="ts">
  const props = defineProps<{
    value: string;
  }>();

  const emit = defineEmits(['copied']);

  const copied = ref(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(props.value);
    useSonner.success("Copied to clipboard");
    copied.value = true;
    emit('copied');

    setTimeout(() => {
      copied.value = false;
    }, 3000);
  };
</script>
<template>
  <div class="flex items-center gap-2">
    <UiInput type="text" @click="copyToClipboard" v-model="props.value" readonly />
    <UiButton size="sm" @click="copyToClipboard">
      <Icon :name="copied ? 'lucide:check' : 'lucide:copy'" class="h-4 w-4" />
    </UiButton>
  </div>
</template>
