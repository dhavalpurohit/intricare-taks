<script setup lang="ts">
import { computed, ref } from 'vue'
import deleteIcon from '@images/icons/delete.svg?url'
import unmappedIcon from '@images/icons/left-to-right-list-bullet.svg?url'
import profileIcon from '@images/icons/profile.svg?url'
import userCircleIcon from '@images/icons/user-circle.svg?url'

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
  { key: 'fullName', label: 'Full name', icon: profileIcon, csvIcon: userCircleIcon },
  { key: 'firstName', label: 'First name', icon: profileIcon, csvIcon: userCircleIcon },
  { key: 'lastName', label: 'Last name', icon: profileIcon, csvIcon: userCircleIcon },
  { key: 'companyName', label: 'Company Name', icon: profileIcon, csvIcon: userCircleIcon },
  { key: 'position', label: 'Position', icon: profileIcon, csvIcon: userCircleIcon },
  { key: 'headline', label: 'Headline', icon: profileIcon, csvIcon: userCircleIcon },
]

const unmappedFields = [
  { name: 'Location', total: 9, count: 3 },
  { name: 'Industry', total: 3, count: 3 },
  { name: 'Notes', total: 9, count: 9 },
]

const filteredUnmapped = computed(() => {
  if (!search.value)
    return unmappedFields

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
  <div class="pa-0">
    <!-- Main Header -->
    <div class="d-flex align-center justify-space-between mb-6">
      <div>
        <div
          class="text-h6 font-weight-bold"
          style="color: #444050;"
        >
          Map Properties
        </div>
        <div class="text-caption text-disabled d-flex align-center mt-1">
          <VIcon
            icon="tabler-check"
            color="primary"
            size="14"
            class="me-1"
          />
          Make sure file includes contact name and phone number
        </div>
      </div>
      <VBtn
        variant="text"
        density="comfortable"
        class="pa-0"
        style="min-inline-size: auto;"
      >
        <img
          :src="deleteIcon"
          width="18"
          height="18"
        >
      </VBtn>
    </div>

    <VRow>
      <!-- Mapping Section -->
      <VCol
        cols="12"
        md="8"
      >
        <div class="mapping-box-container border rounded-lg overflow-hidden white-bg">
          <!-- Header Box -->
          <div class="mapping-box-header d-flex align-center px-4 py-3 border-b">
            <div
              class="flex-grow-1 text-caption font-weight-bold text-uppercase"
              style="color: #444050;"
            >
              Contact Field
            </div>
            <div
              class="flex-grow-1 text-caption font-weight-bold text-uppercase"
              style="color: #444050;"
            >
              CSV Column
            </div>
          </div>
          <!-- Body Box -->
          <div class="mapping-box-body pa-4">
            <div
              v-for="field in mappedFieldsList"
              :key="field.key"
              class="d-flex flex-column flex-sm-row align-sm-center mb-6 mb-sm-4"
            >
              <div class="flex-grow-1 me-0 me-sm-4 mb-2 mb-sm-0">
                <VTextField
                  :model-value="field.label"
                  readonly
                  variant="outlined"
                  density="compact"
                  hide-details
                  class="field-input field-box"
                >
                  <template #prepend-inner>
                    <img
                      :src="profileIcon"
                      width="18"
                      height="18"
                      class="me-2"
                    >
                  </template>
                </VTextField>
              </div>
              <div class="flex-grow-1">
                <VSelect
                  :model-value="modelValue[field.key]"
                  :items="csvHeaders.map((h: any) => h.name)"
                  placeholder="Select Column"
                  variant="outlined"
                  density="compact"
                  hide-details
                  class="field-input field-box"
                  @update:model-value="(val: any) => updateMapping(field.key, val)"
                >
                  <template #prepend-inner>
                    <img
                      :src="field.csvIcon"
                      width="18"
                      height="18"
                      class="me-2 mt-1"
                    >
                  </template>
                  <template #append-inner>
                    <span class="text-caption text-disabled ms-1">
                      ({{ csvHeaders.find((h: any) => h.name === modelValue[field.key])?.count || '0' }})
                    </span>
                  </template>
                </VSelect>
              </div>
            </div>
          </div>
        </div>
      </VCol>

      <!-- Unmapped Sidebar -->
      <VCol
        cols="12"
        md="4"
      >
        <div class="unmapped-box-container border rounded-lg overflow-hidden h-100 d-flex flex-column white-bg">
          <!-- Header Box -->
          <div
            class="unmapped-box-header px-4 py-3 border-b font-weight-bold text-caption text-uppercase"
            style="color: #444050;"
          >
            Unmapped Works
          </div>
          <!-- Body Box -->
          <div class="unmapped-box-body pa-4 flex-grow-1">
            <VTextField
              v-model="search"
              placeholder="Search"
              prepend-inner-icon="tabler-search"
              variant="outlined"
              density="compact"
              class="mb-4 search-input field-box"
              hide-details
            />

            <div class="unmapped-list">
              <div
                v-for="item in filteredUnmapped"
                :key="item.name"
                class="unmapped-item field-box pa-3 mb-2 d-flex align-center border rounded"
              >
                <img
                  :src="unmappedIcon"
                  width="18"
                  height="18"
                  class="me-3"
                >
                <span
                  class="text-body-2 font-weight-medium"
                  style="color: #6e6b7b;"
                >{{ item.name }} ({{ item.total }})</span>
                <VSpacer />
                <span class="text-caption text-disabled">({{ item.count }})</span>
              </div>
            </div>

            <div
              class="clear-all-btn mt-6"
              @click="clearAll"
            >
              Clear All Matched
            </div>
          </div>
        </div>
      </VCol>
    </VRow>
  </div>
</template>

<style scoped>
.white-bg {
  background-color: #fff !important;
}

/* stylelint-disable-next-line selector-pseudo-class-no-unknown */
.field-input :deep(.v-field__outline),
/* stylelint-disable-next-line selector-pseudo-class-no-unknown */
.search-input :deep(.v-field__outline) {
  --v-field-border-opacity: 1 !important;

  border-color: #d8d6de !important;
}

.field-box {
  background-color: #fff !important;
}

/* stylelint-disable-next-line selector-pseudo-class-no-unknown */
.field-input.field-box :deep(.v-field),
/* stylelint-disable-next-line selector-pseudo-class-no-unknown */
.search-input.field-box :deep(.v-field),
.unmapped-item.field-box {
  border-radius: 5px !important;
  block-size: 38px !important;
}

.unmapped-item.field-box {
  border: 1px solid #d8d6de !important;
  background-color: #fff !important;
}

/* stylelint-disable-next-line selector-pseudo-class-no-unknown */
.field-input :deep(.v-field__field),
/* stylelint-disable-next-line selector-pseudo-class-no-unknown */
.search-input :deep(.v-field__field) {
  display: flex !important;
  align-items: center !important;
}

/* stylelint-disable-next-line selector-pseudo-class-no-unknown */
.field-input :deep(.v-field__input),
/* stylelint-disable-next-line selector-pseudo-class-no-unknown */
.search-input :deep(.v-field__input) {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  padding-block: 0 !important;
}

/* stylelint-disable-next-line selector-pseudo-class-no-unknown */
.field-input :deep(.v-field__prepend-inner) {
  display: flex;
  align-items: center;
  padding-block: 0 !important;
}

.unmapped-item {
  transition: background-color 0.2s;
}

.unmapped-item:hover {
  background-color: #f8faff !important;
}

.clear-all-btn {
  color: #3666ee !important;
  cursor: pointer;
  font-size: 14px !important;
  font-weight: 400 !important;
  letter-spacing: 0;
  line-height: normal; /* To simulate line-height 100% and no trim */
  text-align: end;
}
</style>
