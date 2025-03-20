<script lang="ts" setup>
const posts = ref<Post[]>([]);

const { data, error } = await useFetch("/api/v1/posts");

if (error.value) {
  throw createError({ ...error.value, statusMessage: "Posts Not Found" });
}

if (data.value) {
  posts.value = data.value.slice(0, 3);
}

useSeoMeta({
  title: "Posts",
});
</script>

<template>
  <div class="flex min-h-dvh flex-col justify-center text-center">
    <main class="container">
      <div class="mb-6 flex justify-center">
        <Icon name="logos:nuxt-icon" size="80" />
      </div>
      <h1 class="mb-6 text-center text-5xl font-bold">Hello, World!</h1>
      <p class="text-brand-50 mb-12">Can you see me?</p>
      <div class="flex flex-wrap justify-center gap-4">
        <DialogModal size="xl" title="Modal title">
          <template #trigger>Open Dialog</template>
          <p v-for="i in 20" :key="i" class="mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
            architecto, enim vitae quibusdam culpa facilis assumenda expedita
            aspernatur ut, dolore numquam quidem obcaecati? Dolorem ab ipsa,
            earum voluptate id ullam.
          </p>
          <div
            class="sticky -bottom-8 z-10 -mx-8 -mb-8 flex justify-end rounded-b-lg border-t border-gray-200 bg-white/50 px-8 pt-8 pb-8 backdrop-blur-sm"
          >
            <DialogClose as-child>
              <AppButton>Close</AppButton>
            </DialogClose>
          </div>
        </DialogModal>
        <DialogDrawer title="Drawer title" position="left">
          <template #trigger>
            <AppButton>Left Drawer</AppButton>
          </template>
          <p>Hello, Left Drawer!</p>
        </DialogDrawer>
        <DialogDrawer title="Drawer title" position="bottom">
          <template #trigger>
            <AppButton>Bottom Drawer</AppButton>
          </template>
          <p>Hello, Bottom Drawer!</p>
        </DialogDrawer>
        <DialogDrawer
          title="Drawer title"
          position="right"
          :dismissible="false"
        >
          <template #trigger>
            <AppButton>Right Drawer</AppButton>
          </template>
          <template #default="{ toggleOpen }">
            <AppButtonClose @click="toggleOpen" />
            <p>Hello, Right Drawer!</p>
            <p class="mt-4 text-sm">
              This drawer is not dismissible. You must click the close button to
              close it.
            </p>
          </template>
        </DialogDrawer>
      </div>
      <p
        class="mx-auto flex max-w-xl flex-wrap justify-center gap-2 pt-8 text-sm"
      >
        <span v-for="item in posts" :key="item.title">
          {{ item.title }}
        </span>
      </p>
    </main>
  </div>
</template>
