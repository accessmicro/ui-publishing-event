import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

export const useIsChangedFormStore = defineStore('isChanged', {
  state: () => {
    return {
      isChanged: false,
    }
  },
  getters: {
    getIsChanged(): boolean {
      return this.isChanged
    },
  },
  actions: {
    setIsChanged(value: boolean) {
      this.isChanged = value
    },
  },
})