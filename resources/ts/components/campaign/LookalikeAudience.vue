<script setup lang="ts">
import { ref } from 'vue'
import LookalikeModal from './LookalikeModal.vue'

defineProps<{
  modelValue: any[]
}>()

const emit = defineEmits(['update:modelValue'])

const showModal = ref(false)

const handleSelect = (selected: any[]) => {
  emit('update:modelValue', selected)
}
</script>

<template>
  <div class="lookalike-audience-wrapper">
    <LookalikeModal
      v-model="showModal"
      @select="handleSelect"
    />
  </div>
</template>

<style scoped>
.lookalike-audience-wrapper {
  margin-block-end: 1rem;
}
</style>
