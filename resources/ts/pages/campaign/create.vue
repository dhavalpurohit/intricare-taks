<script setup lang="ts">
import { computed, ref } from 'vue'
import CsvUpload from '@/components/campaign/CsvUpload.vue'
import ImportMethodCard from '@/components/campaign/ImportMethodCard.vue'
import LinkedInSearch from '@/components/campaign/LinkedInSearch.vue'
import LookalikeModal from '@/components/campaign/LookalikeModal.vue'
import MappingTable from '@/components/campaign/MappingTable.vue'

// import WebhookInfo from '@/components/campaign/WebhookInfo.vue'
import { type ImportMethod, useCampaignWizard } from '@/composables/useCampaignWizard'
import calendarIcon from '@images/icons/calendar.svg?url'
import checkListIcon from '@images/icons/check-list.svg?url'
import linkedinIcon from '@images/icons/linkedin.svg?url'
import profileIcon from '@images/icons/profile-icon.svg?url'
import userListIcon from '@images/icons/user-list.svg?url'

const {
  currentStep,
  selectedImportMethod,
  linkedinUrl,
  csvFile,
  lookalikeList,
  mappingFields,
  nextStep,
  prevStep,
} = useCampaignWizard()

const steps = ['Define Target Audience', 'Sender Profiles']

const importMethods = [
  {
    value: 'linkedin',
    title: 'LinkedIn Search',
    description: '(Basic, Sales Nav, Post, Group or Event URL)',
    icon: linkedinIcon,
  },
  {
    value: 'csv',
    title: 'Upload CSV File',
    description: 'Upload LinkedIn profiles via CSV. Download Sample',
    icon: calendarIcon,
  },
  {
    value: 'lookalike',
    title: 'Lookalike Audience',
    description: 'Use Lead Finder to find audience.',
    icon: userListIcon,
  },
  {
    value: 'webhook',
    title: 'Inbound Webhook',
    description: 'Sync leads from zapier, n8n make in real time.',
    icon: linkedinIcon,
  },
]

const isStep1Valid = computed(() => {
  if (!selectedImportMethod.value)
    return false

  if (selectedImportMethod.value === 'linkedin')
    return !!linkedinUrl.value
  if (selectedImportMethod.value === 'csv')
    return !!csvFile.value
  if (selectedImportMethod.value === 'lookalike')
    return lookalikeList.value.length > 0
  if (selectedImportMethod.value === 'webhook')
    return true

  return false
})

const showLookalikeModal = ref(false)

const handleImportMethodSelect = (method: string) => {
  selectedImportMethod.value = method as ImportMethod
  if (method === 'lookalike')
    showLookalikeModal.value = true
}

const breadcrumbs = [
  { title: 'Campaign', disabled: false, href: '/campaign' },
  { title: 'Advance Campaign', disabled: true },
]
</script>

