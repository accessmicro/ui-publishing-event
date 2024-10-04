<script setup lang="ts">
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Typography,
  message,
} from "ant-design-vue";
import { computed, reactive, ref, toRaw, watch } from "vue";
import {
  DoubleLeftOutlined,
  CopyOutlined,
  DownloadOutlined,
} from "@ant-design/icons-vue";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type { Rule } from "ant-design-vue/es/form";
import { saveAs } from "file-saver";
import { useRoute, useRouter } from "vue-router";
import { useIsChangedFormStore } from "@/stores/counter";

type IFormState = {
  title: string;
  size_banner: string | undefined;
  base_url: string;
  count: number | undefined;
  date: Dayjs;
  links: string | undefined;
};

const initialFormState: IFormState = {
  size_banner: "750",
  base_url: "https://image2.lglifecare.com/ems/202409/51930/img_",
  count: 11,
  date: dayjs().startOf("day"),
  title: "EMS",
  links: "\n\n\n\n\n\n\n\n\n\n\n",
}

const formState = reactive<IFormState>({...initialFormState});
const changedFormStore = useIsChangedFormStore()

const router = useRouter();
const route = useRoute();

const isExpandView = ref(false);
const isLoadingTemplate = ref(false);
const infoTask = computed(() => {
  const task_number = formState.base_url.split("/").reverse()[1];
  const file_name = `ems_${task_number}.html`;
  return {
    title: formState.title,
    task_number: task_number,
    month: dayjs().startOf("day").format("YYYYMM"),
    file_name: file_name,
    date: dayjs().startOf("day").format("YYYY-MM-DD"),
  };
});

const template = ref("");

const formRef = ref();

const ruleLinks: Rule[] = [
  {
    validator: async (rule, value) => {
      if (!value) {
        return Promise.reject("Please enter links");
      }
      if (formState.count === undefined) {
        return Promise.reject("Please enter count image");
      }
      const links = value.split("\n");
      if (links.length !== +(formState.count || 0) + 1) {
        return Promise.reject(`Please enter ${+formState.count + 1} links`);
      }
      return Promise.resolve();
    },
  },
];

const onSubmit = async () => {
  formRef.value
    .validate()
    .then(async () => {
      const data = toRaw(formState);
      const date = (data.date! as Dayjs).format("YYYY년 MM월 DD일");
      template.value = "";
      template.value = await getTemplate({
        base_url: data.base_url,
        count: data.count!,
        size_banner: Number(data.size_banner),
        extension: "png",
        date,
        links: (data.links as any)?.split("\n"),
      });
    })
    .catch((error: any) => {
      // message.error(error);
    });
};

const onLoadIframe = (e: any) => {
  const iframeDoc = e.target.contentDocument || e.target.contentWindow.document;
  const style = document.createElement("style");
  style.innerHTML = `
    body {
      margin: 0;
      padding: 0;
    }
  `;
  iframeDoc.head.appendChild(style);
  e.target.style.height = e.target.contentWindow.document.body.scrollHeight + "px";
};

