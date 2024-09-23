<script setup lang="ts">
import { Button, DatePicker, Form, Input, Select, Typography } from 'ant-design-vue';
import { reactive, ref, toRaw } from 'vue';
import templateStr from '../../templateString';
import { DoubleLeftOutlined } from '@ant-design/icons-vue';

const formState = reactive({
  size_banner: '',
  base_url: '',
  count: undefined,
  date: undefined,
});

const isExpandView = ref(false);

const template = ref('');

const formRef = ref();

const onSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      console.log('values', formState, toRaw(formState));
      template.value = templateStr
    })
    .catch((error: any) => {
      console.log('error', error);
    });
};

const onLoadIframe = (e: any) => {
  console.log('e', e)
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
      #body-table > tbody > tr > td {
        background-color: #f0f0f0;
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
</script>

<template>
  <main>
    <Typography.Title>ESM Page</Typography.Title>
    <div class="wrapper">
      <div class="form-inner" :class="isExpandView ? 'w-0 overflow-hidden' : 'flex-1'">
        <Form ref="formRef" :class="['form-wrapper', isExpandView && 'hidden']" layout="vertical" :model="formState"
          :label-col="{ span: 24 }" :wrapper-col="{ span: 24 }" autocomplete="off">
          <Form.Item name="size_banner" label="Size banner" :rules="[{ required: true, message: 'Required!' }]">
            <Select v-model:value="formState.size_banner">
              <Select.Option value="720">720</Select.Option>
              <Select.Option value="750">750</Select.Option>
              <Select.Option value="1184">1184</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="base_url" label="Base url image" :rules="[{ required: true, message: 'Required!' }]">
            <Input v-model:value="formState.base_url" />
          </Form.Item>
          <Form.Item name="count" :rules="[{ required: true, message: 'Required!' }]" label="Count image">
            <Input v-model:value="formState.count" type="number" />
          </Form.Item>
          <Form.Item name="date" label="Date footer" :rules="[{ required: true, message: 'Required!' }]">
            <DatePicker v-model:value="formState.date" class="w-full" />
          </Form.Item>
          <Form.Item :wrapper-col="{ offset: 0, span: 24 }">
            <Button type="primary" class="block w-full" @click="onSubmit">Submit</Button>
          </Form.Item>
        </Form>
      </div>
      <div class="highlight" :style="{ minHeight: formState.size_banner }">
        <Button v-show="!!template" shape="circle"
          class="flex justify-center size-10 items-center cursor-pointer absolute top-10 left-0 transform -translate-x-[50%]"
          @click="handleExpandView">
          <DoubleLeftOutlined :class="isExpandView && 'rotate-180'" />
        </Button>
        <iframe :srcdoc="template" frameborder="0" @load="onLoadIframe" style="width: 100%;"></iframe>
      </div>
    </div>
  </main>
</template>
<style scoped>
.wrapper {
  display: flex;
  gap: 50px;
  position: relative;
}

.form-inner {
  transition: all 0.3s;
}

.form-wrapper {
  position: sticky;
  top: 20px;
}

.highlight {
  flex: 2;
  position: relative;
  transition: all 0.3s;
}
</style>
