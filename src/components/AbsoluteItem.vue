<script>
import { useElementSize } from '@vueuse/core'
import { ref } from 'vue'

export default {
  setup() {
    const el = ref(null)
    const { width, height } = useElementSize(el)

    return {
      el,
      width,
      height,
    }
  }
}
</script>

<template>
  <div ref="el">
    Height: {{ height }}
    Width: {{ width }}
  </div>
</template>