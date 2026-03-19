<script setup lang="ts">
interface Props {
  title: string
  description: string
  subDescription?: string
  icon: string
  value: string
  isSelected: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['select'])

const onSelect = () => {
  emit('select', props.value)
}
</script>

<template>
  <div
    class="import-method-card cursor-pointer position-relative"
    :class="{ 'selected-card': isSelected }"
    @click="onSelect"
  >
    <!-- Selection Checkmark -->
    <div v-if="isSelected" class="selection-checkmark position-absolute d-flex align-center justify-center">
      <VIcon icon="tabler-check" size="14" color="white" />
    </div>

    <div class="d-flex flex-column align-start h-100 pa-4">
      <img
        :src="icon"
        width="24"
        height="24"
        class="mb-3"
      />
      <h3 class="method-title mb-1" :class="{ 'text-primary': isSelected }">
        {{ title }}
      </h3>
      <p class="method-desc mb-0">
        {{ description }}
      </p>
      <p v-if="subDescription" class="method-desc mt-1 text-opacity-80">
        {{ subDescription }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.import-method-card {
  border: 1px solid #eaefff;
  border-radius: 8px;
  background: #f9fbff;
  inline-size: 186px;
  min-block-size: 148px;
  transition: all 0.2s ease-in-out;
}

@media (max-width: 600px) {
  .import-method-card {
    block-size: auto;
    inline-size: 100%;
    min-block-size: 100px;
  }
}

.import-method-card:hover {
  border-color: #3666ee;
}

.selected-card {
  border-color: #3666ee;
}

.selection-checkmark {
  position: absolute;
  border: 1px solid #3666ee;
  border-radius: 3px;
  background-color: #3666ee;
  block-size: 18px;
  inline-size: 18px;
  inset-block-start: 12px;
  inset-inline-end: 12px;
}

.method-title {
  color: #5e5873;
  font-size: 14px;
  font-weight: 600;
  line-height: 140%;
}

.method-desc {
  color: #5e5873;
  font-size: 12px;
  font-weight: 400;
  line-height: 140%;
}
</style>
