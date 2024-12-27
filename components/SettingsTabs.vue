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

  const disabledTabs = ref<string[]>([]);

  const tabs = computed(() => {
    return props.tabs.map((tab) => {
      if (tab.startsWith("[X]")) {
        const cleanedTab = tab.replace("[X]", "").trim();
        if (!disabledTabs.value.includes(cleanedTab)) {
          disabledTabs.value.push(cleanedTab);
        }
        return cleanedTab;
      }
      return tab;
    });
  });
</script>
<template>
  <UiTabs
    orientation="vertical"
    class="mt-6 flex w-full overflow-hidden"
    :default-value="defaultTab"
  >
    <UiTabsList class="flex h-full min-w-48 flex-col justify-start gap-1 rounded-lg" :pill="false">
      <UiTabsTrigger
        class="w-full justify-start data-[state=active]:bg-zinc-200/80 data-[state=active]:text-primary dark:data-[state=active]:bg-zinc-800/80"
        :pill="false"
        :value="tab"
        v-for="(tab, i) in tabs"
        :disabled="disabledTabs.includes(tab)"
        :key="i"
      >
        <Icon v-if="props.tabsIcons[i]" :name="props.tabsIcons[i]" class="mr-2 h-4 w-4" />
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
