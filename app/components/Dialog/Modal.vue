<script lang="ts">
import { tv, type VariantProps } from "tailwind-variants";

const dialog = tv({
  base: "shadow-brand-700/70 relative mx-auto my-14 rounded-lg bg-white p-8 text-black shadow-2xl",
  variants: {
    size: {
      sm: "max-w-sm",
      lg: "max-w-2xl",
      xl: "max-w-4xl",
    },
  },
});

type DialogVariants = VariantProps<typeof dialog>;

interface Props {
  size?: DialogVariants["size"];
  title: string;
  dismissible?: boolean;
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<Props>(), {
  size: "lg",
  dismissible: true,
});

const escKeyEvent = import.meta.client
  ? new KeyboardEvent("keydown", {
      key: "Escape",
      code: "Escape",
      bubbles: true,
    })
  : null;
const route = useRoute();
const dialogContentEl = ref<HTMLElement | null>(null);

const ui = computed(() =>
  dialog({
    size: props.size,
  })
);

function handleDialogClose() {
  if (props.dismissible && escKeyEvent) {
    dialogContentEl.value?.dispatchEvent(escKeyEvent);
  }
}

onClickOutside(dialogContentEl, () => {
  handleDialogClose();
});

watch(route, () => {
  handleDialogClose();
});
</script>

<template>
  <DialogRoot>
    <DialogTrigger as-child>
      <AppButton><slot name="trigger" /></AppButton>
    </DialogTrigger>
    <DialogPortal>
      <Transition name="fade">
        <DialogOverlay class="bg-brand-800/70 fixed inset-0 z-[2000]" />
      </Transition>
      <Transition name="slide-in-out">
        <DialogContent
          class="scroll-touch fixed inset-0 z-[2001] overflow-hidden overflow-y-auto p-4"
        >
          <div ref="dialogContentEl" :class="ui">
            <DialogTitle class="font-heading mb-8 text-2xl font-bold">
              {{ props.title }}
            </DialogTitle>
            <slot />
            <DialogClose as-child>
              <AppButtonClose />
            </DialogClose>
          </div>
        </DialogContent>
      </Transition>
    </DialogPortal>
  </DialogRoot>
</template>
