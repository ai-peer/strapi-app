<template>
  <div>
    <router-view v-slot="{ Component }">
      <Suspense>
        <component :is="Component" />
      </Suspense>
    </router-view>
  </div>
</template>

<script setup lang="ts">
const ssr = import.meta.env.SSR;
if (!ssr) {
  (async () => {
    const { useGlobalEvents } = await import("@/composables");
    useGlobalEvents();
    const { subscribeStore, useThemeStore } = await import("@/store");
    subscribeStore();
    useThemeStore();
  })();
}
</script>

<style></style>
