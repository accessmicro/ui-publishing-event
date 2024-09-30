<template>
  <div class="wrapper relative">
    <img :src="props.item.src_image" :alt="props.item.i" />
    <div ref="dndAreaRef" class="absolute inset-0" :style="absolutePositionStyle">
      <div
        v-for="(item, index) in formState.absolute"
        :key="index"
        class="size-[50px] bg-[#cd6a6a51] absolute top-0 left-0 select-none flex justify-center items-center text-black text-[48px] cursor-grab"
        @dblclick="(e) => handleOpenOptions(e, index)"
        @mousedown.prevent="(e) => handleStartDrag(e, index)"
        @mousemove="(e) => handleMouseMove(e, index)"
        @mouseup="handleStopAction"
        :style="{
          top: `${item.y}px`,
          left: `${item.x}px`,
          width: `${item.w}px`,
          height: `${item.h}px`
        }"
      >
        {{ index + 1 }}
        <div class="size-5 absolute right-0 bottom-0">
          <icon-resize-right-bottom />
        </div>
        <div class="absolute inset-0"></div>
      </div>
    </div>
    <div class="absolute right-4 top-4">
      <Popover placement="bottom" trigger="click">
        <template #content>
          <div class="flex flex-col gap-y-2 w-[300px] p-5">
            <div class="flex flex-col gap-y-1">
              <span class="">Position link: </span>
              <Switch
                class="w-fit"
                v-model:checked="formState.isFullImage"
                checked-children="full"
                un-checked-children="absolute"
              />
            </div>
            <template v-if="formState.isFullImage">
              <div class="flex flex-col gap-y-1">
                <span class="">Link: </span>
                <Input v-model:value.trim="formState.full.link" :allow-clear="true" />
              </div>
              <div class="flex flex-col gap-y-1">
                <span class="">Target blank: </span>
                <Switch
                  class="w-fit"
                  v-model:checked="formState.full.isTargetBlank"
                  checked-children="true"
                  un-checked-children="false"
                />
              </div>
              <div class="flex flex-col gap-y-1">
                <span class="">Span blind: </span>
                <Input v-model:value.trim="formState.full.spanBlind" :allow-clear="true" />
              </div>
            </template>
            <template v-else>
              <Button @click="handleAddAbsoluteLink" type="primary">Add absolute link</Button>
            </template>
          </div>
        </template>
        <div
          class="flex cursor-pointer justify-center items-center size-[50px] rounded-[50%] backdrop-blur-sm bg-[#ffffff7c] text-3xl select-none"
        >
          {{ props.item.label }}
        </div>
      </Popover>
    </div>
  </div>
  <Modal
    id="MODAL"
    :open="isOpenModal && formState.absolute.length > 0"
    @cancel="handleCloseModal"
    :footer="null"
    :title="`Image ${props.item.label}`"
  >
    <template v-for="(item, index) in formState.absolute" :key="index">
      <Typography.Title :level="2" class="flex items-center gap-x-4"
        >Absolute link {{ index + 1 }}

        <Popconfirm
          title="Are you sure to delete this link?"
          @confirm="
            () => {
              formState.absolute.splice(index, 1)
            }
          "
        >
          <Button type="primary" danger>Remove</Button>
        </Popconfirm>
      </Typography.Title>
      <span>{{ item.label_position }}</span>
      <div class="flex flex-col gap-y-1">
        <span class="">Link: </span>
        <Input v-model:value.trim="item.link" :allow-clear="true" />
      </div>
      <div class="flex flex-col gap-y-1">
        <span class="">Target blank: </span>
        <Switch
          class="w-fit"
          v-model:checked="item.isTargetBlank"
          checked-children="true"
          un-checked-children="false"
        />
      </div>
      <div class="flex flex-col gap-y-1 mb-4">
        <span class="">Span blind: </span>
        <Input v-model:value.trim="item.spanBlind" :allow-clear="true" />
      </div>
    </template>
  </Modal>
</template>
<script lang="ts" setup>
import { computed, defineProps, reactive, ref, watch } from 'vue'
import IconResizeRightBottom from './icons/IconResizeRightBottom.vue'
import type { ICustomGridItemData } from '../views/LifeCare.vue'
import {
  Popover,
  Input,
  Switch,
  Typography,
  Textarea,
  Button,
  Modal,
  Popconfirm
} from 'ant-design-vue'

const props = defineProps<{
  item: ICustomGridItemData,
  isGetNewData: boolean,
}>();
const emits = defineEmits(['onGetData'])
const timerId = ref<any | null>(null)
const timerOpenOptions = ref<any | null>(null)
const indexAbsoluteModal = ref<any>(null)
const formState = reactive({
  isFullImage: true,
  src: props.item.src_image,
  full: {
    isTargetBlank: false,
    link: '',
    spanBlind: ''
  },
  absolute: [] as any[]
})

const infoAbsolute = reactive({
  isDragging: false,
  isResizing: false,
  currentOffsetX: 0,
  currentOffsetY: 0,
  currentWidth: 0,
  currentHeight: 0,
  startMouseX: 0,
  startMouseY: 0
})

const dndAreaRef = ref<HTMLElement | null>(null)

const absolutePositionStyle = computed(() => ({
  backgroundColor: randomBgColor()
}))

