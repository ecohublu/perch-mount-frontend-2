<template>
  {{ auth.currentUser }}
</template>

<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'

const auth = useAuth()
</script>
