<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  modelValue: File | null
}>()

const emit = defineEmits(['update:modelValue'])

const isDragging = ref(false)

const handleFile = (files: File[] | File) => {
  const file = Array.isArray(files) ? files[0] : files
  if (file && (file as File).type === 'text/csv') {
    emit('update:modelValue', file)
  }
}

const onDrop = (e: DragEvent) => {
  isDragging.value = false
  const files = e.dataTransfer?.files
  if (files && files.length > 0) {
    handleFile(files[0])
  }
}
</script>

<template>
  <VCard variant="flat" class="pa-4 border">
    <VCardTitle class="px-0 pt-0 pb-4">
      Upload CSV File
    </VCardTitle>
    <VCardText class="px-0">
      <div
        class="csv-upload-area d-flex flex-column align-center justify-center rounded-lg pa-8"
        :class="{ 'dragging-active': isDragging, 'has-file': !!modelValue }"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="onDrop"
      >
        <VIcon
          :icon="modelValue ? 'mdi-file-check' : 'mdi-cloud-upload'"
          size="48"
          class="mb-4"
          :color="modelValue ? 'success' : 'primary'"
        />
        
        <template v-if="modelValue">
          <div class="text-h6 mb-2">{{ modelValue.name }}</div>
          <div class="text-caption text-medium-emphasis mb-4">
            {{ (modelValue.size / 1024).toFixed(2) }} KB
          </div>
          <VBtn color="error" variant="text" size="small" @click="emit('update:modelValue', null)">
            Remove File
          </VBtn>
        </template>
        
        <template v-else>
          <div class="text-h6 mb-2">Drag & Drop your CSV file here</div>
          <div class="text-body-2 text-medium-emphasis mb-4">or click to browse</div>
          
          <VFileInput
            label="Choose File"
            accept=".csv"
            placeholder="Select your CSV file"
            prepend-icon=""
            class="csv-file-input"
            hide-details
            @update:model-value="handleFile"
          >
            <template #label>
              <VBtn color="primary" block>Select File</VBtn>
            </template>
          </VFileInput>
        </template>
      </div>
      
      <p class="mt-4 text-caption text-medium-emphasis">
        <VIcon icon="mdi-information-outline" size="14" class="me-1" />
        Only .csv files are supported. Max size 10MB.
      </p>
    </VCardText>
  </VCard>
</template>

<style scoped>
.csv-upload-area {
  border: 2px dashed rgb(var(--v-theme-outline-variant));
  min-block-size: 200px;
  transition: all 0.3s ease;
}

.dragging-active {
  border-color: rgb(var(--v-theme-primary));
  background-color: rgba(var(--v-theme-primary), 0.05);
}

.has-file {
  border-style: solid;
  border-color: rgb(var(--v-theme-success));
}

/* stylelint-disable-next-line selector-pseudo-class-no-unknown */
.csv-file-input :deep(.v-field__input) {
  position: absolute;
  block-size: 100%;
  cursor: pointer;
  inline-size: 100%;
  inset-block-start: 0;
  inset-inline-start: 0;
  opacity: 0;
}
</style>
