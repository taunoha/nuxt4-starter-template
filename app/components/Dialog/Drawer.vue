<script lang="ts">
import { tv, type VariantProps } from "tailwind-variants";
</script>
<script setup lang="ts">
import {
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
  DrawerTrigger,
  DrawerTitle,
} from "vaul-vue";

const drawer = tv({
  base: "shadow-brand-700/70 fixed z-1051 bg-white text-black shadow-2xl",
  variants: {
    size: {
      default: "",
      md: "",
      lg: "",
    },
    position: {
      left: "top-0 bottom-0 left-0 h-dvh",
      right: "top-0 right-0 bottom-0 h-dvh",
      bottom: "right-0 bottom-0 left-0 max-h-[92vh]",
    },
  },
  compoundVariants: [
    {
      size: "default",
      position: ["left", "right"],
      class: "w-full max-w-80",
    },
    {
      size: "md",
      position: ["left", "right"],
      class: "w-full max-w-md",
    },
    {
      size: "lg",
      position: ["left", "right"],
      class: "w-full max-w-2xl",
    },
    {
      size: "default",
      position: "bottom",
      class: "min-h-[50vh] w-full",
    },
    {
      size: "default",
      position: "left",
    },
  ],
});

type DrawerVariants = VariantProps<typeof drawer>;

interface Props {
  position?: DrawerVariants["position"];
  size?: DrawerVariants["size"];
  dismissible?: boolean;
  title: string;
}
const props = withDefaults(defineProps<Props>(), {
  position: "bottom",
  size: "default",
  dismissible: true,
});

const route = useRoute();
const isOpen = ref(false);

const ui = computed(() =>
  drawer({
    position: props.position,
    size: props.size,
  })
);

function toggleOpen() {
  isOpen.value = !isOpen.value;
}

watch(route, async () => {
  await nextTick();
  isOpen.value = false;
});
</script>
<template>
  <DrawerRoot
    v-model:open="isOpen"
    :direction="props.position"
    :should-scale-background="true"
    :set-background-color-on-scale="false"
    :dismissible="props.dismissible"
  >
    <DrawerTrigger as-child>
      <slot name="trigger" />
    </DrawerTrigger>
    <DrawerPortal>
      <DrawerOverlay class="bg-brand-800/70 fixed inset-0 z-1050" />
      <DrawerContent :class="ui">
        <AppButtonClose v-if="props.dismissible" @click="isOpen = false" />
        <div class="max-h-dvh overflow-y-auto p-6">
          <DrawerTitle as-child>
            <VisuallyHidden>{{ title }}</VisuallyHidden>
          </DrawerTitle>
          <slot :toggle-open="toggleOpen" />
        </div>
      </DrawerContent>
    </DrawerPortal>
  </DrawerRoot>
</template>
