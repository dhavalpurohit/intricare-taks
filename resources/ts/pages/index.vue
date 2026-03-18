<script setup lang="ts">
import advanceWorkflowImg from '@images/png/advance_workflow.png';
import notFoundImg from '@images/png/not_found.png';
import standardWorkflowImg from '@images/png/standard_workflow.png';
import { ref } from 'vue';

const selectedFilter = ref('All')
const searchQuery = ref('')
const filters = ['All', 'Active', 'Inactive']

// Modal state
const isDialogVisible = ref(false)
const selectedWorkflow = ref('advanced')

const workflowModes = [
  {
    id: 'advanced',
    title: 'Advanced Workflow',
    recommended: true,
    description: 'Best for high-volume outreach',
    features: ['Conditional logic', 'Multiple paths', 'More control'],
    image: advanceWorkflowImg,
  },
  {
    id: 'standard',
    title: 'Standard Workflow',
    description: 'Best for beginners',
    features: ['Linear steps', 'No conditions', 'Easy Setup'],
    image: standardWorkflowImg,
  },
]
</script>

<template>
  <div class="h-100 d-flex flex-column" style="padding-block-end: 2rem;">
    <!-- Top Action Bar -->
    <div class="d-flex align-center mb-10 w-100" style="gap: 1rem;">
      <div class="d-flex align-center" style=" flex-grow: 1; gap: 1rem; max-inline-size: 400px;">
        <VSelect
          v-model="selectedFilter"
          :items="filters"
          density="compact"
          variant="outlined"
          hide-details
          class="flex-grow-1"
          style="max-inline-size: 190px;"
        />
        <VTextField
          v-model="searchQuery"
          placeholder="Search"
          density="compact"
          variant="outlined"
          hide-details
          prepend-inner-icon="tabler-search"
          class="flex-grow-1"
          style="max-inline-size: 190px;"
        />
      </div>
      <VSpacer />
      <VBtn color="primary" class="text-none px-6 rounded" elevation="0" @click="isDialogVisible = true">
        New Campaign
      </VBtn>
    </div>

    <!-- Empty State -->
    <div class="flex-grow-1 d-flex flex-column align-center justify-center text-center mt-10">
      <VImg
        :src="notFoundImg"
        max-width="300"
        height="300"
        width="300"
        class="mb-8"
      />
      
      <VBtn color="primary" class="text-none px-6 rounded" elevation="0" @click="isDialogVisible = true">
        New Campaign
      </VBtn>
    </div>

    <!-- Select Workflow Mode Modal -->
    <VDialog
      v-model="isDialogVisible"
      width="683"
    >
      <VCard class="workflow-modal-container">
        <!-- Header -->
        <VCardTitle class="workflow-modal-header d-flex align-center px-6">
          <div class="d-flex flex-column">
            <span class="modal-title">Select Workflow Mode</span>
            <span class="modal-subtitle">Choose how you want your campaign to behave</span>
          </div>
          <VSpacer />
          <div class="close-icon-wrapper d-flex align-center justify-center cursor-pointer" @click="isDialogVisible = false">
            <VIcon icon="tabler-x" size="14" color="#64748B" />
          </div>
        </VCardTitle>

        <VCardText class="workflow-modal-content px-[48px] py-6">
          <div class="d-flex flex-column" style="gap: 16px;">
            <!-- Advanced Workflow Card -->
            <VCard
              variant="flat"
              class="workflow-option-card pa-4 cursor-pointer"
              :class="selectedWorkflow === 'advanced' ? 'selected' : 'normal'"
              @click="selectedWorkflow = 'advanced'"
            >
              <div class="d-flex align-center h-100">
                <div class="me-4">
                  <div class="custom-radio-button d-flex align-center justify-center" :class="{ 'active': selectedWorkflow === 'advanced' }">
                    <div v-if="selectedWorkflow === 'advanced'" class="radio-dot" />
                  </div>
                </div>
                <div class="flex-grow-1">
                  <div class="d-flex align-center mb-1">
                    <span class="option-header-text">Advanced Workflow</span>
                    <VChip
                      color="success"
                      size="x-small"
                      class="ms-2 px-2 recommended-tag"
                    >
                      Recommended
                    </VChip>
                  </div>
                  <div class="option-description-text mb-2">Best for high-volume outreach</div>
                  <div class="d-flex flex-wrap" style="gap: 16px;">
                    <div class="d-flex align-center">
                      <VIcon icon="tabler-circle-filled" size="6" class="me-2 text-disabled opacity-50" />
                      <span class="option-description-text">Conditional logic</span>
                    </div>
                    <div class="d-flex align-center">
                      <VIcon icon="tabler-circle-filled" size="6" class="me-2 text-disabled opacity-50" />
                      <span class="option-description-text">Multiple paths</span>
                    </div>
                    <div class="d-flex align-center">
                      <VIcon icon="tabler-circle-filled" size="6" class="me-2 text-disabled opacity-50" />
                      <span class="option-description-text">More control</span>
                    </div>
                  </div>
                </div>
                <VImg :src="advanceWorkflowImg" width="80" class="ms-4 d-none d-sm-block" />
              </div>
            </VCard>

            <!-- Standard Workflow Card -->
            <VCard
              variant="flat"
              class="workflow-option-card pa-4 cursor-pointer"
              :class="selectedWorkflow === 'standard' ? 'selected' : 'normal'"
              @click="selectedWorkflow = 'standard'"
            >
              <div class="d-flex align-center h-100">
                <div class="me-4">
                  <div class="custom-radio-button d-flex align-center justify-center" :class="{ 'active': selectedWorkflow === 'standard' }">
                    <div v-if="selectedWorkflow === 'standard'" class="radio-dot" />
                  </div>
                </div>
                <div class="flex-grow-1">
                  <div class="d-flex align-center mb-1">
                    <span class="option-header-text">Standard Workflow</span>
                  </div>
                  <div class="option-description-text mb-2">Best for beginners</div>
                  <div class="d-flex flex-wrap" style="gap: 16px;">
                    <div class="d-flex align-center">
                      <VIcon icon="tabler-circle-filled" size="6" class="me-2 text-disabled opacity-50" />
                      <span class="option-description-text">Linear steps</span>
                    </div>
                    <div class="d-flex align-center">
                      <VIcon icon="tabler-circle-filled" size="6" class="me-2 text-disabled opacity-50" />
                      <span class="option-description-text">No conditions</span>
                    </div>
                    <div class="d-flex align-center">
                      <VIcon icon="tabler-circle-filled" size="6" class="me-2 text-disabled opacity-50" />
                      <span class="option-description-text">Easy Setup</span>
                    </div>
                  </div>
                </div>
                <VImg :src="standardWorkflowImg" width="80" class="ms-4 d-none d-sm-block" />
              </div>
            </VCard>
          </div>
        </VCardText>

        <VCardActions class="px-[48px] pb-[32px]" style="gap: 8px;">
          <VSpacer />
          <VBtn
            class="modal-btn-close text-none"
            variant="flat"
            @click="isDialogVisible = false"
          >
            Close
          </VBtn>
          <VBtn
            class="modal-btn-next text-none"
            variant="flat"
            @click="() => {
              isDialogVisible = false
              $router.push('/campaign/create')
            }"
          >
            Next
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

