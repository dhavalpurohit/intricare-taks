<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue', 'select'])

const hasLeads = ref(false) // Set to false to show empty state by default as per request

const mockAudiences = [
  { id: 1, name: 'Founder', count: 202, date: '2024-03-10' },
  { id: 2, name: 'Marketing Directors', count: 850, date: '2024-03-12' },
]

const selectedItems = ref<number[]>([])

const confirmSelection = () => {
  const selected = mockAudiences.filter(a => selectedItems.value.includes(a.id))
  emit('select', selected)
  emit('update:modelValue', false)
}

const createLeadList = () => {
  // Navigation or action to create lead list
  console.log('Navigate to create lead list')
  hasLeads.value = true // For demo purposes
}
</script>

<template>
  <VDialog
    :model-value="modelValue"
    max-width="500"
    @update:model-value="val => emit('update:modelValue', val)"
  >
    <VCard class="rounded-lg">
      <VCardTitle class="d-flex align-center pa-6">
        <div class="text-h6 font-weight-bold">Lookalikes</div>
        <VSpacer />
        <VBtn icon="mdi-close" variant="text" density="comfortable" @click="emit('update:modelValue', false)" />
      </VCardTitle>
      
      <VDivider />
      
      <VCardText class="pa-8 d-flex flex-column align-center" v-if="!hasLeads">
        <div class="text-center">
          <h3 class="text-h6 font-weight-bold mb-2">You don't have any leads</h3>
          <p class="text-body-2 text-medium-emphasis mb-6">
            Create a lead list to start creating campaigns.
          </p>
          <VBtn color="primary" variant="flat" class="px-8" @click="createLeadList">
            Create list
          </VBtn>
        </div>
      </VCardText>

      <template v-else>
        <VCardText class="pa-6">
          <p class="text-caption text-medium-emphasis mb-4">Select a lookalike list for this campaign</p>
          
          <div class="lookalike-list pb-4">
            <div 
              v-for="audience in mockAudiences" 
              :key="audience.id" 
              class="audience-item border rounded-lg pa-3 mb-3 d-flex align-center cursor-pointer"
              :class="{ 'border-primary bg-primary-lighten-5': selectedItems.includes(audience.id) }"
              @click="() => {
                if (selectedItems.includes(audience.id)) {
                  selectedItems = selectedItems.filter(id => id !== audience.id)
                } else {
                  selectedItems.push(audience.id)
                }
              }"
            >
              <VIcon icon="mdi-account-group-outline" size="18" class="me-3" :color="selectedItems.includes(audience.id) ? 'primary' : 'disabled'" />
              <div class="text-subtitle-2 font-weight-bold">{{ audience.name }}</div>
              <VSpacer />
              <div class="text-caption text-disabled me-3">{{ audience.count }} Leads Found</div>
              <VCheckboxBtn 
                :model-value="selectedItems.includes(audience.id)" 
                density="compact"
                hide-details
                color="primary"
              />
            </div>
          </div>
        </VCardText>
        
        <VDivider />
        
        <VCardActions class="pa-4 pe-6">
          <VSpacer />
          <VBtn variant="text" color="secondary" class="text-none" @click="emit('update:modelValue', false)">Cancel</VBtn>
          <VBtn color="primary" :disabled="selectedItems.length === 0" variant="flat" class="text-none px-6" @click="confirmSelection">
            Select List
          </VBtn>
        </VCardActions>
      </template>
    </VCard>
  </VDialog>
</template>

<style scoped>
.audience-item {
  border-color: rgba(var(--v-theme-outline-variant), 0.2) !important;
  transition: all 0.2s;
}

.audience-item:hover {
  background-color: rgba(var(--v-theme-primary), 0.05);
}

.border-primary {
  border-color: rgb(var(--v-theme-primary)) !important;
}

.bg-primary-lighten-5 {
  background-color: rgba(var(--v-theme-primary), 0.05) !important;
}
</style>
