<template>
  <div class="flex items-center justify-center h-screen">
    <GoogleLogin :callback="onGoogleLogin" class="w-full max-w-[17.35rem] mx-auto" />
  </div>
</template>

<script setup lang="ts">
import { GoogleLogin } from 'vue3-google-login'
import { useGoogleAuth } from '@/composables/useGoogleAuth'

const { loginWithGoogle } = useGoogleAuth()

function onGoogleLogin(response: any) {
  loginWithGoogle(response)
}
</script>
