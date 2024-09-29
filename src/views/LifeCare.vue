<script setup lang="ts">
import { Typography, Form, Button, Select, Input, message } from 'ant-design-vue'
import { reactive, ref, toRaw, watch } from 'vue';
import { DoubleLeftOutlined, CopyOutlined, DownloadOutlined } from '@ant-design/icons-vue';
import { GridLayout, GridItem } from "vue3-grid-layout-next"
// import type { GridItemData } from "vue-grid-layout";
interface GridItemData {
  x: number;
  y: number;
  w: number;
  h: number;
  i: string;
}

type IFormState = {
  size_screen?: number;
  base_url?: string;
  count_image?: number;
}

export interface ICustomGridItemData extends GridItemData {
  label?: string;
  src_image?: string;
}

const initialFormState: IFormState = {
  size_screen: undefined,
  base_url: undefined,
  count_image: undefined,
}

const screenSizes = [
  { label: 'MO (1080px)', value: 1080 },
  { label: 'PC (1184px)', value: 1184 },
]

// DATA
const formRef = ref();
const isExpandView = ref(false)
const isShowHighlight = ref(true);
const template = ref('')
const formState = reactive<IFormState>({
  size_screen: 1184,
  base_url: "https://image2.lglifecare.com/cnsEvent/202409/52598/pc_",
  count_image: 27,
})

const gridItemData = ref<ICustomGridItemData[]>([])

// METHODS
const onLoadIframe = (e: any) => {
  const iframeDoc = e.target.contentDocument || e.target.contentWindow.document;
  const style = document.createElement('style');
  style.innerHTML = `
    body {
      margin: 0;
      padding: 0;
      scrollbar-width: none;
      -ms-overflow-style: none;
      background-color: red;
    }
    ::-webkit-scrollbar {
      display: none;
    }
  `;
  iframeDoc.head.appendChild(style);
  e.target.style.height = e.target.contentWindow.document.body.scrollHeight + 'px';
};

const handleExpandView = () => {
  isExpandView.value = !isExpandView.value;
};

const handleSubmit = () => {
  formRef.value
    .validate()
    .then(async () => {
      const data = toRaw(formState);
      template.value = '';
      isShowHighlight.value = true;
      convertData(1)
    })
    .catch((error: any) => {
      // message.error(error);
    });
}

const convertData = async (data: any) => {
  const { base_url, count_image, size_screen } = formState as Required<IFormState>;
  const listImageUrls = Array.from({ length: count_image }).map((item, index) => {
    return `${base_url}${index < 9 ? "0" + (index + 1) : index + 1
      }.png`;
  });
  const getAllSizeImagePromise = listImageUrls.map((imageUrl, index) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imageUrl;
      img.onload = function () {
        resolve({
          index: index + 1,
          height: this.height,
          width: this.width,
          src: imageUrl,
        });
      };
      img.onerror = function () {
        reject("Error when load image");
      };
    });
  });
  const getAllSizeImagePromiseResult = await Promise.all(getAllSizeImagePromise).catch(
    (error) => {
      message.error(error);
    }
  ) as any[];
  // CASE_1: all image === size_screen or grid 
  const formDataAllImages: any[] = getAllSizeImagePromiseResult.reduce((result: any, cur: any) => {
    const { width } = cur;
    if (width === size_screen) {
      result.push(cur);
    } else {
      let lastItemOfRes = result[result.length - 1];
      if (Array.isArray(lastItemOfRes)) {
        if (
          lastItemOfRes.reduce((acc, cur) => acc + cur.width, 0) === size_screen
        ) {
          result = [...result, [cur]];
        } else {
          lastItemOfRes = result.pop();
          result = [...result, [...lastItemOfRes, cur]];
        }
      } else {
        result = [...result, [cur]];
      }
    }
    return result;
  }, []);

  let currentHeight = 0;
  const _gridItemData: ICustomGridItemData[] = formDataAllImages.reduce((res, cur) => {
    if (Array.isArray(cur)) {
      let items: any[] = [];
      let currentX = 0;
      cur.forEach((item, indexItem) => {
        items.push({
          x: currentX,
          y: currentHeight,
          w: item.width,
          h: item.height,
          i: `image_${item.index}`,
          label: `${item.index}`,
          src_image: item.src,
        });
        currentX += item.width;
      });
      res.push(...items);
      currentHeight += cur[0].height;
    } else {
      res.push({
        x: 0,
        y: res[res.length - 1] ? currentHeight : 0,
        w: size_screen,
        h: cur.height,
        i: `image_${cur.index}`,
        label: `${cur.index}`,
        src_image: cur.src,
      });
      currentHeight += cur.height;
    }
    return res;
  }, []);
  gridItemData.value = _gridItemData;
}
// HOOKS
watch(gridItemData, (newVal, oldVal) => {
  // console.log('WATCH GRID ITEM DATA');
  // console.table(newVal)
  // console.log("_______");
}, { deep: true });
</script>

