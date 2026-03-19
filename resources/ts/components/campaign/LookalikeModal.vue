<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue', 'select'])

const hasLeads = ref(false) // Set to false to show empty state first as per request

const mockAudiences = [
  { id: 1, name: 'Founder', count: 1000, date: '2024-03-10' },
  { id: 2, name: 'Tech Profiles', count: 1000, date: '2024-03-12' },
]

const selectedItems = ref<number[]>([1]) // Pre-select first item as seen in screenshot

const toggleSelection = (id: number) => {
  if (selectedItems.value.includes(id))
    selectedItems.value = selectedItems.value.filter((i: number) => i !== id)
  else
    selectedItems.value.push(id)
}

const confirmSelection = () => {
  const selected = mockAudiences.filter(a => selectedItems.value.includes(a.id))

  emit('select', selected)
  emit('update:modelValue', false)
}

const createLeadList = () => {
  // Navigation or action to create lead list
  console.log('Navigate to create lead list')

  // For demo: toggle leads state if list is empty
  hasLeads.value = true
}
</script>

<template>
  <VDialog
    :model-value="modelValue"
    width="100%"
    max-width="702"
    persistent
    @update:model-value="(val: boolean) => emit('update:modelValue', val)"
  >
    <VCard class="workflow-modal-container">
      <!-- Header (Matching Workflow Modal) -->
      <VCardTitle class="workflow-modal-header d-flex align-center px-6">
        <div class="d-flex flex-column">
          <span class="modal-title">Lookalikes</span>
          <span class="modal-subtitle">Select a lookalike list for this campaign</span>
        </div>
        <VSpacer />
        <div
          class="close-icon-wrapper d-flex align-center justify-center cursor-pointer"
          @click="emit('update:modelValue', false)"
        >
          <VIcon
            icon="tabler-x"
            size="14"
            color="#64748B"
          />
        </div>
      </VCardTitle>

      <VCardText class="workflow-modal-content px-4 px-sm-[3rem] py-6">
        <!-- Empty State -->
        <div
          v-if="!hasLeads"
          class="d-flex flex-column align-center justify-center py-10 text-center"
        >
          <div class="text-h6 font-weight-bold mb-2 modal-title">
            You don't have any leads
          </div>
          <div class="modal-subtitle mb-8">
            Create a lead list to start running campaigns
          </div>
          <VBtn
            class="modal-btn-next text-none"
            variant="flat"
            @click="createLeadList"
          >
            Create a List
          </VBtn>
        </div>

        <!-- List View (Workflow Option Style) -->
        <div
          v-else
          class="d-flex flex-column"
          style="gap: 1rem;"
        >
          <VCard
            v-for="audience in mockAudiences"
            :key="audience.id"
            variant="flat"
            class="workflow-option-card pa-4 cursor-pointer align-center d-flex"
            :class="selectedItems.includes(audience.id) ? 'selected' : 'normal'"
            @click="toggleSelection(audience.id)"
          >
            <VIcon
              icon="tabler-list"
              size="20"
              class="me-3"
              :color="selectedItems.includes(audience.id) ? 'primary' : 'disabled'"
            />

            <div class="flex-grow-1">
              <div class="d-flex align-center flex-wrap">
                <span class="option-header-text me-2">{{ audience.name }}</span>
                <span class="option-description-text">({{ audience.count }}+ Users in the List)</span>
              </div>
            </div>
            <div
              class="me-4"
              style="margin-block-start: 0.125rem;"
            >
              <div
                class="custom-chk-button d-flex align-center justify-center"
                :class="{ active: selectedItems.includes(audience.id) }"
              >
                <VIcon
                  v-if="selectedItems.includes(audience.id)"
                  icon="tabler-check"
                  size="12"
                  color="white"
                />
              </div>
            </div>
          </VCard>

          <div class="d-flex justify-end mt-1">
            <span
              class="text-body-2 font-weight-bold cursor-pointer"
              style="color: #3666ee;"
              @click="createLeadList"
            >
              Add New
            </span>
          </div>
        </div>
      </VCardText>

      <VCardActions
        v-if="hasLeads"
        class="px-4 px-sm-[3rem] pb-6 pb-sm-[2rem] flex-column-reverse flex-sm-row"
        style="gap: 0.75rem;"
      >
        <VSpacer />
        <VBtn
          class="modal-btn-close text-none w-100 w-sm-auto"
          variant="flat"
          @click="emit('update:modelValue', false)"
        >
          Cancel
        </VBtn>
        <VBtn
          class="modal-btn-next text-none w-100 w-sm-auto"
          variant="flat"
          :disabled="selectedItems.length === 0"
          @click="confirmSelection"
        >
          Select List
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style lang="scss" scoped>
.workflow-modal-container {
  overflow: hidden;
  border-radius: 0.375rem !important;
  background-color: #fff !important;
  min-block-size: auto;
}

.workflow-modal-header {
  background-color: #f8f8f8;
  block-size: 4.375rem;
  border-start-end-radius: 0.3125rem;
  border-start-start-radius: 0.3125rem;
}

.modal-title {
  color: #5e5873;
  font-size: 1.125rem;
  font-weight: 600;
}

.modal-subtitle {
  color: #b9b9c3;
  font-size: 0.8125rem;
}

.close-icon-wrapper {
  border: 0.0938rem solid #64748b;
  border-radius: 1.25rem;
  block-size: 1.25rem;
  inline-size: 1.25rem;
}

.workflow-modal-content {
  min-block-size: auto;
}

.workflow-option-card {
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  border-radius: 0.5rem !important;
  inline-size: 100%;
  min-block-size: 4.375rem;
  transition: all 0.2s ease;

  &.normal {
    border: 0.0625rem solid #ebe9f1 !important;
    background-color: #fff !important;
  }

  &.selected {
    border: 0.0625rem solid #cfdafe !important;
    background-color: #f6f8ff !important;
  }
}

.option-header-text {
  color: #5e5873;
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.3125rem;
}

.option-description-text {
  color: #b9b9c3;
  font-size: 0.8125rem;
  font-weight: 400;
  line-height: 1.3125rem;
}

.custom-chk-button {
  border: 0.0625rem solid #b9b9c3;
  border-radius: 0.25rem;
  block-size: 1.125rem;
  inline-size: 1.125rem;
  transition: all 0.2s ease;

  &.active {
    border-color: #3666ee;
    background-color: #3666ee;
  }
}

.modal-btn-close {
  border-radius: 0.3125rem !important;
  background-color: #e8e8e8 !important;
  block-size: 2.3125rem !important;
  color: #9692a4 !important;
  font-size: 0.875rem !important;
  font-weight: 500 !important;
  inline-size: 5.3125rem !important;
  letter-spacing: 0.025rem !important;
  line-height: 100% !important;
  padding-block: 0.625rem !important;
  padding-inline: 1.375rem !important;
}

.modal-btn-next {
  border-radius: 0.3125rem !important;
  background: linear-gradient(239.27deg, #8ba6ff -27.06%, #3762ee 83.4%) !important;
  block-size: 2.3125rem !important;
  color: #fff !important;
  font-size: 0.875rem !important;
  font-weight: 500 !important;
  inline-size: 6.5625rem !important;
  letter-spacing: 0.025rem !important;
  line-height: 100% !important;
  padding-block: 0.625rem !important;
  padding-inline: 1.375rem !important;
}
</style>
