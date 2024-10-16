<script setup lang="ts">
import { Typography, Form, Button, Select, Input, message, Switch, Textarea, RadioButton, RadioGroup } from 'ant-design-vue'
import { computed, reactive, ref, toRaw, watch } from 'vue'
import { DoubleLeftOutlined, CopyOutlined, DownloadOutlined } from '@ant-design/icons-vue'
import { GridLayout, GridItem } from 'vue3-grid-layout-next'
import { saveAs } from 'file-saver'
import { MO_MAIN_TEMPLATE, PC_MAIN_TEMPLATE } from '@/data/lifecare'
import dayjs from 'dayjs'
import { TEMPLATE_DEFAULT } from '@/data/pral'
// import type { GridItemData } from "vue-grid-layout";
interface GridItemData {
  x: number
  y: number
  w: number
  h: number
  i: string
}

type IFormState = {
  title?: string
  size_screen?: number
  base_url?: string
  count_image?: number
  data: any[]
  type: 'live' | 'benefit' | 'promotion'
  formDataTemplate: any[]
  isCustomListImageLink?: boolean
  listCustomLink?: string
}

export interface ICustomGridItemData extends GridItemData {
  label?: string
  src_image?: string
}

const initialFormState: IFormState = {
  size_screen: undefined,
  base_url: undefined,
  count_image: undefined,
  data: [],
  type: 'live',
  formDataTemplate: [],
  isCustomListImageLink: false,
  listCustomLink: ''
}

const screenSizes = [
  { label: 'MO (1080px)', value: 1080 },
  { label: 'PC (1184px)', value: 1184 }
]

// DATA
const timerId = ref<any>(null)
const formRef = ref()
const keyGridComp = ref(0)
const isExpandView = ref(false)
const isShowHighlight = ref(true)
const template = ref('')
const isGetGridItemData = ref(false)
const isSaveBosFile = ref(false)
const formState = reactive<IFormState>({
  size_screen: screenSizes[1].value,
  base_url: `https://img2.lgpral.kr/pral/bos/${dayjs().startOf('day').format('YYYYMM')}/53334/pc_pral_live_`,
  count_image: 10,
  data: [],
  type: 'live',
  formDataTemplate: [],
  title: 'SAMPLE',
  isCustomListImageLink: false,
  listCustomLink: undefined
})

const gridItemData = ref<ICustomGridItemData[]>([])
const customListImage = computed(() => {
  if (!formState.listCustomLink) return []
  return formState.listCustomLink!.split('\n').map((item) => item.trim())
})

const nameFile = computed(() => {
  return `${formState.size_screen === 1080 ? 'mo' : 'pc'}_pral_${
    formState.base_url!.split('_').reverse()[1]
  }_${dayjs().startOf('day').format('MMDD')}.html`
})

// METHODS
const handleExpandView = () => {
  isExpandView.value = !isExpandView.value
}

const handleSubmit = () => {
  formRef.value
    .validate()
    .then(async () => {
      keyGridComp.value++
      template.value = ''
      isShowHighlight.value = true
      convertData()
    })
    .catch((error: any) => {
      message.error(error)
    })
}