const getTemplate = async ({
  base_url,
  count,
  extension = "png",
  size_banner,
  date,
  links,
}: {
  base_url: string;
  count: number;
  extension?: string;
  size_banner: number;
  date: string;
  links: string[];
}) => {
  const link_logo = links.shift();
  const list_image = Array.from({ length: count }).map((item, index) => {
    return `${base_url}${index < 9 ? "0" + (index + 1) : index + 1}.${extension}`;
  });
  const getAllPromise = list_image.map((imageUrl, index) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imageUrl;
      img.onload = function () {
        resolve({
          index,
          height: (this as any).height,
          width: (this as any).width,
          src: imageUrl,
          link: links[index],
        });
      };
      img.onerror = function () {
        reject("Error when load image");
      };
    });
  });
  const res: any = await Promise.all(getAllPromise).catch((error) => {
    message.error(error);
  });
  const formData = res.reduce((result: any, cur: any) => {
    const { width } = cur;
    if (width === size_banner) {
      result.push(cur);
    } else {
      let lastItemOfRes = result[result.length - 1];
      if (Array.isArray(lastItemOfRes)) {
        if (lastItemOfRes.reduce((acc, cur) => acc + cur.width, 0) === size_banner) {
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
  let template = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>EMS</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  </head><body style="margin-top: 0; margin-right: 0; margin-bottom: 0; margin-left: 0; padding-top: 0; padding-right: 0; padding-bottom: 0; padding-left: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; width: 100%; height: 100%;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" id="body-table" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-collapse: collapse; margin-top: 0; margin-right: 0; margin-bottom: 0; margin-left: 0; padding-top: 0; padding-right: 0; padding-bottom: 0; padding-left: 0; background-color: #ffffff; width: 100%; height: 100%;" height="100%" bgcolor="#ffffff">
    <tr>
      <td align="center" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-collapse: collapse;">
        <table border="0" cellpadding="0" cellspacing="0" width="${size_banner}" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-collapse: collapse;">
        <tr>
            <td width="*" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-collapse: collapse;">
              <a href="{{link_logo}}" target="_blank" title="lifecare" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; display: inline-block; text-decoration: none;">
                <img src="https://image2.lglifecare.com/ems/ems_${size_banner}@85_header.png" width="${size_banner}" height="85" alt="lifecare" style="border: 0; outline: none; text-decoration: none; vertical-align: top; -ms-interpolation-mode: bicubic;">
              </a>
            </td>
          </tr>\n`.replace("{{link_logo}}", link_logo!);

  const formDataStr = formData.map((item: any, index: number) => {
    if (Array.isArray(item)) {
      const templateRowLink = `<td width="{{width}}" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-collapse: collapse;">
      <a href="{{link}}" target="_blank" title="event" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; display: inline-block; text-decoration: none;">
        <img src="{{src}}" width="{{width}}" height="{{height}}" alt="event" style="border: 0; outline: none; text-decoration: none; vertical-align: top; -ms-interpolation-mode: bicubic;">
      </a>
    </td>`;
      const templateRow = `<td width="{{width}}" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-collapse: collapse;">
      <img src="{{src}}" width="{{width}}" height="{{height}}" alt="event" style="border: 0; outline: none; text-decoration: none; vertical-align: top; -ms-interpolation-mode: bicubic;">
  </td>`;
      return (
        `<tr>
  <td width="*" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-collapse: collapse;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-collapse: collapse;">
      <tr>` +
        item
          .map((cell) => {
            let cellTemplate = cell.link ? templateRowLink : templateRow;
            return cellTemplate
              .replace(/{{src}}/g, cell.src)
              .replace(/{{width}}/g, cell.width)
              .replace(/{{height}}/g, cell.height)
              .replace(/{{link}}/g, cell.link);
          })
          .join("\n") +
        `</tr>
      </table>
    </td>
  </tr>`
      );
    } else {
      const templateRowLinkFull = `<tr>
            <td width="*" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-collapse: collapse;">
              <a href="{{link}}" target="_blank" title="event" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; display: inline-block; text-decoration: none;">
                <img src="{{src}}" width="{{size_banner}}" height="{{height}}" alt="event" style="border: 0; outline: none; text-decoration: none; vertical-align: top; -ms-interpolation-mode: bicubic;">
              </a>
            </td>
          </tr>`;
      const templateRowFull = `<tr>
            <td width="*" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-collapse: collapse;">
                <img src="{{src}}" width="{{size_banner}}" height="{{height}}" alt="event" style="border: 0; outline: none; text-decoration: none; vertical-align: top; -ms-interpolation-mode: bicubic;">
            </td>
          </tr>`;
      let templateRow = item.link ? templateRowLinkFull : templateRowFull;
      return templateRow
        .replace(/{{src}}/g, item.src)
        .replace(/{{size_banner}}/g, item.width)
        .replace(/{{height}}/g, item.height)
        .replace(/{{link}}/g, item.link);
    }
  });
  template += formDataStr.join("\n");
  template += `\n<tr>
            <td width="*" class="footer-1" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-collapse: collapse; padding-top: 40px; padding-right: 40px; padding-bottom: 10px; padding-left: 40px; font-family: 'Malgun Gothic', '맑은 고딕'; font-size: 12px; color: #717171; line-height: 20px; background-color: #f5f5f5;" bgcolor="#f5f5f5">
              본 메일은 정보통신망법률 등 관련규정에 의거하여 <b class="bold">${date}</b>기준으로 확인한 결과, 회원님께서 이메일 수신동의를 하였기에 발송되었습니다.<br><br>
              본 메일은 <span class="point" style="font-weight: bold; color: #414141; text-decoration: none;">발신 전용 메일</span>입니다. 서비스 이용에 있어 불편 사항이나 궁금하신 점이 있으실 경우 <span class="point" style="font-weight: bold; color: #414141; text-decoration: none;">1:1 문의 또는 상담 센터(1661-4892)</span>로 문의해 주시면 전문 상담사가 빠르게 도움 드리겠습니다. 더 이상 메일 수신을 원하지 않으시면 <a class="point" href="https://v2m.lglifecare.com/auth/emailCancel?mem=[$_REJECT_$]" target="_blank" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; display: inline-block; font-weight: bold; color: #414141; text-decoration: none;">[수신거부]</a> 를 클릭해 주십시오. If you don't want to receive this e-mail anymore, please <a class="point" href="https://v2m.lglifecare.com/auth/emailCancel?mem=[$_REJECT_$]" target="_blank" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; display: inline-block; font-weight: bold; color: #414141; text-decoration: none;">[click here]</a>
              <br><br>
              메일 내 상품의 할인율은 소비자가 기준이며, 상품의 정보 및 판매가는 발송일 기준입니다. 고객님의 오픈시점에 따라 변경될 수 있음을 알려드립니다.
            </td>
          </tr>
          <tr>
            <td width="*" class="footer-2" style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-collapse: collapse; padding-top: 10px; padding-right: 40px; padding-bottom: 40px; padding-left: 40px; font-family: 'Malgun Gothic', '맑은 고딕'; font-size: 12px; color: #717171; line-height: 20px; background-color: #f5f5f5;" bgcolor="#f5f5f5">
              서울특별시 강서구 마곡중앙8로 71(마곡동) | LG CNS 대표 : 현신균 | 사업자등록번호 : 116-81-19477<br>
              통신판매업신고 : 제2018-서울강서-0071호 | 개인정보 보호 책임자 : 이희선<br>
              상담센터 : 1661-4892 | e-mail : lifecare@lgcns.com<br><br>
              <b class="bold">Copyrightⓒ LG CNS. All rights reserved</b>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  localStorage.setItem("template", template);
  return template;
};

const resetForm = () => {
  formRef.value.resetFields();
  template.value = "";
};

const handleExpandView = () => {
  isExpandView.value = !isExpandView.value;
};
const handleSaveFile = () => {
  const blob = new Blob([template.value], { type: "text/html" });
  saveAs(blob, `ems_${formState.base_url.split("/").reverse()[1]}.html`);
};
const handleCopyJson = () => {
  let jsonStr = ` ,{
    "UA": "EMS",
    "1Depth": "{{title}}",
    "2Depth": "",
    "3Depth": "",
    "Note": "",
    "Wire": "https://wire.lgcns.com/jira/browse/COMMERCE2-{{task_number}}",
    "URL": "/uxtech/linkpage/{{month}}/{{file_name}}",
    "ST": "완료",
    "Update": "{{date}}"
  }
`;
  jsonStr = jsonStr
    .replace(/{{title}}/g, infoTask.value.title)
    .replace(/{{task_number}}/g, infoTask.value.task_number)
    .replace(/{{month}}/g, infoTask.value.month)
    .replace(/{{file_name}}/g, infoTask.value.file_name)
    .replace(/{{date}}/g, infoTask.value.date);
  navigator.clipboard
    .writeText(jsonStr)
    .then(() => {
      message.success("Copy json success");
    })
    .catch(() => {
      message.error("Copy json failed");
    });
};
watch(() => formState, (newV) => {
  changedFormStore.setIsChanged(!(JSON.stringify({...newV}) === JSON.stringify(initialFormState)))
}, {
  deep: true,
})
</script>

<template>
  <main class="">
    <Typography.Title>EMS Page</Typography.Title>
    <div class="wrapper" :style="isExpandView && { gap: '0' }">
      <div class="form-inner" :class="isExpandView ? 'w-0 overflow-hidden' : 'flex-1'">
        <Form
          ref="formRef"
          :class="['form-wrapper', isExpandView && 'hidden']"
          layout="vertical"
          :model="formState"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 24 }"
          autocomplete="off"
        >
          <Form.Item
            name="title"
            label="Title task"
            :rules="[{ required: true, message: 'Required!' }]"
          >
            <Input v-model:value="formState.title" allow-clear />
          </Form.Item>
          <Form.Item
            name="size_banner"
            label="Size banner"
            :rules="[{ required: true, message: 'Required!' }]"
          >
            <Select v-model:value="formState.size_banner">
              <Select.Option
                v-for="(item, index) in [720, 750, 1184]"
                :key="index"
                :value="item"
              />
            </Select>
          </Form.Item>
          <Form.Item
            name="base_url"
            label="Base url image"
            :rules="[{ required: true, message: 'Required!' }]"
          >
            <Input v-model:value="formState.base_url" allow-clear />
          </Form.Item>
          <Form.Item
            name="count"
            :rules="[{ required: true, message: 'Required!' }]"
            label="Count image"
          >
            <Input v-model:value="formState.count" type="number" :min="0" />
          </Form.Item>
          <Form.Item
            name="date"
            label="Date footer"
            :rules="[{ required: true, message: 'Required!' }]"
          >
            <DatePicker v-model:value="formState.date" class="w-full" />
          </Form.Item>
          <a-form-item
            :label="`Links: Logo + ${formState.count || '_'} links of images`"
            name="links"
            :rules="ruleLinks"
          >
            <a-textarea
              v-model:value="formState.links"
              :autoSize="{ minRows: 5, maxRows: 10 }"
              allow-clear
            />
          </a-form-item>
          <Form.Item :wrapper-col="{ offset: 0, span: 24 }">
            <Button
              :loading="isLoadingTemplate"
              :disabled="isLoadingTemplate"
              type="primary"
              class="block w-full"
              @click="onSubmit"
              >Submit</Button
            >
          </Form.Item>
          <Form.Item :wrapper-col="{ offset: 0, span: 24 }">
            <Button type="default" class="block w-full" @click="resetForm">Reset</Button>
          </Form.Item>
        </Form>
      </div>
      <div class="highlight" :style="{ minHeight: formState.size_banner }">
        <div
          class="sticky top-0 px-2 py-2 bg-[#ffffff88] backdrop-blur flex gap-3"
          :style="!template && { display: 'none' }"
        >
          <Button
            v-show="!!template"
            shape="circle"
            class="btn-func"
            @click="handleExpandView"
          >
            <DoubleLeftOutlined :class="isExpandView && 'rotate-180'" />
          </Button>
          <Button
            class="btn-func"
            v-show="!!template"
            shape="circle"
            @click="handleSaveFile"
          >
            <DownloadOutlined />
          </Button>
          <Button shape="circle" class="btn-func" @click="handleCopyJson">
            <template #icon>
              <CopyOutlined />
            </template>
          </Button>
        </div>
        <iframe
          :srcdoc="template"
          frameborder="0"
          @load="onLoadIframe"
          style="width: 100%"
        ></iframe>
      </div>
    </div>
  </main>
</template>
<style scoped lang="postcss">
.wrapper {
  @apply flex relative gap-8;
}

.form-inner {
  transition: all 0.3s;
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