<template>
  <VContainer
    fluid
    class="pa-6"
  >
    <VRow justify="center">
      <VCol
        cols="12"
        class="d-flex flex-column"
        style="min-block-size: calc(100vh - 160px);"
      >
        <VCard
          variant="flat"
          class="border rounded-lg mb-6"
        >
          <!-- Stepper Indicators -->
          <div class="d-flex align-center flex-wrap flex-sm-nowrap me-8">
            <div class="d-flex align-center mb-2 mb-sm-0">
              <div class="stepper-icon active rounded me-3">
                <img
                  :src="checkListIcon"
                  alt="Checklist"
                  width="20"
                  height="20"
                >
              </div>
              <span class="stepper-text active-text">Define Target Audience</span>
            </div>
            <VIcon
              icon="tabler-chevron-right"
              size="20"
              class="mx-2 mx-sm-4 text-disabled d-none d-sm-block"
            />
            <VIcon
              icon="tabler-chevron-down"
              size="20"
              class="mx-auto text-disabled d-block d-sm-none w-100"
            />
            <div class="d-flex align-center mt-2 mt-sm-0">
              <div class="stepper-icon inactive rounded me-3">
                <img
                  :src="profileIcon"
                  alt="Profile"
                  width="20"
                  height="20"
                >
              </div>
              <span class="stepper-text inactive-text">Sender Profiles</span>
            </div>
          </div>
        </VCard>

        <!-- Main Content Area with Vertical Progress -->
        <div class="wizard-content-container position-relative ps-8">
          <!-- Vertical Line -->
          <div class="vertical-connector position-absolute" />

          <!-- Section 1: Import Method -->
          <div class="wizard-section position-relative mb-8">
            <div
              class="status-dot position-absolute"
              :class="{ completed: !!selectedImportMethod, active: !selectedImportMethod }"
            >
              <VIcon
                v-if="selectedImportMethod"
                icon="tabler-check"
                color="white"
                size="10"
              />
            </div>

            <div class="choose-import-method-box d-flex align-center justify-space-between mb-6 pa-4">
              <div class="d-flex align-center">
                <span class="choose-import-title text-truncate me-2">Choose Import Method</span>
                <VChip
                  size="x-small"
                  variant="flat"
                  color="#F1F1F2"
                  class="text-caption font-weight-medium"
                  style="block-size: 20px; color: #444050 !important;"
                >
                  Step 1 of 2
                </VChip>
              </div>
              <VIcon
                icon="tabler-chevron-up"
                color="text-disabled"
              />
            </div>

            <div
              class="d-flex flex-wrap"
              style="gap: 16px;"
            >
              <ImportMethodCard
                v-for="method in importMethods"
                :key="method.value"
                v-bind="method"
                :is-selected="selectedImportMethod === method.value"
                @select="handleImportMethodSelect"
              />
            </div>
          </div>

          <!-- Section 2: Method Specific UI -->
          <div
            v-if="selectedImportMethod"
            class="wizard-section position-relative mb-8"
          >
            <div
              class="status-dot position-absolute"
              :class="{ completed: isStep1Valid, active: !isStep1Valid }"
            >
              <VIcon
                v-if="isStep1Valid"
                icon="tabler-check"
                color="white"
                size="10"
              />
            </div>

            <!-- Import Component or Mapping Table -->
            <div class="mb-8">
              <div v-if="selectedImportMethod === 'linkedin'">
                <div class="choose-import-method-box d-flex align-center justify-space-between mb-6 pa-4">
                  <span class="choose-import-title text-truncate">Paste LinkedIn Search URL</span>
                  <VIcon
                    icon="tabler-chevron-up"
                    color="text-disabled"
                  />
                </div>
                <LinkedInSearch v-model="linkedinUrl" />
              </div>

              <div v-if="selectedImportMethod === 'csv'">
                <div class="choose-import-method-box d-flex align-center justify-space-between mb-6 pa-4">
                  <div class="d-flex align-center">
                    <span class="choose-import-title text-truncate me-2">Upload CSV File</span>
                    <VChip
                      size="x-small"
                      variant="flat"
                      color="#F1F1F2"
                      class="text-caption font-weight-medium"
                      style="block-size: 20px; color: #444050 !important;"
                    >
                      Step 1 of 2
                    </VChip>
                  </div>
                  <VIcon
                    icon="tabler-chevron-up"
                    color="text-disabled"
                  />
                </div>
                <CsvUpload v-model="csvFile" />
              </div>

              <div v-if="selectedImportMethod === 'lookalike'">
                <div class="choose-import-method-box d-flex align-center justify-space-between mb-6 pa-4">
                  <span class="choose-import-title text-truncate">Lookalike Audience</span>
                  <VIcon
                    icon="tabler-chevron-up"
                    color="text-disabled"
                  />
                </div>
                <LookalikeAudience v-model="lookalikeList" />
              </div>

              <div v-if="selectedImportMethod === 'webhook'">
                <!-- Webhook section hidden as requested -->
              </div>
            </div>

            <!-- Mapping Selection -->
            <div
              v-if="selectedImportMethod === 'csv' && csvFile"
              class="mb-8"
            >
              <MappingTable v-model="mappingFields" />
            </div>
          </div>
        </div>

        <div class="flex-grow-1" />

        <!-- Lookalike Selection Modal -->
        <LookalikeModal
          v-model="showLookalikeModal"
          @select="(val: any) => lookalikeList = val"
        />

        <!-- Footer Navigation -->
        <div class="footer-actions mt-12 pb-8 d-flex justify-end">
          <VBtn
            color="primary"
            height="44"
            class="px-8 text-none font-weight-bold rounded-lg w-100 w-sm-auto"
            variant="flat"
            :disabled="!isStep1Valid"
            @click="nextStep"
          >
            Next
          </VBtn>
        </div>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style scoped>
.stepper-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px !important;
  block-size: 38px;
  inline-size: 38px;
}

.stepper-icon.active {
  background-color: #3666ee !important;
}

.stepper-icon.inactive {
  background-color: #e8e8e8 !important;
}

.stepper-text {
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0%;
  line-height: 140%;
}

.stepper-text.active-text {
  color: #444050;
}

.stepper-text.inactive-text {
  color: #a0a0a0;
}

.wizard-content-container {
  margin-block: 0;
  max-inline-size: 100%;
}

.vertical-connector {
  background-color: #eaefff;
  block-size: 100%;
  inline-size: 3px;
  inset-block-start: -20px;
  inset-inline-start: 14.5px;
}

.status-dot {
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid #e0e0e0;
  border-radius: 50%;
  background-color: white;
  block-size: 14px;
  inline-size: 14px;
  inset-block-start: 8px;
  inset-inline-start: -24px;
}

.status-dot.active {
  border-color: rgb(var(--v-theme-primary));
  background-color: white;
  box-shadow: 0 0 0 4px rgba(var(--v-theme-primary), 0.1);
}

.wizard-section {
  max-inline-size: 95%;
}

.choose-import-method-box {
  border: 1px solid transparent;
  border-radius: 5px;
  background:
    linear-gradient(#fff, #fff) padding-box,
    linear-gradient(99.37deg, #e7edf6 30.16%, #f0f3f7 116.3%) border-box;
  block-size: 52px;
  inline-size: 100%;
}

.choose-import-title {
  color: #444050;
  font-size: 15px;
  font-weight: 500;
  line-height: 140%;
}

.footer-actions {
  inline-size: 100%;
}

.status-dot.completed {
  border-color: #4caf50;
  background-color: #4caf50;
}

.hover-underline:hover {
  text-decoration: underline !important;
}

.section-card {
  border-color: rgba(var(--v-theme-outline-variant), 0.15) !important;
}

/* stylelint-disable-next-line selector-pseudo-class-no-unknown */
.field-input :deep(.v-field__outline) {
  --v-field-border-opacity: 0.1 !important;
}

/* stylelint-disable-next-line selector-pseudo-class-no-unknown */
.field-input :deep(.v-field__input) {
  font-size: 0.875rem;
}

/* stylelint-disable-next-line selector-pseudo-class-no-unknown */
.search-input :deep(.v-field__outline) {
  --v-field-border-opacity: 0.1 !important;
}
</style>

<route lang="yaml">
meta:
  navActiveLink: index
</route>
