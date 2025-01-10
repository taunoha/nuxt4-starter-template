<script lang="ts">
import { tv, type VariantProps } from "tailwind-variants";

const drawer = tv({
  base: "shadow-brand-700/70 absolute z-[1002] bg-white text-black shadow-2xl",
  variants: {
    position: {
      left: "top-0 bottom-0 left-0 h-dvh w-[320px] overflow-hidden",
      right: "top-0 right-0 bottom-0 h-dvh w-[320px] overflow-hidden",
      bottom: "right-0 bottom-0 left-0 max-h-[50vh] overflow-hidden",
    },
  },
});

type DrawerVariants = VariantProps<typeof drawer>;

interface Props {
  position?: DrawerVariants["position"];
  title: string;
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<Props>(), {
  position: "left",
});
const ui = computed(() =>
  drawer({
    position: props.position,
  })
);
</script>
<template>
  <DialogRoot>
    <DialogTrigger as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogPortal>
      <Transition name="fade">
        <DialogOverlay class="bg-brand-800/70 fixed inset-0 z-[1000]" />
      </Transition>
      <Transition :name="`slide-in-${props.position}`">
        <DialogContent
          class="scroll-touch fixed inset-0 z-[1001] overflow-hidden"
        >
          <div :class="ui">
            <DialogTitle as-child>
              <VisuallyHidden>
                {{ props.title }}
              </VisuallyHidden>
            </DialogTitle>
            <DialogDescription class="h-dvh overflow-y-auto px-8 py-16">
              <slot />
            </DialogDescription>
            <DialogClose
              class="hover:text-brand absolute top-4 right-4 appearance-none leading-none transition-colors duration-150"
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
