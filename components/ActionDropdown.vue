<script setup lang="ts">

type AdditionalItem = {
    title: string;
    class?: any;
    click: () => void;
    icon?: string;
    disabled?: boolean;
}

const props = withDefaults(
    defineProps<{
        items: AdditionalItem[];
        label?: string;
        class?: any;
        iconClass?: any;
    }>(),
    {
        items: () => [],
        label: "",
        class: "",
        iconClass: "size-5",
    }
)

</script>
<template>
<UiDropdownMenu>
    <UiDropdownMenuTrigger as-child>
        <UiButton variant="ghost" size="icon-sm" :class="props.class">
            <Icon name="solar:menu-dots-bold" :class="props.iconClass" />
        </UiButton>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent class="mr-8 w-max">
        <template v-if="props.label">
            <UiDropdownMenuLabel :label="props.label" />
            <UiDropdownMenuSeparator /> 
        </template>
        <UiDropdownMenuItem 
            v-for="item in props.items"
            :key="item.title"
            :class="item.class"
            class="cursor-pointer hover:!text-primary dark:hover:text-primary hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80"
            @click="item.click"
            :icon="item.icon"
            :title="item.title"
            :disabled="item.disabled"
        />
    </UiDropdownMenuContent>
</UiDropdownMenu>
</template>