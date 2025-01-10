<script lang="ts">
import { tv, type VariantProps } from "tailwind-variants";

const dialog = tv({
  base: "relative mx-auto my-14 rounded-lg bg-white p-8 text-black shadow-xl",
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
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<Props>(), {
  size: "lg",
});
const ui = computed(() =>
  dialog({
    size: props.size,
  })
);
</script>

<template>
  <DialogRoot>
    <DialogTrigger as-child>
      <AppButton><slot name="trigger" /></AppButton>
    </DialogTrigger>
    <DialogPortal>
      <Transition name="fade">
        <DialogOverlay class="bg-brand-800/70 fixed inset-0 z-[1000]" />
      </Transition>
      <Transition name="slide-in-out">
        <DialogContent
          class="scroll-touch fixed inset-0 z-[1001] overflow-hidden overflow-y-auto p-4 text-gray-900"
        >
          <div :class="ui">
            <DialogTitle class="mb-4 text-2xl font-bold">
              <slot name="title" />
            </DialogTitle>
            <DialogDescription>
              <slot />
            </DialogDescription>
            <DialogClose
              class="hover:text-brand-500 absolute top-4 right-4 appearance-none leading-none text-gray-900 transition-colors duration-150"
              aria-label="Close"
            >
              <Icon name="bi:x-circle" size="24" />
            </DialogClose>
          </div>
        </DialogContent>
      </Transition>
    </DialogPortal>
  </DialogRoot>
</template>
