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
  const activeTab = ref<string>(defaultTab.value);

  const handleTabChanged = (tab: string | number) => {
    activeTab.value = tab as string;
  };

  const changeTab = (tab: string) => {
    activeTab.value = tab;
  };

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
    @update:model-value="handleTabChanged"
    :model-value="activeTab"
  >
    <UiTabsList
      class="hidden h-full min-w-48 flex-col justify-start gap-1 rounded-lg sm:flex"
      :pill="false"
    >
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
      <div class="flex items-center justify-between">
        <h3 class="text-2xl font-semibold">{{ textToLabel(tab) }}</h3>
        <UiDropdownMenu>
          <UiDropdownMenuTrigger as-child>
            <UiButton class="sm:hidden text-primary" size="icon" variant="ghost">
              <Icon name="lucide:menu" class="h-4 w-4" />
            </UiButton>
          </UiDropdownMenuTrigger>
          <UiDropdownMenuContent class="mr-8 w-36">
            <UiDropdownMenuLabel :label="textToLabel(activeTab)" />
            <UiDropdownMenuSeparator />
            <UiDropdownMenuItem
              v-for="(tab, i) in tabs"
              :key="i"
              :icon="props.tabsIcons[i]"
              :disabled="disabledTabs.includes(tab)"
              :title="textToLabel(tab)"
              class="cursor-pointer"
              @click="changeTab(tab)"
              :class="{
                'bg-zinc-200/80 text-primary dark:bg-zinc-800/80': activeTab === tab,
              }"
            />
          </UiDropdownMenuContent>
        </UiDropdownMenu>
      </div>
      <UiDivider class="my-4" />
      <slot :name="tab" />
    </UiTabsContent>
  </UiTabs>
</template>