const convertData = async () => {
  const { base_url, count_image, size_screen, isCustomListImageLink } =
    formState as Required<IFormState>
  const listImageUrls = isCustomListImageLink
    ? customListImage.value
    : Array.from({ length: count_image }).map((item, index) => {
        return `${base_url}${index < 9 ? '0' + (index + 1) : index + 1}.png`
      })
  const getAllSizeImagePromise = listImageUrls.map((imageUrl, index) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.src = imageUrl
      img.onload = function () {
        resolve({
          index: index + 1,
          height: (this as any).height,
          width: (this as any).width,
          src: imageUrl
        })
      }
      img.onerror = function () {
        reject('Error when load image')
      }
    })
  })
  const getAllSizeImagePromiseResult = (await Promise.all(getAllSizeImagePromise).catch((error) => {
    message.error(error)
  })) as any[]
  // CASE_1: all image === size_screen or grid
  const formDataAllImages: any[] = getAllSizeImagePromiseResult?.reduce((result: any, cur: any) => {
    const { width } = cur
    if (width === size_screen) {
      result.push(cur)
    } else {
      let lastItemOfRes = result[result.length - 1]
      if (Array.isArray(lastItemOfRes)) {
        if (lastItemOfRes.reduce((acc, cur) => acc + cur.width, 0) === size_screen) {
          result = [...result, [cur]]
        } else {
          lastItemOfRes = result.pop()
          result = [...result, [...lastItemOfRes, cur]]
        }
      } else {
        result = [...result, [cur]]
      }
    }
    return result
  }, [])

  formState.formDataTemplate = formDataAllImages
  let currentHeight = 0
  const _gridItemData: ICustomGridItemData[] = formDataAllImages?.reduce((res, cur) => {
    if (Array.isArray(cur)) {
      let items: any[] = []
      let currentX = 0
      cur.forEach((item, indexItem) => {
        items.push({
          x: currentX,
          y: currentHeight,
          w: item.width,
          h: item.height,
          i: `image_${item.index}`,
          label: `${item.index}`,
          src_image: item.src
        })
        currentX += item.width
      })
      res.push(...items)
      currentHeight += cur[0].height
    } else {
      res.push({
        x: 0,
        y: res[res.length - 1] ? currentHeight : 0,
        w: size_screen,
        h: cur.height,
        i: `image_${cur.index}`,
        label: `${cur.index}`,
        src_image: cur.src
      })
      currentHeight += cur.height
    }
    return res
  }, [])
  gridItemData.value = _gridItemData
}

function handleDownloadFile() {
  if (!gridItemData.value.length) {
    message.error('Please submit data first!')
    return
  }
  if (timerId.value) {
    clearTimeout(timerId.value)
  }
  // if (formState.data.length === formState.count_image) {
    timerId.value = setTimeout(() => {
      const data = formState.formDataTemplate.map((item, index) => {
        if (Array.isArray(item)) {
          return item.map((subItem, subIndex) => {
            return {
              ...subItem,
              ...formState.data.find((val: any) => val.src === subItem.src)
            }
          })
        }
        return {
          ...item,
          ...formState.data.find((val: any) => val.src === item.src)
        }
      })
      let templateStr = ''
      data.forEach((item, index) => {
        if (Array.isArray(item)) {
          const listItemInGrid = item.map((subItem: any, subIndex: number) => {
            if (subItem.isFullImage) {
              if (subItem.full.link) {
                return TEMPLATE_DEFAULT.fullHaveLink
                  .replace('{{src}}', subItem.src)
                  .replace('{{link}}', subItem.full.link)
                  .replace('{{target_blank}}', subItem.full.isTargetBlank ? 'target="_blank"' : '')
                  .replace('{{spanBlind}}', subItem.full.spanBlind || '')
              } else {
                return TEMPLATE_DEFAULT.fullNotLink.replace('{{src}}', subItem.src)
              }
            } else {
              const listAbsoluteLinkStr = subItem.absolute.map(
                (absoluteItem: any, index: number) => {
                  let position = absoluteItem.label_position?.replace(/\n/g, '')
                  return TEMPLATE_DEFAULT.onlyLink
                    .replace('{{link}}', absoluteItem.link)
                    .replace('{{position}}', position || 'position: absolute;')
                    .replace(
                      '{{target_blank}}',
                      absoluteItem.isTargetBlank ? 'target="_blank"' : ''
                    )
                    .replace('{{spanBlind}}', absoluteItem.spanBlind || '')
                }
              )
              return TEMPLATE_DEFAULT.absoluteLinks
                .replace('{{src}}', subItem.src)
                .replace('{{list_link}}', listAbsoluteLinkStr.join(''))
            }
          })
          templateStr += TEMPLATE_DEFAULT.grid
            .replace('{{col}}', item.length + '')
            .replace('{{list_link}}', listItemInGrid.join(''))
        } else {
          const { src, width, height, isFullImage, absolute, full } = item
          if (isFullImage) {
            if (full.link) {
              templateStr += TEMPLATE_DEFAULT.fullHaveLink
                .replace('{{src}}', src)
                .replace('{{link}}', full.link)
                .replace('{{target_blank}}', full.isTargetBlank ? 'target="_blank"' : '')
                .replace('{{spanBlind}}', full.spanBlind || '')
            } else {
              templateStr += TEMPLATE_DEFAULT.fullNotLink.replace('{{src}}', src)
            }
          } else {
            const listAbsoluteLinkStr = absolute.map((absoluteItem: any, index: number) => {
              let position = absoluteItem.label_position?.replace(/\n/g, '')
              return TEMPLATE_DEFAULT.onlyLink
                .replace('{{link}}', absoluteItem.link)
                .replace('{{position}}', position || 'position: absolute;')
                .replace('{{target_blank}}', absoluteItem.isTargetBlank ? 'target="_blank"' : '')
                .replace('{{spanBlind}}', absoluteItem.spanBlind || '')
            })
            templateStr += TEMPLATE_DEFAULT.absoluteLinks
              .replace('{{src}}', src)
              .replace('{{list_link}}', listAbsoluteLinkStr.join(''))
          }
        }
      })
      templateStr = TEMPLATE_DEFAULT.root
        .replace('{{template}}', templateStr)
        .replace('{{head}}', TEMPLATE_DEFAULT.head[formState.size_screen === 1080 ? 'mo' : 'pc'])
        .replace('{{title}}', formState.title || 'SAMPLE')
        .replace(
          '{{footer}}',
          TEMPLATE_DEFAULT.footer[formState.size_screen === 1080 ? 'mo' : 'pc']
        )
        .replace(/<span class="blind"><\/span>/g, '')
      handleSaveFile({
        template: templateStr,
        nameFile: nameFile.value
      })
      isSaveBosFile.value = false
    }, 1000)
  // }
}

