<template>
  <div class="flex items-center justify-center h-full">
    <GoogleLogin class="" :callback="callback" prompt>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login Using
        Google</button>
    </GoogleLogin>
  </div>
</template>

<script lang="ts" setup>
import { onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import type { CallbackTypes } from 'vue3-google-login';
import { decodeCredential, GoogleLogin } from 'vue3-google-login';
import { message } from 'ant-design-vue';
import type { MessageInstance, NoticeType } from 'ant-design-vue/es/message/interface';

const router = useRouter();
let timerId: any = null;

const showMessage = (type: NoticeType, content: any) => {
  message[type]({
    content: content,
    key: 'login',
    duration: 1.5
  });
}

const callback: CallbackTypes.CodeResponseCallback = (response: any) => {
  console.log(`😮‍💨 ~ response:`, response);
  showMessage('info', 'Loading...');
  if (!response.credential) {
    return showMessage('error', 'FAILED');
  }
  const userData: any = decodeCredential(response.credential)
  const accessToken = response.credential;
  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('user', JSON.stringify(userData));
  if (userData?.email === "vanlung99@gmail.com") {
    showMessage('success', 'SUCCESS');
    timerId = setTimeout(() => {
      router.push('/ems')
    }, 1500);
  } else {
    console.log("FAILED");
    showMessage('error', 'FAILED');
  }
}
onUnmounted(() => {
  timerId && clearTimeout(timerId);
})
</script>

<style lang="scss" scoped></style>