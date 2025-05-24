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
          <div>
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
                  <span class="font-medium">Projects</span>
                  <i class="pi pi-chevron-down"></i>
                </div>
                <ul class="list-none p-0 m-0 overflow-hidden">
                  <li v-for="project of projects">
                    <router-link :to="`/app/projects/${project.id}`">
                      <a
                        v-ripple
                        class="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800 duration-150 transition-colors p-ripple"
                      >
                        <i class="pi pi-android mr-2"></i>
                        <span class="font-medium">{{ project.name }}</span>
                      </a>
                    </router-link>
                  </li>
                </ul>
              </li>
            </ul>
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
                <Avatar :image="auth.currentUser?.profile_picture_url" shape="circle" />
                <span class="font-bold">{{ auth.currentUser?.display_name }}</span>
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
import { onMounted, ref } from 'vue'
import { sidebarData } from '@/constants/sidebar'
import { useAuthStore } from '@/stores/auth'
import { useProjects } from '@/composables/projects/useProjects'

const auth = useAuthStore()
const visible = ref(false)

const { data: projects, isLoading, error, fetch } = useProjects()
onMounted(fetch)
</script>
