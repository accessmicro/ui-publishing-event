<script lang="ts" setup>
import { Button, Menu, Modal } from 'ant-design-vue'
import { MailOutlined, SmileOutlined, MenuFoldOutlined, FundProjectionScreenOutlined, MedicineBoxOutlined } from '@ant-design/icons-vue'
import Version from "@/components/Version.vue"
import type { MenuProps } from 'ant-design-vue'
import { h, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { decodeCredential } from 'vue3-google-login'
import { useIsChangedFormStore } from './stores/counter'
import { storeToRefs } from 'pinia'

// DEFINE DATA
const route = useRoute()
const router = useRouter()
const redirectTo = ref<string | null>(null);
const changedFormStore = useIsChangedFormStore()
const { getIsChanged } = storeToRefs(changedFormStore)
watch(route, (to, from) => {
  selectedKeys.value = [to.path === "/" ? "/ems" : to.path];
  to.path === "/" && router.push("/ems");
})
const items = ref<MenuProps['items']>([
  {
    key: '/event-guide',
    icon: h(SmileOutlined),
    title: 'Event Guide',
    label: 'Event Guide',
    onClick: () => handleClickRedirect('/event-guide'),
    // label: h(RouterLink, { to: '/ems' }, 'EMS')
  },
  {
    key: '/ems',
    icon: h(MailOutlined),
    title: 'EMS',
    label: 'EMS',
    onClick: () => handleClickRedirect('/ems'),
    // label: h(RouterLink, { to: '/ems' }, 'EMS')
  },
  {
    key: '/life-care',
    icon: h(MedicineBoxOutlined),
    title: 'LifeCare',
    label: 'LifeCare',
    onClick: () => handleClickRedirect('/life-care'),
    // label: h(RouterLink, { to: '/life-care' }, 'LifeCare')
  },
  {
    key: '/pral',
    icon: h(FundProjectionScreenOutlined),
    title: 'Pral Page',
    label: 'Pral',
    onClick: () => handleClickRedirect('/pral'),
    // label: h(RouterLink, { to: '/pral' }, 'Pral')
  }
])
const selectedKeys = ref<string[]>([route.path])
const isCollapsedNav = ref<boolean>(true)

// EVENT HANDLER
const handleClick = (e: any) => {
  selectedKeys.value = [e.key]
}

const handleClickRedirect = (path: string) => {
  if (getIsChanged.value) {
    redirectTo.value = path
  }
  else router.push(path)
}
const handleRedirect = () => {
  changedFormStore.setIsChanged(false)
  redirectTo.value && router.push(redirectTo.value)
  redirectTo.value = null
}
const handleClose = () => {
  redirectTo.value = null
}
</script>
<template>
  <div v-if="route.path !== '/login'" class="nav-wrapper" style="width: 256px">
    <Menu class="nav" mode="inline" theme="light" :items="items" @click="handleClick" :selected-keys="selectedKeys"
      :inline-collapsed="isCollapsedNav" />
    <div class="nav-bottom">
      <Version />
      <Button type="primary" :class="['toggle-nav-btn', isCollapsedNav && 'close']" @click="isCollapsedNav = !isCollapsedNav">
        <MenuFoldOutlined />
      </Button>
    </div>
  </div>
  <div class="flex-1 min-h-screen p-4 relative bg-slate-100">
    <RouterView />
    <Modal :open="!!redirectTo" title="Warning" ok-text="Yes" cancel-text="No" @ok="handleRedirect" @cancel="handleClose">
      <p>Are you sure you want to leave this page?</p>
    </Modal>
  </div>
</template>
<style scoped lang="scss">
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
  @apply absolute bottom-2 left-2 right-2 flex flex-col gap-2;
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
