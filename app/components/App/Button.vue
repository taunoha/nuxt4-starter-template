<script lang="ts">
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";

const button = tv({
  base: "bg-brand-500 hover:bg-brand-100 hover:text-brand-500 ring-brand-500 inline-flex items-center gap-2 rounded-lg px-5 py-2 font-medium text-white inset-ring inset-shadow-sm ring shadow-md inset-shadow-white/20 inset-ring-white/15 transition-colors duration-150",
});

interface Props {
  type?: "button" | "submit" | "reset";
  to?: string;
  class?: string;
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
});
const attrs = useAttrs();

const ui = computed(() => twMerge(button(), props.class));
</script>
<template>
  <button v-if="!props.to" :type="props.type" v-bind="attrs" :class="ui">
    <slot />
  </button>
  <NuxtLink v-else :to="props.to" v-bind="attrs" :class="ui">
    <slot />
  </NuxtLink>
</template>
