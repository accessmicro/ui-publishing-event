<template>
  <iframe src="http://localhost:5173/uxtech/area/guide_event.html" frameborder="0" class="w-full h-full" @load="handleLoad"></iframe>
</template>

<script setup lang="ts">
const handleLoad = async (e: any) => {
  const iframeDoc = e.target.contentDocument || e.target.contentWindow.document;
  console.log(`😮‍💨 ~ iframeDoc:`, iframeDoc);

};
</script>

<style scoped></style>