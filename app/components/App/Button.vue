<script lang="ts">
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";

const button = tv({
  base: "inline-flex items-center justify-center gap-2 rounded-lg px-8 py-3 font-medium transition-colors duration-150",
  variants: {
    variant: {
      outline:
        "text-brand border-brand-500 hover:not-disabled:bg-brand-100 hover:not-disabled:text-brand-500 border bg-white",
      solid:
        "bg-brand-500 box-reflect-below hover:not-disabled:bg-brand-100 hover:not-disabled:text-brand-500 ring-brand-500 shadow-brand-700/40 text-white shadow-md ring inset-shadow-sm inset-ring inset-shadow-white/20 inset-ring-white/15",
    },
    disabled: {
      true: "cursor-not-allowed opacity-50 grayscale-25",
    },
  },
});

interface Props {
  type?: "button" | "submit" | "reset";
  to?: string;
  class?: string;
  disabled?: boolean;
  variant?: "outline" | "solid";
}
</script>
<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<Props>(), {
  type: "button",
  to: undefined,
  class: "",
  variant: "solid",
  disabled: false,
});
const attrs = useAttrs();

const ui = computed(() =>
  twMerge(
    button({ variant: props.variant, disabled: props.disabled }),
    props.class
  )
);
</script>
<template>
  <button
    v-if="!props.to"
    :type="props.type"
    :disabled="props.disabled"
    v-bind="attrs"
    :class="ui"
  >
    <slot />
  </button>
  <NuxtLink
    v-else
    :to="props.to"
    v-bind="attrs"
    :disabled="props.disabled"
    :class="ui"
  >
    <slot />
  </NuxtLink>
</template>
