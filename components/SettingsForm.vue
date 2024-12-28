<script setup lang="ts">
  type ButtonProps = VariantProps<typeof buttonStyles>;
  const props = withDefaults(
    defineProps<{
      pending: boolean;
      label?: string;
      confirm?: boolean;
      response?: boolean;
      forceAction?: boolean;
      variant?: "single" | "multiple";
      buttonVariant?: string;
      disabled?: boolean;
      onResponse?: any;
      hideClose?: boolean;
    }>(),
    {
      label: "Save",
      confirm: false,
      forceAction: true,
      variant: "multiple",
      onResponse: { url: "/", label: "Go Home" },
      hideClose: false,
    }
  );

  const emit = defineEmits(["submit"]);

  const confirmModal = ref(false);
  const responseModal = ref(false);

  watchEffect(() => {
    if (props.response) {
      responseModal.value = true;
    }
  });

  const actionHit = ref(false);

  const submit = () => {
    if (props.confirm) {
      confirmModal.value = true;
    } else {
      emit("submit");
    }
  };

  const setAction = (value: boolean) => {
    actionHit.value = value;
  };
</script>
<template>
  <form
    @submit.prevent="submit"
    class="mb-8 flex flex-col"
    :class="{ 'gap-5': props.variant === 'multiple', 'gap-1': props.variant === 'single' }"
  >
    <slot />
    <UiButton
      type="submit"
      :variant="buttonVariant as ButtonProps['variant']"
      :loading="props.pending"
      :disabled="props.disabled"
      class="mt-4 w-min"
    >
      {{ props.label }}
    </UiButton>
  </form>

  <UiDialog :open="confirmModal" @update:open="(value) => (confirmModal = value)">
    <UiDialogContent hide-close>
      <UiDialogTitle class="sr-only">Confirm Modal</UiDialogTitle>
      <UiDialogDescription class="sr-only">Confirm your action</UiDialogDescription>
      <div class="flex items-center gap-4">
        <span class="text-3xl font-semibold text-primary">?</span>
        <div>
          <h2 class="text-lg font-semibold">Are you sure?</h2>
          <p class="text-sm text-zinc-600 dark:text-zinc-400">
            <slot name="confirm"> Are you sure you want to perform this action? </slot>
          </p>
        </div>
      </div>
      <div class="mt-4 flex items-center gap-4">
        <UiButton @click="confirmModal = false" class="w-min"> Close </UiButton>
        <UiButton
          @click="
            emit('submit');
            confirmModal = false;
          "
          class="w-min"
          variant="secondary"
        >
          Confirm
        </UiButton>
      </div>
    </UiDialogContent>
  </UiDialog>

  <UiDialog
    :open="responseModal"
    @update:open="(value) => (!props.forceAction ? (responseModal = value) : null)"
  >
    <UiDialogContent hide-close>
      <UiDialogTitle class="sr-only">Response Modal</UiDialogTitle>
      <UiDialogDescription class="sr-only">Copy the token bellow</UiDialogDescription>
      <div class="flex items-center gap-4">
        <Icon name="lucide:shield-check" class="h-8 w-8 text-rose-500" />
        <div>
          <h2 class="text-lg font-semibold">
            <slot name="response-title"> Response </slot>
          </h2>
          <p class="text-sm text-zinc-600 dark:text-zinc-400">
            <slot name="response-description"> Your action has been successfully performed. </slot>
          </p>
        </div>
      </div>
      <slot name="response-action" :action="setAction" />
      <div class="mt-4 flex items-center gap-4">
        <UiButton
          size="sm"
          v-if="!props.hideClose"
          :disabled="!actionHit && props.forceAction"
          @click="responseModal = false"
          >Close</UiButton
        >
        <UiButton
          size="sm"
          :disabled="!actionHit && props.forceAction"
          @click="navigateTo(props.onResponse.url)"
          variant="secondary"
          >{{ props.onResponse.label }}</UiButton
        >
      </div>
    </UiDialogContent>
  </UiDialog>
</template>
