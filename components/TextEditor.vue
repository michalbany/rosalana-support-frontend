<script setup lang="ts">
  const content = defineModel({ type: String, required: true });
  const editor = ref<HTMLElement | null>(null);
  const viewMode = ref<"preview" | "raw">("raw");
  const splitView = ref(false);

  // Funkce pro zpracování input událostí
  const onInput = () => {
    if (editor.value) {
      content.value = editor.value.innerText;
    }
  };

  onMounted(() => {
    if (editor.value) {
      editor.value.innerText = content.value;
    }
  });

  const handleModeChange = (checked: boolean) => {
    viewMode.value = checked ? "preview" : "raw";
  };
</script>
<template>
  <div class="w-full">
    <div class="flex items-center justify-between border-b p-3 hover:bg-muted/20">
      <div class="flex items-center space-x-2">
        <UiLabel
          for="view-mode"
          :class="{ 'text-primary': viewMode === 'preview', 'text-zinc-500': splitView }"
        >
          {{ textToLabel(viewMode) }}
        </UiLabel>
        <UiSwitch id="view-mode" @update:checked="handleModeChange" :disabled="splitView" />
      </div>
      <UiButton size="icon-xs" @click="splitView = !splitView">
        <Icon :name="splitView ? 'lucide:square-menu' :'lucide:square-split-horizontal'" class="h-4 w-4" />
      </UiButton>
    </div>
    <div
      class="h-[400px] border-b p-2 hover:bg-muted/20"
      :class="{ 'grid grid-cols-2': splitView }"
    >
      <div
        contenteditable="true"
        class="h-full w-full overflow-scroll focus-visible:outline-none text-zinc-500"
        :class="{ 'border-r pr-2': splitView }"
        @input="onInput"
        ref="editor"
        tabindex="0"
        v-show="viewMode === 'raw' || splitView"
      />

      <MDC
        :value="content"
        tag="article"
        :class="{ 'pl-2': splitView }"
        class="github-markdown small h-full w-full overflow-scroll"
        v-if="viewMode === 'preview' || splitView"
      />
    </div>
  </div>
</template>
