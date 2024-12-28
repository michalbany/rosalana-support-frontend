<template>
    <div>
      <template v-for="(child, index) in filteredChildren" :key="index">
        <component
          :is="child"
          v-bind="{ ...child.props, ...getProps(index) }"
        >
        <template v-for="(_, slotName) in child.children" :key="slotName" v-slot:[slotName]="slotProps">
          <slot :name="`${index}-${slotName}`" v-bind="slotProps">
            <!-- Fallback na původní obsah slotu, pokud není poskytnut nový -->
            <component :is="child.children[slotName]" v-bind="slotProps" />
          </slot>
        </template>
        </component>
      </template>
    </div>
  </template>
  
  <script setup>
  import { useSlots, h, computed } from 'vue';
  
  const slots = useSlots();

  const filteredChildren = computed(() => {
      const defaultSlot = slots.default?.() || [];
      return defaultSlot.filter(vnode => vnode.type?.__name === 'Alert');
    });
    
  const getProps = (index) => {
    const total = filteredChildren.value.length;
    let classes = 'm-0 ';
    if (total === 1) {
      return { class: classes };
    }
    if (index === 0) {
      classes += 'border-b-0 rounded-b-none';
    } else if (index === total - 1) {
      classes += 'border-t-0 rounded-t-none';
    } else {
      classes += 'border-y-0 rounded-none';
    }
    return { class: classes };
  };
  </script>