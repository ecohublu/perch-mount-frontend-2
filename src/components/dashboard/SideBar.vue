<template>
  <div class="card flex justify-center">
    <Drawer v-model:visible="visible">
      <template #container="{ closeCallback }">
        <div class="flex flex-col h-full overflow-y-auto">
          <div class="flex items-center justify-between px-6 pt-4 shrink-0">
            <span class="inline-flex items-center gap-2">
              <span class="font-semibold text-2xl text-primary">PerchAI</span>
            </span>
            <span>
              <Button
                type="button"
                @click="closeCallback"
                icon="pi pi-times"
                rounded
                outlined
              ></Button>
            </span>
          </div>
          <div v-for="group in sidebarData">
            <ul class="list-none p-4 m-0">
              <li>
                <div
                  v-ripple
                  v-styleclass="{
                    selector: '@next',
                    enterFromClass: 'hidden',
                    enterActiveClass: 'animate-slidedown',
                    leaveToClass: 'hidden',
                    leaveActiveClass: 'animate-slideup',
                  }"
                  class="p-4 flex items-center justify-between text-surface-500 dark:text-surface-400 cursor-pointer p-ripple"
                >
                  <span class="font-medium">{{ group.name }}</span>
                  <i class="pi pi-chevron-down"></i>
                </div>
                <ul class="list-none p-0 m-0 overflow-hidden">
                  <li v-for="item in group.items">
                    <router-link :to="item.to">
                      <a
                        v-ripple
                        class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                      >
                        <i class="pi mr-2" :class="[item.icon]"></i>
                        <span class="font-medium">{{ item.name }}</span>
                      </a>
                    </router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="mt-auto">
            <hr class="mb-4 mx-4 border-t border-0 border-surface-200 dark:border-surface-700" />
            <router-link to="/app/me">
              <a
                v-ripple
                class="m-4 flex items-center cursor-pointer p-4 gap-2 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
              >
                <Avatar :image="me.profile_picture_url" shape="circle" />
                <span class="font-bold">{{ me.display_name }}</span>
              </a>
            </router-link>
          </div>
        </div>
      </template>
    </Drawer>
  </div>
  <Button class="fixed top-4 left-4 z-50" icon="pi pi-bars" @click="visible = true" rounded />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { sidebarData } from '@/constants/sidebar'

const visible = ref(false)

const me = ref({
  activated: true,
  blocked: false,
  display_name: 'Tatsutomo Chin',
  first_name: 'Tatsutomo',
  gmail: 'raymond96383@gmail.com',
  id: '770b2f83-566d-4a27-ba11-591b39a64305',
  is_admin: true,
  is_super_admin: true,
  last_name: 'Chin',
  oidc_sub: '116890993280167161836',
  position: 'part_time',
  profile_picture_url:
    'https://lh3.googleusercontent.com/a/ACg8ocKACCiK93mMtOZJ7d2ksCU9BMbv7pd1cOhVDi7UVwkDfoRot8qn=s96-c',
  user_name: 'tatustomo',
})
</script>
