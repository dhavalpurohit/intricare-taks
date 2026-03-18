<script lang="ts" setup>
import navItems from '@/navigation/vertical'
import { themeConfig } from '@themeConfig'

// Components
import UserProfile from '@/layouts/components/UserProfile.vue'
import NavBarI18n from '@core/components/I18n.vue'

// @layouts plugin
import { VerticalNavLayout } from '@layouts'

import { useConfigStore } from '@core/stores/config'
import { useLayoutConfigStore } from '@layouts/stores/config'
import { injectionKeyIsVerticalNavHovered } from '@layouts/symbols'
import { computed, inject, ref } from 'vue'
import { useRoute } from 'vue-router'

const configStore = useConfigStore()
const layoutConfigStore = useLayoutConfigStore()
const isVerticalNavHovered = inject(injectionKeyIsVerticalNavHovered) || ref(false)
const isMini = layoutConfigStore.isVerticalNavMini(isVerticalNavHovered)

const route = useRoute()
const breadcrumbs = computed(() => {
  if (route.path.includes('/campaign/create')) {
    return [
      { title: '', to: '/' },
      { title: 'Campaign', to: '/campaign' },
      { title: 'Advance Campaign', disabled: true }
    ]
  }
  return [
    { title: '', to: '/' },
    { title: 'Campaign', disabled: true }
  ]
})
</script>

<template>
  <VerticalNavLayout :nav-items="navItems">
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <IconBtn
          id="vertical-nav-toggle-btn"
          class="ms-n3 d-lg-none"
          @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon
            size="26"
            icon="tabler-menu-2"
          />
        </IconBtn>

        <!-- Breadcrumbs -->
        <VBreadcrumbs :items="breadcrumbs" class="px-0">
          <template #prepend>
            <VIcon icon="tabler-smart-home" size="18" color="primary" />
          </template>
        </VBreadcrumbs>

        <VSpacer />

        <NavBarI18n
          v-if="themeConfig.app.i18n.enable && themeConfig.app.i18n.langConfig?.length"
          :languages="themeConfig.app.i18n.langConfig"
        />
        <!-- User Profile right aligned in header -->
        <div class="d-flex align-center">
            <div class="text-right me-3 d-none d-sm-block">
              <div class="text-subtitle-2 font-weight-bold">John Doe</div>
              <div class="text-caption text-disabled" style="line-height: 1;">Admin</div>
            </div>
            <UserProfile />
        </div>
      </div>
    </template>

    <template #after-vertical-nav-items>
      <!-- Bottom Sidebar Card -->
      <div :class="isMini ? 'pa-2' : 'pa-4'">
        <VCard elevation="0" color="platinum-gray-color" class="mb-4" :class="isMini ? 'px-1 py-3' : ''">
          <VCardText :class="isMini ? 'pa-0 d-flex flex-column align-center' : 'pa-3'">
            <div class="d-flex align-center w-100" :class="isMini ? 'justify-center' : 'mb-3'">
              <VBadge dot location="bottom right" offset-x="3" offset-y="3" bordered color="success">
                <VAvatar color="primary" variant="tonal" :size="isMini ? 36 : 40">
                  <img src="@images/avatars/avatar-1.png" alt="Avatar" width="40" height="40" style="object-fit: cover;" />
                </VAvatar>
              </VBadge>
              <div v-show="!isMini" class="ms-3 flex-grow-1">
                <div class="text-sm font-weight-medium">John Doe</div>
                <div class="text-xs text-disabled">Admin</div>
              </div>
              <IconBtn v-show="!isMini" variant="flat" class="rounded" size="small" style=" background-color: #e1e7f1; color: #141b34 !important;" to="/login">
                <VIcon icon="tabler-logout" size="18" />
              </IconBtn>
            </div>
            <div v-show="!isMini" class="w-100">
              <div class="text-xs text-disabled">Email</div>
              <div class="text-sm font-weight-medium" style="word-break: break-all;">johndoe@gmail.com</div>
            </div>
          </VCardText>
        </VCard>


        <div class="d-flex" :class="isMini ? 'justify-center overflow-hidden' : 'bg-platinum-gray-color pa-1 rounded-pill'">
          <VBtnToggle
            v-model="configStore.theme"
            mandatory
            class="border-none bg-transparent"
            :class="isMini ? 'flex-column pa-0 theme-toggle-mini' : 'w-100 bg-platinum-gray-color pa-2 rounded-pill'"
            :style="isMini ? 'gap: 0; block-size: auto;' : 'block-size: 3.125rem;'"
            :selected-class="`bg-surface elevation-1 text-high-emphasis ${isMini ? 'mini-active-btn' : 'rounded-pill'}`"
          >
            <VBtn value="light" variant="text" class="text-none text-high-emphasis opacity-100" :class="isMini ? 'pa-0 mini-btn' : 'flex-grow-1 rounded-pill'" :style="'block-size: 2.5rem !important;'" :ripple="false">
              <VIcon icon="tabler-sun" :size="isMini ? 22 : 20" :class="!isMini && 'me-2'" />
              <span v-show="!isMini" style="font-size: 16px; font-weight: 500;">Light</span>
            </VBtn>
            <VBtn value="dark" variant="text" class="text-none text-high-emphasis opacity-100" :class="isMini ? 'pa-0 mini-btn' : 'flex-grow-1 rounded-pill'" :style="'block-size: 2.5rem !important;'" :ripple="false">
              <VIcon icon="tabler-moon" :size="isMini ? 22 : 20" :class="!isMini && 'me-2'" />
              <span v-show="!isMini" style="font-size: 16px; font-weight: 500;">Dark</span>
            </VBtn>
          </VBtnToggle>
        </div>
      </div>  
    </template>

    <!-- 👉 Pages -->
    <slot />

    <!-- 👉 Footer -->
    <!-- <template #footer>
      <Footer />
    </template> -->

    <!-- 👉 Customizer -->
    <!-- <TheCustomizer /> -->
  </VerticalNavLayout>
</template>

<style lang="scss">
.theme-toggle-mini {
  overflow: visible !important;
}

.mini-btn {
  padding: 0 !important;
  border-radius: 50% !important;
  margin: 0 !important;
  block-size: 2.5rem !important;
  inline-size: 2.5rem !important;
  max-inline-size: 2.5rem !important;
  min-inline-size: 2.5rem !important;

  .v-btn__overlay,
  .v-ripple__container {
    border-radius: 50% !important;
  }
}

.mini-active-btn {
  border-radius: 50% !important;
}
</style>
