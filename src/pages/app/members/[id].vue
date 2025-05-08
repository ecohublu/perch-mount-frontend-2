<template>
  <MemberView :id="id"></MemberView>
</template>
<script setup lang="ts">
import MemberView from '@/components/views/MemberView.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const id = ref<string>(route.params.id as string)
</script>