<template>
  <Typography.Title class="">Lifecare Page</Typography.Title>
  <div class="wrapper" :style="isExpandView && { gap: '0' }">
    <div class="form-inner" :class="isExpandView ? 'w-0 overflow-hidden flex-grow-0 flex-shrink-0' : 'flex-1'">
      <Form ref="formRef" :class="['form-wrapper', isExpandView && 'hidden']" layout="vertical" :model="formState"
        :label-col="{ span: 24 }" :wrapper-col="{ span: 24 }" autocomplete="off">
        <Form.Item :wrapper-col="{ offset: 0, span: 24 }">
          <Form.Item name="size_screen" label="Screen size" :rules="[{ required: true, message: 'Required!' }]">
            <Select v-model:value="formState.size_screen">
              <Select.Option v-for="(item, index) in screenSizes" :key="index" :value="item.value">{{ item.label }}
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="base_url" label="Base url image" :rules="[{ required: true, message: 'Required!' }]">
            <Input v-model:value="formState.base_url" />
          </Form.Item>
          <Form.Item name="count_image" :rules="[{ required: true, message: 'Required!' }]" label="Count image">
            <Input v-model:value="formState.count_image" type="number" :min="0" />
          </Form.Item>
          <Button type="primary" class="block w-full" @click="handleSubmit">Submit</Button>
        </Form.Item>
      </Form>
    </div>
    <div class="highlight flex flex-col items-center" :style="{}">
      <div v-show="isShowHighlight" class="sticky w-full z-10 top-0 px-2 py-2 bg-[#ffffff88] backdrop-blur flex gap-3"
        :style="!isShowHighlight && { display: 'none' }">
        <Button shape="circle" class="btn-func" @click="handleExpandView">
          <DoubleLeftOutlined :class="isExpandView && 'rotate-180'" />
        </Button>
        <Button class="btn-func" shape="circle" @click="() => { }">
          <DownloadOutlined />
        </Button>
      </div>
      <div class="highlight-inner"
        :style="{ 'min-width': `${formState.size_screen}px`, 'max-width': `${formState.size_screen}px` }">
        <div class="">
          <grid-layout v-bind:layout="gridItemData" :col-num="formState.size_screen" :row-height="1"
            :is-draggable="false" :is-resizable="false" :is-mirrored="false" :use-css-transforms="false"
            :margin="[0, 0]">

            <grid-item v-for="item in gridItemData" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i"
              :key="item.i">
              <base-grid-item :item="item"></base-grid-item>
            </grid-item>
          </grid-layout>
        </div>
      </div>
      <!-- <iframe :srcdoc="template" frameborder="0" @load="onLoadIframe" style="width: 100%;"></iframe> -->
    </div>
  </div>
</template>

<style scoped lang="postcss">
.wrapper {
  @apply flex relative gap-8;
}

.form-inner {
  @apply transition-all duration-300;
}

.form-wrapper {
  @apply sticky top-[20px];
}

.highlight {
  @apply grow-2 shrink-2 basis-0 relative transition-all duration-300;
}

.btn-func {
  @apply flex justify-center size-10 items-center cursor-pointer;
}
</style>
