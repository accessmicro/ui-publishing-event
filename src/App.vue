<script lang="ts" setup>
import { Button, Menu } from 'ant-design-vue'
import { MailOutlined, SmileOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import type { MenuProps } from 'ant-design-vue'
import { h, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { decodeCredential } from 'vue3-google-login'

// DEFINE DATA
const route = useRoute()
const router = useRouter()
const userData = ref(JSON.parse(localStorage.getItem('user') || '{}'));
watch(route, (to, from) => {
  selectedKeys.value = [to.path === "/" ? "/ems" : to.path];
  to.path === "/" && router.push("/ems");
})
const items = ref<MenuProps['items']>([
  {
    key: '/ems',
    icon: h(MailOutlined),
    title: 'EMS',
    label: h(RouterLink, { to: '/ems' }, 'EMS')
  },
  {
    key: '/life-care',
    icon: h(SmileOutlined),
    title: 'LifeCare',
    label: h(RouterLink, { to: '/life-care' }, 'LifeCare')
  }
])
const selectedKeys = ref<string[]>([route.path])
const isCollapsedNav = ref<boolean>(true)

// EVENT HANDLER
const handleClick = (e: any) => {
  selectedKeys.value = [e.key]
}

const handleToggleNav = () => {
  isCollapsedNav.value = !isCollapsedNav.value
}

// LIFE CYCLE HOOKS
onMounted(() => {
  // const accessToken = localStorage.getItem('access_token')
  // if (!accessToken) {
  //   router.push('/login')
  // }
  // const userData: any = decodeCredential(accessToken!)
  // if (userData?.email !== "vanlung99@gmail.com") {
  //   router.push('/login')
  // }
});
const handleLogout = () => {
  localStorage.clear()
  router.push('/login')
}
</script>
<template>
  <div v-if="route.path !== '/login'" class="nav-wrapper" style="width: 256px">
    <Menu class="nav" mode="inline" theme="light" :items="items" @click="handleClick" :selected-keys="selectedKeys"
      :inline-collapsed="isCollapsedNav" />
    <div class="nav-bottom">
      <Button type="primary" :class="['toggle-nav-btn', isCollapsedNav && 'close']" @click="handleToggleNav">
        <MenuFoldOutlined />
      </Button>
    </div>
  </div>
  <div class="flex-1 min-h-screen p-4 relative bg-slate-100">
    <RouterView />
    <!-- <a-avatar class="fixed top-4 right-4 cursor-pointer" :size="64" v-if="route.path !== '/login'"
      :src="userData.picture" @dblclick="handleLogout"></a-avatar> -->
  </div>
</template>
<style scoped lang="postcss">
.nav-wrapper {
  @apply flex flex-col h-screen justify-between transition-all duration-300 sticky top-0;

  &:has(.ant-menu-inline-collapsed) {
    @apply w-[80px] !important;
  }
}

.nav {
  @apply flex-1;
}

.nav-bottom {
  @apply absolute bottom-2 left-2 right-2;
}

.toggle-nav-btn {
  @apply w-full flex justify-center items-center;

  span {
    @apply transition-transform duration-300;
  }

  &.close span {
    @apply rotate-180;
  }
}
</style>
