<script setup lang="ts">
import { ref } from 'vue'
import downloadIcon from '@images/icons/download.svg?url'
import uploadIcon from '@images/icons/upload.svg?url'

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
  <VCard
    variant="flat"
    class="pa-0 border-0"
  >
    <div class="px-0">
      <div
        class="csv-upload-area d-flex flex-column align-center justify-center rounded pa-8 cursor-pointer"
        :class="{ 'dragging-active': isDragging }"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="onDrop"
      >
        <div class="upload-icon-box mb-3 d-flex align-center justify-center">
          <img
            :src="uploadIcon"
            width="14"
            height="14"
          >
        </div>
        
        <div class="text-center">
          <div class="drag-text mb-1">
            Drag a File or click a browse
          </div>
          <div class="text-caption text-disabled">
            File with up to 100 rows works best
          </div>
        </div>

        <VFileInput
          accept=".csv"
          prepend-icon=""
          class="csv-file-input"
          hide-details
          @update:model-value="handleFile"
        />
      </div>
      
      <div class="mt-3 d-flex align-center">
        <a
          href="#"
          class="text-caption text-primary d-flex align-center download-link"
          style="text-decoration: none;"
        >
          <img
            :src="downloadIcon"
            width="14"
            height="14"
            class="me-2"
          >
          Download a sample file
        </a>
      </div>
    </div>
  </VCard>
</template>

<style scoped>
.csv-upload-area {
  position: relative;
  border: 1px dashed #3666ee;
  background-color: #f8faff;
  block-size: 159px;
  inline-size: 100%;
  transition: all 0.3s ease;
}

.dragging-active {
  background-color: #eaefff;
}

.upload-icon-box {
  background-color: #eaefff;
  block-size: 29px;
  border-radius: 5px;
  inline-size: 29px;
}

.drag-text {
  color: #3666ee;
  font-size: 14px;
  font-weight: 500;
}

.download-link {
  color: #6e6b7b !important;
}

.download-link:hover {
  text-decoration: underline !important;
}

/* stylelint-disable-next-line selector-pseudo-class-no-unknown */
.csv-file-input :deep(.v-field) {
  position: absolute;
  block-size: 100%;
  cursor: pointer;
  inline-size: 100%;
  inset-block-start: 0;
  inset-inline-start: 0;
  opacity: 0;
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
