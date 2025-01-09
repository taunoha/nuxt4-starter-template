<script lang="ts" setup></script>
<template>
  <DevOnly>
    <div
      aria-hidden="true"
      class="mx-2 my-4 max-w-screen overflow-hidden overflow-x-auto rounded-md border border-[black]/50 bg-white/90 p-4 text-left font-mono text-[10px] text-[black] shadow-sm"
    >
      <span class="mb-2 block text-[8px] text-[black]/50 uppercase">debug</span>
      <pre><slot /></pre>
    </div>
  </DevOnly>
</template>
