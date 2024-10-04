<template>
  <div>
    Version: v{{ version }}
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import  packageJson from "../../package.json";
const version = computed(() => packageJson.version);
</script>

<style scoped>

</style>