function onGetData({ index, data }: { index: number; data: any }) {
  console.log('CHANGE DATA', index)
  formState.data[index] = data
}

const handleSaveFile = ({ template, nameFile }: { template: string; nameFile?: string }) => {
  const blob = new Blob([template], { type: 'text/html' })
  saveAs(blob, nameFile)
}

const handleCopyJson = () => {
  let SAMPLE_JSON = ` ,{
    "UA": "{{device}}",
    "1Depth": "{{title}}",
    "2Depth": "",
    "3Depth": "",
    "Note": "",
    "Wire": "https://wire.lgcns.com/jira/browse/COMMERCE2-{{issue}}",
    "URL": "/uxtech/linkpage/{{month}}/{{file}}",
    "ST": "완료",
    "Update": "{{date}}"
  }`
  const task_number = formState.base_url!.split('/').reverse()[1]
  const device = formState.size_screen === 1080 ? 'MO' : 'PC'
  const jsonStr = SAMPLE_JSON.replace('{{title}}', formState.title || '')
    .replace('{{device}}', device)
    .replace('{{month}}', dayjs().startOf('day').format('YYYYMM'))
    .replace('{{file}}', nameFile.value)
    .replace('{{date}}', dayjs().startOf('day').format('YYYY-MM-DD'))
    .replace('{{issue}}', task_number)
  navigator.clipboard
    .writeText(jsonStr)
    .then(() => {
      message.success('Copy json success!')
    })
    .catch(() => {
      message.error('Copy json failed!')
    })
}

watch(
  [() => formState.size_screen, () => formState.type],
  ([newSizeScreen, newType]) => {
    formState.base_url = formState.base_url?.replace(
      /\/(mo|pc)_pral/,
      `/${newSizeScreen === 1080 ? 'mo' : 'pc'}_pral`
    )?.replace(/(live|benefit|promotion)_/, `${newType}_`)
  },
)
</script>

