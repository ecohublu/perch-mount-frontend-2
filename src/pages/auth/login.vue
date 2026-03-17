<template>
  <div class="flex items-center justify-center h-screen">
    <template v-if="env.DISABLE_AUTH">
      <div class="text-center space-y-4">
        <p class="text-lg font-semibold">Authentication is disabled in this build.</p>
        <Button label="Continue" @click="goHome" />
      </div>
    </template>
    <GoogleLogin v-else :callback="onGoogleLogin" class="w-full max-w-[17.35rem] mx-auto" />
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import { GoogleLogin } from 'vue3-google-login'
import { useRouter } from 'vue-router'
import { useGoogleAuth } from '@/composables/useGoogleAuth'
import { useEnv } from '@/composables/useEnv'

const env = useEnv()
const router = useRouter()
const { loginWithGoogle } = useGoogleAuth()

function onGoogleLogin(response: any) {
  loginWithGoogle(response)
}

function goHome() {
  router.push('/')
}
</script>
