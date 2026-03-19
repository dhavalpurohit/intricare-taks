<script setup lang="ts">
import { ref } from 'vue'
import linkedinIcon from '@images/icons/linkedin.svg?url'

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
  <VCard
    variant="flat"
    class="pa-6 border rounded-lg"
  >
    <div
      class="d-flex flex-column flex-md-row align-md-center justify-space-between mb-4"
      style="gap: 12px;"
    >
      <div
        class="d-flex align-center flex-wrap"
        style="gap: 4px;"
      >
        <img
          :src="linkedinIcon"
          width="18"
          height="18"
          class="me-2"
        >
        <span class="text-subtitle-2">Find your target audience with</span>
        <a
          href="#"
          class="text-subtitle-2 text-primary text-decoration-underline"
        >LinkedIn Search</a>
        <span class="text-subtitle-2">or</span>
        <a
          href="#"
          class="text-subtitle-2 text-primary text-decoration-underline"
        >Sales Navigator</a>
        <span class="text-subtitle-2">or</span>
        <a
          href="#"
          class="text-subtitle-2 text-primary text-decoration-underline"
        >Post URL</a>
        <span class="text-subtitle-2">or</span>
        <a
          href="#"
          class="text-subtitle-2 text-primary text-decoration-underline"
        >Group URL</a>
      </div>
      <a
        href="#"
        class="text-caption text-primary text-decoration-underline d-flex align-center"
      >
        <VIcon
          icon="tabler-alert-circle"
          size="18"
          color="primary"
          class="me-1"
        />
        Search Guide
      </a>
    </div>

    <div
      class="d-flex flex-column flex-sm-row align-start"
      style="gap: 16px;"
    >
      <VTextField
        :model-value="modelValue"
        placeholder="https://www.linkedin.com/search/results/people/?keywords="
        persistent-placeholder
        variant="outlined"
        density="comfortable"
        hide-details="auto"
        :error-messages="isValid === false ? ['Invalid LinkedIn URL'] : []"
        :success="isValid === true"
        class="linkedin-url-field flex-grow-1 w-100"
        @update:model-value="val => emit('update:modelValue', val)"
      />
      <VBtn
        class="validate-btn"
        :loading="isLoading"
        @click="validateUrl"
      >
        Validate
      </VBtn>
    </div>

    <div class="mt-2 text-caption text-disabled d-flex align-center">
      <div class="custom-bullet me-2">
        <div class="inner-circle" />
      </div>
      Paste the search URL directly from LinkedIn
    </div>
  </VCard>
</template>

<style scoped>
.linkedin-url-field :deep(.v-field__outline) {
  --v-field-border-opacity: 0.1 !important;
}

.linkedin-url-field :deep(.v-field__input) {
  block-size: 37px;
  font-size: 0.875rem;
  padding-inline-start: 12px !important;
}

.linkedin-url-field :deep(.v-field--focused .v-field__outline) {
  --v-field-border-opacity: 1 !important;
}

.validate-btn {
  border-radius: 5px !important;
  background-color: #3664ee !important;
  block-size: 37px !important;
  color: #fff !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  inline-size: 107px !important;
  letter-spacing: normal !important;
  padding-block: 10px !important;
  padding-inline: 23px !important;
  text-transform: none !important;
}

.custom-bullet {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #3666ee57;
  block-size: 8px;
  inline-size: 8px;
}

.inner-circle {
  border-radius: 50%;
  background-color: #3666ee;
  block-size: 4px;
  inline-size: 4px;
}
</style>
