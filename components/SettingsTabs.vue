<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      tabs: string[];
      tabsIcons?: string[];
      defaultTab?: string;
    }>(),
    {
      tabs: () => [],
      tabsIcons: () => [],
    }
  );

  const defaultTab = computed(() => props.defaultTab || props.tabs[0]);
</script>
<template>
  <UiTabs orientation="vertical" class="mt-6 flex w-full overflow-hidden" :default-value="defaultTab">
    <UiTabsList class="flex h-full min-w-48 flex-col gap-1 justify-start rounded-lg" :pill="false">
      <UiTabsTrigger
        class="w-full justify-start data-[state=active]:bg-zinc-200/80 dark:data-[state=active]:bg-zinc-800/80"
        :pill="false"
        :value="tab"
        v-for="(tab, i) in props.tabs"
        :key="i"
      >
        <Icon v-if="props.tabsIcons[i]" :name="props.tabsIcons[i]" class="h-4 w-4 mr-2" />
        {{ textToLabel(tab) }}
      </UiTabsTrigger>
    </UiTabsList>

    <UiTabsContent :value="tab" v-for="(tab, i) in props.tabs" :key="i" class="w-full px-5">
      <h3 class="text-2xl font-semibold">{{ textToLabel(tab) }}</h3>
      <UiDivider class="my-4" />
      <slot :name="tab" />
    </UiTabsContent>
  </UiTabs>
</template>
