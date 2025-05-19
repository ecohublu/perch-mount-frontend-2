<template>
  <div class="card">
    <Panel toggleable>
      <HighlightFilter></HighlightFilter>
    </Panel>
  </div>
  <div class="card mt-8">
    <HighlightMedia></HighlightMedia>
  </div>
</template>
<script setup lang="ts">
import HighlightFilter from '../highlight/HighlightFilter.vue'
import HighlightMedia from '../highlight/HighlightMedia.vue'
</script>
