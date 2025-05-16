<template>
  <div class="grid grid-cols-12 gap-8">
    <div class="col-span-9">
      <div>
        <MemberClaimedPerchMounts :memberId="id"></MemberClaimedPerchMounts>
      </div>
      <div class="mt-8">
        <MemberContributions :memberId="id"></MemberContributions>
      </div>
    </div>
    <div class="col-span-3">
      <MemberInfoView :id="id"></MemberInfoView>
    </div>
  </div>
</template>

<script setup lang="ts">
import MemberInfoView from './MemberInfoView.vue'
import MemberClaimedPerchMounts from './MemberClaimedPerchMounts.vue'
import MemberContributions from './MemberContributions.vue'
const props = defineProps<{ id: string }>()
</script>
