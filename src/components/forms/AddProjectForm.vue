<template>
  <div v-if="submitError">
    <Message severity="error">{{ submitError }}</Message>
  </div>
  <div v-if="submitting">submitting</div>
  <div v-else-if="addedProject">
    <Message severity="success">
      上傳成功！去新的
      <Tag severity="success">
        <ProjectSpan :id="addedProject.id" :name="addedProject.name"></ProjectSpan>
      </Tag>
      看看
    </Message>
  </div>
  <div v-else>
    <div class="flex flex-col gap-2 my-4">
      <label>計畫名稱</label>
      <InputText v-model="section.name" type="text" :invalid="!section.name" />
    </div>
    <div class="flex flex-row-reverse mt-8">
      <Button icon="pi pi-plus" label="新增" @click="handleSubmitClicked" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAddingProject } from '@/composables/projects/useAddingProject'
import ProjectSpan from '@/components/nameSpans/ProjectSpan.vue'

const emit = defineEmits<{
  (e: 'added'): void
}>()

const { section, valid, validate, submitting, addedProject, submitError, submit } =
  useAddingProject()

const handleSubmitClicked = async () => {
  validate()
  if (!valid.value) {
    return
  }
  await submit()
  emit('added')
}
</script>