<template>
  <Typography.Title class="">Pral Page</Typography.Title>
  <div class="flex relative gap-8" :style="isExpandView && { gap: '0' }">
    <div
      class="transition-all duration-300"
      :class="
        isExpandView ? 'w-0 overflow-hidden flex-grow-0 flex-shrink-0' : 'flex-1 min-w-[300px]'
      "
    >
      <Form
        ref="formRef"
        :class="[isExpandView && 'hidden']"
        class="sticky top-5"
        layout="vertical"
        :model="formState"
        :label-col="{ span: 24 }"
        :wrapper-col="{ span: 24 }"
        autocomplete="off"
      >
        <Form.Item :wrapper-col="{ offset: 0, span: 24 }">
          <Form.Item
            name="title"
            label="Title task"
            :rules="[{ required: true, message: 'Required!' }]"
          >
            <Input v-model:value.trim="formState.title" :allow-clear="true" />
          </Form.Item>
          <Form.Item
            name="size_screen"
            label="Screen size"
            :rules="[{ required: true, message: 'Required!' }]"
          >
            <Select v-model:value="formState.size_screen">
              <Select.Option v-for="(item, index) in screenSizes" :key="index" :value="item.value"
                >{{ item.label }}
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="type" label="Type"
          :rules="[{ required: true, message: 'Required!' }]">
            <RadioGroup v-model:value="formState.type" button-style="solid">
              <RadioButton v-for="(type) in ['live', 'benefit', 'promotion']" :key="type" :value="type">{{ type.toUpperCase() }}</RadioButton>
            </RadioGroup>
          </Form.Item>
          <template v-if="!formState.isCustomListImageLink">
            <Form.Item
              name="base_url"
              label="Base url image"
              :rules="[{ required: true, message: 'Required!' }]"
            >
              <Textarea v-model:value.trim="formState.base_url" :allow-clear="true" />
            </Form.Item>
            <Form.Item
              name="count_image"
              :rules="[{ required: true, message: 'Required!' }]"
              label="Count image"
            >
              <Input
                v-model:value="formState.count_image"
                type="number"
                :min="0"
                :allow-clear="true"
              />
            </Form.Item>
          </template>
          <template v-else>
            <Form.Item name="listCustomLink" :label="'List image: ' + customListImage.length">
              <Textarea v-model:value="formState.listCustomLink" :allow-clear="true" :rows="5" />
            </Form.Item>
          </template>
          <Button type="primary" class="block w-full" @click="handleSubmit">Submit</Button>
        </Form.Item>
      </Form>
    </div>
    <div
      :class="[
        'highlight flex flex-col items-center bg-white grow-2 shrink-2 relative transition-all duration-300',
        formState.size_screen === 1080 ? 'basis-[1080px]' : 'basis-[1184px]'
      ]"
      :style="gridItemData.length === 0 && { opacity: 0 }"
    >
      <div
        v-show="isShowHighlight"
        class="sticky items-center w-full z-10 top-0 px-2 py-2 bg-[#ffffff88] backdrop-blur flex gap-3"
        :style="!isShowHighlight && { display: 'none' }"
      >
        <Button shape="circle" class="btn-func" @click="handleExpandView">
          <DoubleLeftOutlined :class="isExpandView && 'rotate-180'" />
        </Button>
        <Button shape="circle" class="btn-func" @click="handleDownloadFile">
          <template #icon>
            <DownloadOutlined />
          </template>
        </Button>
        <Button shape="circle" class="btn-func" @click="handleCopyJson">
          <template #icon>
            <CopyOutlined />
          </template>
        </Button>
      </div>
      <div
        class="highlight-inner"
        :style="{
          'min-width': `${formState.size_screen}px`,
          'max-width': `${formState.size_screen}px`
        }"
      >
        <div class="">
          <grid-layout
            :key="keyGridComp"
            v-bind:layout="gridItemData"
            :col-num="formState.size_screen"
            :row-height="1"
            :is-draggable="false"
            :is-resizable="false"
            :is-mirrored="false"
            :use-css-transforms="false"
            :margin="[0, 0]"
          >
            <grid-item
              v-for="(item, index) in gridItemData"
              :x="item.x"
              :y="item.y"
              :w="item.w"
              :h="item.h"
              :i="item.i"
              :key="item.i"
            >
              <base-grid-item
                :item="item"
                :isGetNewData="isGetGridItemData"
                @on-get-data="(data: any) => onGetData({
                index,
                data
              })"
              ></base-grid-item>
            </grid-item>
          </grid-layout>
        </div>
      </div>
      <!-- <iframe :srcdoc="template" frameborder="0" @load="onLoadIframe" style="width: 100%;"></iframe> -->
    </div>
  </div>
</template>
