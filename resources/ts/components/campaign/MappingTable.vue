<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{
  modelValue: Record<string, string>
}>()

const emit = defineEmits(['update:modelValue'])

const search = ref('')

// Dummy CSV Headers with counts for Figma match
const csvHeaders = [
  { name: 'Full name', count: 35 },
  { name: 'First name', count: 3 },
  { name: 'Last name', count: 12 },
  { name: 'Email', count: 45 },
  { name: 'Company Name', count: 36 },
  { name: 'Position', count: 25 },
  { name: 'Headline', count: 25 },
  { name: 'Location', count: 3, total: 9 },
  { name: 'Industry', count: 3, total: 3 },
  { name: 'Notes', count: 9, total: 9 },
]

const mappedFieldsList = [
  { key: 'fullName', label: 'Full name', icon: 'mdi-format-list-bulleted', csvIcon: 'mdi-account-outline' },
  { key: 'firstName', label: 'First name', icon: 'mdi-format-list-bulleted', csvIcon: 'mdi-account-outline' },
  { key: 'lastName', label: 'Last name', icon: 'mdi-format-list-bulleted', csvIcon: 'mdi-account-outline' },
  { key: 'companyName', label: 'Company Name', icon: 'mdi-format-list-bulleted', csvIcon: 'mdi-office-building-outline' },
  { key: 'position', label: 'Position', icon: 'mdi-format-list-bulleted', csvIcon: 'mdi-briefcase-outline' },
  { key: 'headline', label: 'Headline', icon: 'mdi-format-list-bulleted', csvIcon: 'mdi-text-account' },
]

const unmappedFields = [
  { name: 'Location', total: 9, count: 3 },
  { name: 'Industry', total: 3, count: 3 },
  { name: 'Notes', total: 9, count: 9 },
]

const filteredUnmapped = computed(() => {
  if (!search.value) return unmappedFields
  return unmappedFields.filter(f => f.name.toLowerCase().includes(search.value.toLowerCase()))
})

const updateMapping = (key: string, value: string) => {
  const newMapping = { ...props.modelValue, [key]: value }
  emit('update:modelValue', newMapping)
}

const clearAll = () => {
  const cleared = Object.fromEntries(mappedFieldsList.map(f => [f.key, '']))
  emit('update:modelValue', cleared)
}
</script>

<template>
  <VCard variant="flat" class="border rounded-lg">
    <VCardTitle class="pa-6 border-b d-flex align-center justify-space-between">
      <div>
        <div class="text-h6 font-weight-bold">Map Properties</div>
        <div class="text-caption text-medium-emphasis d-flex align-center mt-1">
          <VIcon icon="mdi-check" color="primary" size="14" class="me-1" />
          Make sure file includes contact name and phone number
        </div>
      </div>
      <VBtn icon="mdi-delete-outline" variant="text" color="error" density="comfortable" />
    </VCardTitle>

    <VCardText class="pa-6">
      <VRow>
        <!-- Mapping Section -->
        <VCol cols="12" md="8">
          <div class="d-flex mb-4 px-2">
            <span class="text-caption font-weight-bold text-uppercase" style="inline-size: 50%;">Contact Field</span>
            <span class="text-caption font-weight-bold text-uppercase">CSV Column</span>
          </div>

          <div v-for="field in mappedFieldsList" :key="field.key" class="d-flex align-center mb-3">
            <!-- Left side: Contact Field -->
            <div class="flex-grow-1 me-4">
              <VTextField
                :model-value="field.label"
                readonly
                variant="outlined"
                density="compact"
                hide-details
                class="field-input"
              >
                <template #prepend-inner>
                  <VIcon :icon="field.icon" size="18" class="text-disabled" />
                </template>
              </VTextField>
            </div>

            <!-- Right side: CSV Column Selection -->
            <div class="flex-grow-1">
              <VSelect
                :model-value="modelValue[field.key]"
                :items="csvHeaders.map(h => h.name)"
                placeholder="Select Column"
                variant="outlined"
                density="compact"
                hide-details
                class="field-input"
                @update:model-value="val => updateMapping(field.key, val)"
              >
                <template #prepend-inner>
                  <VIcon :icon="field.csvIcon" size="18" class="text-disabled" />
                </template>
                <template #append-inner>
                  <span class="text-caption text-disabled ms-1">
                    ({{ csvHeaders.find(h => h.name === modelValue[field.key])?.count || '0' }})
                  </span>
                  <span v-if="modelValue[field.key]" class="text-caption text-disabled ms-1">
                    { {{ csvHeaders.find(h => h.name === modelValue[field.key])?.count }} }
                  </span>
                </template>
              </VSelect>
            </div>
          </div>
        </VCol>

        <!-- Unmapped Sidebar -->
        <VCol cols="12" md="4" class="ps-md-6 border-s">
          <div class="text-subtitle-2 font-weight-bold mb-4">Unmapped Works</div>
          
          <VTextField
            v-model="search"
            placeholder="Search"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            density="compact"
            class="mb-4 search-input"
            hide-details
          />

          <div class="unmapped-list">
            <div v-for="item in filteredUnmapped" :key="item.name" class="unmapped-item border rounded-lg pa-3 mb-2 d-flex align-center">
              <VIcon icon="mdi-format-list-bulleted" size="18" class="text-disabled me-3" />
              <span class="text-body-2">{{ item.name }} ({{ item.total }})</span>
              <VSpacer />
              <span class="text-caption text-disabled">({{ item.count }})</span>
            </div>
          </div>

          <VBtn
            variant="text"
            color="primary"
            block
            class="mt-4 text-none text-caption"
            @click="clearAll"
          >
            Clear All Matched
          </VBtn>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>

<style scoped>
.field-input :deep(.v-field__outline) {
  --v-field-border-opacity: 0.1 !important;
}

.field-input :deep(.v-field__input) {
  font-size: 0.875rem;
}

.search-input :deep(.v-field__outline) {
  --v-field-border-opacity: 0.1 !important;
}

.unmapped-item {
  border-color: rgba(var(--v-theme-outline-variant), 0.2) !important;
  transition: background-color 0.2s;
}

.unmapped-item:hover {
  background-color: rgba(var(--v-theme-primary), 0.05);
}
</style>
