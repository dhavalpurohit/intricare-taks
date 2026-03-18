<script setup lang="ts">
import { ref } from 'vue';
import LookalikeModal from './LookalikeModal.vue';

const props = defineProps<{
  modelValue: any[]
}>()

const emit = defineEmits(['update:modelValue'])

const showModal = ref(false)

const handleSelect = (selected: any[]) => {
  emit('update:modelValue', selected)
}

const removeItem = (id: number) => {
  emit('update:modelValue', props.modelValue.filter(item => item.id !== id))
}
</script>

<template>
  <VCard variant="flat" class="pa-4 border">
    <VCardTitle class="px-0 pt-0 pb-4 d-flex align-center">
      Lookalike Audience
      <VSpacer />
      <VBtn color="primary" @click="showModal = true">Select Audience</VBtn>
    </VCardTitle>
    <VCardText class="px-0">
      <div v-if="modelValue.length === 0" class="empty-state text-center pa-8 rounded-lg border-dashed">
        <VIcon icon="mdi-account-group-outline" size="48" class="mb-4 text-medium-emphasis" />
        <div class="text-h6 mb-2">No audience selected</div>
        <div class="text-body-2 text-medium-emphasis">
          Select existing audiences to find similar prospects.
        </div>
      </div>
      
      <VTable v-else class="lookalike-table border rounded">
        <thead>
          <tr>
            <th class="text-left font-weight-bold">Name</th>
            <th class="text-left font-weight-bold">Leads</th>
            <th class="text-left font-weight-bold">Created On</th>
            <th class="text-center font-weight-bold">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in modelValue" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.count }} leads</td>
            <td>{{ item.date }}</td>
            <td class="text-center">
              <VBtn icon="mdi-delete-outline" variant="text" color="error" size="small" @click="removeItem(item.id)" />
            </td>
          </tr>
        </tbody>
      </VTable>
    </VCardText>
    
    <LookalikeModal v-model="showModal" @select="handleSelect" />
  </VCard>
</template>

<style scoped>
.empty-state {
  border: 2px dashed rgb(var(--v-theme-outline-variant));
}

.lookalike-table :deep(th) {
  background-color: rgb(var(--v-theme-surface-variant)) !important;
}
</style>