const isOpenModal = computed(() => indexAbsoluteModal.value !== null)
// METHODS
function handleStartDrag(e: MouseEvent, index: number) {
  const { offsetX, offsetY } = e
  const infoCurrent = (e.target as any).getBoundingClientRect()
  if (timerOpenOptions.value) {
    clearTimeout(timerOpenOptions.value)
  }
  if (
    offsetX > infoCurrent.width - 20 &&
    offsetY > infoCurrent.height - 20 &&
    !infoAbsolute.isDragging
  ) {
    handleResize(e, index)
    return
  }
  if (!infoAbsolute.isDragging) {
    infoAbsolute.isDragging = true
    infoAbsolute.currentOffsetX = e.offsetX
    infoAbsolute.currentOffsetY = e.offsetY
  }
}

function handleMouseMove(e: MouseEvent, index: number) {
  const infoCurrent = (e.target as any).getBoundingClientRect()
  if (timerId.value) {
    clearTimeout(timerId.value)
  }
  if (infoAbsolute.isDragging) {
    const infoParent = dndAreaRef.value!.getBoundingClientRect()
    const scrollTop = window.scrollY
    const scrollLeft = window.scrollX
    const x = e.pageX - scrollLeft - infoAbsolute.currentOffsetX - infoParent.left
    const y = e.pageY - scrollTop - infoAbsolute.currentOffsetY - infoParent.top
    const maxX = infoParent.right - infoParent.left - infoCurrent.width
    const maxY = infoParent.bottom - infoParent.top - infoCurrent.height
    if (x > maxX || y > maxY || x < 0 || y < 0) {
      return
    }
    // formState.absolute[index].x = ((x / infoParent.width) * 100).toFixed(2)
    // formState.absolute[index].y = ((y / infoParent.height) * 100.0).toFixed(2)
    formState.absolute[index].x = x
    formState.absolute[index].y = y
    formState.absolute[index].label_position = `position: absolute;${getPositionAbsoluteWithPercent({
      child: x,
      parent: formState.absolute[index].parent_width,
      key: 'left'
    })}${getPositionAbsoluteWithPercent({
      child: y,
      parent: formState.absolute[index].parent_height,
      key: 'top'
    })}${getPositionAbsoluteWithPercent({
      key: 'width',
      child: formState.absolute[index].w,
      parent: formState.absolute[index].parent_width
    })}${getPositionAbsoluteWithPercent({
      key: 'height',
      child: formState.absolute[index].h,
      parent: formState.absolute[index].parent_height
    })}`
    timerId.value = setTimeout(() => {
      handleStopAction(e)
    }, 1000)
  } else if (infoAbsolute.isResizing) {
    const deltaX = e.pageX - infoAbsolute.startMouseX
    const deltaY = e.pageY - infoAbsolute.startMouseY
    if (infoAbsolute.currentWidth + deltaX < 25 || infoAbsolute.currentHeight + deltaY < 25) {
      return
    }
    formState.absolute[index].w = infoAbsolute.currentWidth + deltaX
    formState.absolute[index].h = infoAbsolute.currentHeight + deltaY
    formState.absolute[index].label_position = `position: absolute;${getPositionAbsoluteWithPercent({
      child: formState.absolute[index].x,
      parent: formState.absolute[index].parent_width,
      key: 'left'
    })}${getPositionAbsoluteWithPercent({
      child: formState.absolute[index].y,
      parent: formState.absolute[index].parent_height,
      key: 'top'
    })}${getPositionAbsoluteWithPercent({
      key: 'width',
      child: formState.absolute[index].w,
      parent: formState.absolute[index].parent_width
    })}${getPositionAbsoluteWithPercent({
      key: 'height',
      child: formState.absolute[index].h,
      parent: formState.absolute[index].parent_height
    })}`
    timerId.value = setTimeout(() => {
      handleStopAction(e)
    }, 1000)
  }
}

function handleStopAction(e: MouseEvent) {
  infoAbsolute.isDragging = false
  infoAbsolute.isResizing = false
}

function handleResize(e: MouseEvent, index: number) {
  infoAbsolute.isResizing = true
  infoAbsolute.currentWidth = e.target ? (e.target as any).offsetWidth : 0
  infoAbsolute.currentHeight = e.target ? (e.target as any).offsetHeight : 0
  infoAbsolute.startMouseX = e.pageX
  infoAbsolute.startMouseY = e.pageY
}

const handleAddAbsoluteLink = () => {
  formState.absolute.push({
    parent_width: props.item.w,
    parent_height: props.item.h,
    link: '',
    isTargetBlank: true,
    spanBlind: '',
    x: 0,
    y: 0,
    w: 50,
    h: 50
  })
}

function handleOpenOptions(e: MouseEvent, index: number) {
  timerOpenOptions.value = setTimeout(() => {
    indexAbsoluteModal.value = index
  }, 150)
}

function handleCloseModal() {
  indexAbsoluteModal.value = null
}

const getPositionAbsoluteWithPercent = ({
  child,
  parent,
  key
}: {
  child: number
  parent: number
  key: string
}) => {
  return `${key}: ${((child / parent) * 100).toFixed(2)}%;`
}

const randomBgColor = () => {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  // return 'transparent'
  return `${color}7c`
}
// WATCH
watch(formState.absolute, (val) => {}, { deep: true })
watch(
  () => formState.isFullImage,
  (val) => {
    if (!val) {
      formState.full.link = ''
      formState.full.isTargetBlank = false
      formState.full.spanBlind = ''
    } else {
      formState.absolute = []
    }
  }
)
watch(
  () => props.isGetNewData,
  (val) => {
    const { isFullImage, absolute, full, src } = formState;
    emits("onGetData", {
        isFullImage,
        absolute,
        full,
        src,
      })
  }
)

watch(
  () => props.item,
  (val) => {
    formState.src = val.src_image
  },
  { immediate: true }
)

</script>


<style scoped lang="postcss">
.icon-resize {
  z-index: 0;
}
</style>
