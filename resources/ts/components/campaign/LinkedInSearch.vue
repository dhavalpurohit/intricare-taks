<script setup lang="ts">
import linkedinIcon from '@images/icons/linkedin.svg?url';
import { ref } from 'vue';

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue', 'validate'])

const isValid = ref<boolean | null>(null)
const isLoading = ref(false)

const validateUrl = () => {
  isLoading.value = true
  // Mock validation
  setTimeout(() => {
    isValid.value = props.modelValue.includes('linkedin.com/in/') || props.modelValue.includes('linkedin.com/search/')
    isLoading.value = false
    emit('validate', isValid.value)
  }, 1000)
}
</script>

<template>
  <VCard variant="flat" class="pa-6 border rounded-lg">
    <div class="d-flex align-center justify-space-between mb-4">
      <div class="d-flex align-center">
        <img
        :src="linkedinIcon"
        width="18"
        height="18"
        class="me-2"
      />
        <span class="text-subtitle-2">Find your target audience with</span>
        <a href="#" class="ms-1 text-subtitle-2 text-primary text-decoration-underline">LinkedIn Search</a>
        <span class="px-1 text-subtitle-2">or</span>
        <a href="#" class="text-subtitle-2 text-primary text-decoration-underline">Sales Navigator</a>
        <span class="px-1 text-subtitle-2">or</span>
        <a href="#" class="text-subtitle-2 text-primary text-decoration-underline">Post URL</a>
        <span class="px-1 text-subtitle-2">or</span>
        <a href="#" class="text-subtitle-2 text-primary text-decoration-underline">Group URL</a>
      </div>
      <a href="#" class="text-caption text-primary text-decoration-underline d-flex align-center">
        <VIcon icon="tabler-alert-circle" size="18" color="primary" class="me-1" />
        Search Guide
      </a>
    </div>

    <VTextField
      :model-value="modelValue"
      placeholder="https://www.linkedin.com/search/results/people/?keywords="
      persistent-placeholder
      variant="outlined"
      density="comfortable"
      hide-details="auto"
      @update:model-value="val => emit('update:modelValue', val)"
      :error-messages="isValid === false ? ['Invalid LinkedIn URL'] : []"
      :success="isValid === true"
      class="linkedin-url-field"
    >
      <template #append-inner>
        <VBtn
          color="primary"
          variant="flat"
          height="36"
          :loading="isLoading"
          class="ms-2 px-6"
          @click="validateUrl"
        >
          Validate
        </VBtn>
      </template>
    </VTextField>
    
    <p class="mt-2 text-caption text-disabled d-flex align-center">
      <VIcon icon="mdi-circle-small" color="primary" class="me-1" />
      Paste the search URL directly from LinkedIn
    </p>
  </VCard>
</template>

<style scoped>
.linkedin-url-field :deep(.v-field__outline) {
  --v-field-border-opacity: 0.1 !important;
}

.linkedin-url-field :deep(.v-field__input) {
  font-size: 0.875rem;
  padding-inline-start: 12px !important;
}

.linkedin-url-field :deep(.v-field--focused .v-field__outline) {
  --v-field-border-opacity: 1 !important;
}
</style>