<style lang="scss" scoped>
.workflow-modal-container {
  overflow: hidden;
  border-radius: 6px !important;
  background-color: #fff !important;
  block-size: 471px;
}

.workflow-modal-header {
  background-color: #f8f8f8;
  block-size: 70px;
  border-start-end-radius: 5px;
  border-start-start-radius: 5px;
}

.modal-title {
  color: #5e5873;
  font-size: 18px;
  font-weight: 600;
}

.modal-subtitle {
  color: #b9b9c3;
  font-size: 13px;
}

.close-icon-wrapper {
  border: 1.5px solid #64748b;
  border-radius: 20px;
  block-size: 20px;
  inline-size: 20px;
}

.workflow-option-card {
  border-radius: 8px !important;
  block-size: 137px;
  inline-size: 100%;
  transition: all 0.2s ease;

  &.normal {
    border: 1px solid #ebe9f1 !important;
    background-color: #fff !important;
  }

  &.selected {
    border: 1px solid #cfdafe !important;
    background-color: #f6f8ff !important;
  }
}

.option-header-text {
  color: #5e5873;
  font-size: 14px;
  font-weight: 700;
  line-height: 21px;
}

.option-description-text {
  color: #5e5873;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
}

.recommended-tag {
  block-size: 18px;
  font-size: 10px;
}

.custom-radio-button {
  border: 1px solid #b9b9c3;
  border-radius: 50%;
  block-size: 18px;
  inline-size: 18px;
  transition: all 0.2s ease;

  &.active {
    border-color: #3666ee;
  }

  .radio-dot {
    border-radius: 50%;
    background-color: #3666ee;
    block-size: 10px;
    inline-size: 10px;
  }
}

.modal-btn-close {
  border-radius: 5px !important;
  background-color: #e8e8e8 !important;
  block-size: 37px !important;
  color: #9692a4 !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  inline-size: 85px !important;
  letter-spacing: 0.4px !important;
  line-height: 100% !important;
  padding-block: 10px !important;
  padding-inline: 22px !important;
}

.modal-btn-next {
  border-radius: 5px !important;
  background: linear-gradient(239.27deg, #8ba6ff -27.06%, #3762ee 83.4%) !important;
  block-size: 37px !important;
  color: #fff !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  inline-size: 85px !important;
  letter-spacing: 0.4px !important;
  line-height: 100% !important;
  padding-block: 10px !important;
  padding-inline: 22px !important;
}
</style>
