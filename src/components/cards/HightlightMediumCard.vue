<template>
  <Card>
    <template #header>
      <S3Medium :id="medium.id" :isImage="medium.medium_type == 'image'"></S3Medium>
    </template>
    <template #title></template>
    <template #subtitle>Card subtitle</template>
    <template #content>
      <p class="m-0">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error
        repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa
        ratione quam perferendis esse, cupiditate neque quas!
      </p>
    </template>
    <template #footer>
      <div class="flex gap-4 mt-1">
        <Button label="Cancel" severity="secondary" outlined class="w-full" />
        <Button label="Save" class="w-full" />
      </div>
    </template>
  </Card>
</template>
<script setup lang="ts">
import type { Medium } from '@/types/media'

import S3Medium from '../S3Medium.vue'

const props = defineProps<{ medium: Medium }>()
</script>
